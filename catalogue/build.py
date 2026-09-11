# -*- coding: utf-8 -*-
"""
Adhavan Coach — Ambulance Catalogue generator.

Reproduces the design language of "Adhavan Demo Catalogue.pdf":
4:3 pages, navy/red brand palette, numbered tag badges, rounded photo frames
with a red keyline, icon spec lists, and angled footer page markers.

    python3 build.py

Output: "Adhavan Coach - Ambulance Catalogue.pdf" next to this script.
"""
import io, os, math, textwrap
from PIL import Image, ImageEnhance
from reportlab.pdfgen import canvas as rl_canvas
from reportlab.lib.utils import ImageReader
from reportlab.lib.colors import Color, HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

import content as C

HERE = os.path.dirname(os.path.abspath(__file__))
IMGDIR = os.path.normpath(os.path.join(HERE, "..", "public", "img"))
OUT = os.path.join(HERE, "Adhavan Coach - Ambulance Catalogue.pdf")

# ---------------------------------------------------------------- page + palette
W, H = 720.0, 540.0                     # 4:3, matching the sample deck
NAVY   = HexColor("#1A437D")
NAVY_D = HexColor("#123159")
RED    = HexColor("#C8474C")
RED_D  = HexColor("#A93A3F")
INK    = HexColor("#3E4658")
MUTED  = HexColor("#7C879B")
RULE   = HexColor("#DCE1EA")
WHITE  = HexColor("#FFFFFF")

for w in ("Regular", "Medium", "SemiBold", "Bold"):
    pdfmetrics.registerFont(TTFont("Barlow-" + w, os.path.join(HERE, "fonts", "Barlow-%s.ttf" % w)))
REG, MED, SEM, BLD = "Barlow-Regular", "Barlow-Medium", "Barlow-SemiBold", "Barlow-Bold"


# ---------------------------------------------------------------- text helpers
def sw(t, f, s):
    return pdfmetrics.stringWidth(t, f, s)


def wrap(text, font, size, width):
    """Greedy wrap; honours explicit blank-line paragraph breaks."""
    out = []
    for para in text.split("\n\n"):
        line = ""
        for word in para.split():
            trial = (line + " " + word).strip()
            if sw(trial, font, size) <= width:
                line = trial
            else:
                if line:
                    out.append(line)
                line = word
        out.append(line)
        out.append("")                       # paragraph gap
    while out and out[-1] == "":
        out.pop()
    return out


def para(c, text, x, y, font, size, lead, width, color=INK):
    c.setFont(font, size)
    c.setFillColor(color)
    for ln in wrap(text, font, size, width):
        if ln:
            c.drawString(x, y, ln)
        y -= lead
    return y


def draw_spec(c, x, y, text, font, size, color):
    """drawString that typesets a real subscript for U+2082 (O2)."""
    c.setFillColor(color)
    i = text.find("\u2082")
    if i < 0:
        c.setFont(font, size)
        c.drawString(x, y, text)
        return
    head, tail = text[:i], text[i + 1:]
    c.setFont(font, size); c.drawString(x, y, head)
    x += sw(head, font, size)
    c.setFont(font, size * 0.72); c.drawString(x, y - size * 0.17, "2")
    x += sw("2", font, size * 0.72)
    c.setFont(font, size); c.drawString(x, y, tail)


def tracked(c, text, x, y, font, size, color, space=1.4):
    c.saveState()
    t = c.beginText(x, y)
    t.setFont(font, size)
    t.setFillColor(color)
    t.setCharSpace(space)
    t.textOut(text)
    c.drawText(t)
    c.restoreState()
    return sw(text, font, size) + space * len(text)


# ---------------------------------------------------------------- image helpers
def _load(name):
    return Image.open(os.path.join(IMGDIR, name)).convert("RGB")


def cover_crop(im, w, h):
    """Crop to the target aspect ratio, keeping the centre (slightly above centre)."""
    tr, sr = w / float(h), im.width / float(im.height)
    if sr > tr:                                    # too wide -> trim sides
        nw = int(im.height * tr)
        left = (im.width - nw) // 2
        im = im.crop((left, 0, left + nw, im.height))
    else:                                          # too tall -> trim top/bottom
        nh = int(im.width / tr)
        top = int((im.height - nh) * 0.42)
        im = im.crop((0, top, im.width, top + nh))
    return im.resize((int(w * 2.6), int(h * 2.6)), Image.LANCZOS)


def fade(im, left=0.0, right=0.0, bottom=0.0, top=0.0):
    """Blend the given edge fractions of the image into white."""
    px = im.load()
    w, h = im.size
    for x in range(w):
        fx = 1.0
        if left and x < w * left:
            fx = min(fx, x / (w * left))
        if right and x > w * (1 - right):
            fx = min(fx, (w - x) / (w * right))
        for y in range(h):
            f = fx
            if bottom and y > h * (1 - bottom):
                f = min(f, (h - y) / (h * bottom))
            if top and y < h * top:
                f = min(f, y / (h * top))
            if f < 1.0:
                r, g, b = px[x, y]
                px[x, y] = (int(r + (255 - r) * (1 - f)),
                            int(g + (255 - g) * (1 - f)),
                            int(b + (255 - b) * (1 - f)))
    return im


def _jpeg(im, quality=84):
    """Embed photos as JPEG so the finished PDF stays small enough to email."""
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=quality, optimize=True)
    buf.seek(0)
    return ImageReader(buf)


def place(c, im, x, y, w, h, radius=0, stroke=None, sw_=1.0):
    c.saveState()
    if radius:
        p = c.beginPath()
        p.roundRect(x, y, w, h, radius)
        c.clipPath(p, stroke=0, fill=0)
    c.drawImage(_jpeg(im), x, y, w, h, mask=None)
    c.restoreState()
    if stroke is not None:
        c.setStrokeColor(stroke)
        c.setLineWidth(sw_)
        c.roundRect(x, y, w, h, radius, stroke=1, fill=0)


# ---------------------------------------------------------------- brand marks
def logo(c, x, y, size=34, wordmark=True):
    """Rounded medical cross split on a diagonal: red upper-left, navy lower-right."""
    a, e = size * 0.235, size * 0.50         # arm half-width, half-extent
    cx, cy = x + size / 2.0, y + size / 2.0
    r = size * 0.085

    def cross():                              # union of two rounded bars
        p = c.beginPath()
        p.roundRect(cx - e, cy - a, 2 * e, 2 * a, r)
        p.roundRect(cx - a, cy - e, 2 * a, 2 * e, r)
        return p

    S, lean, gap = size * 3.0, 0.42, size * 0.032
    for color, side in ((RED, -1), (NAVY, +1)):
        c.saveState()
        h = c.beginPath()
        ox = side * gap
        h.moveTo(cx + lean * S + ox, cy + S)
        h.lineTo(cx - lean * S + ox, cy - S)
        h.lineTo(cx + side * S * 2, cy - S)
        h.lineTo(cx + side * S * 2, cy + S)
        h.close()
        c.clipPath(h, stroke=0, fill=0)
        c.setFillColor(color)
        c.drawPath(cross(), stroke=0, fill=1)
        c.restoreState()

    # diagonal "needle" through the mark
    c.saveState()
    c.setStrokeColor(NAVY); c.setFillColor(NAVY)
    c.setLineWidth(size * 0.036); c.setLineCap(1)
    n = math.hypot(lean, 1.0)
    ux, uy = lean / n, 1.0 / n
    L = size * 0.64
    c.line(cx - ux * L, cy - uy * L, cx + ux * L, cy + uy * L)
    c.circle(cx - ux * L, cy - uy * L, size * 0.046, stroke=0, fill=1)
    d, tx, ty = size * 0.062, cx + ux * L, cy + uy * L
    p = c.beginPath()
    p.moveTo(tx, ty + d); p.lineTo(tx + d, ty); p.lineTo(tx, ty - d); p.lineTo(tx - d, ty)
    p.close()
    c.drawPath(p, stroke=0, fill=1)
    c.restoreState()

    if wordmark:
        fs = size * 0.52
        c.setFont(BLD, fs); c.setFillColor(NAVY)
        c.drawString(x + size * 1.24, cy + size * 0.06, "ADHAVAN")
        c.setFillColor(RED)
        c.drawString(x + size * 1.24, cy - size * 0.52, "COACH")


# ---------------------------------------------------------------- icons (line art)
def _ic(c, color, lw):
    c.setStrokeColor(color); c.setFillColor(color)
    c.setLineWidth(lw); c.setLineCap(1); c.setLineJoin(1)


def icon(c, kind, x, y, s, color=WHITE, lw=1.1):
    """Draw a line icon in an s x s box with its lower-left corner at (x, y)."""
    c.saveState(); _ic(c, color, lw)
    cx, cy = x + s / 2.0, y + s / 2.0
    if kind == "shield":
        p = c.beginPath()
        p.moveTo(cx, y + s); p.lineTo(x + s * 0.12, y + s * 0.76)
        p.lineTo(x + s * 0.12, y + s * 0.38)
        p.curveTo(x + s * 0.12, y + s * 0.16, cx, y + s * 0.02, cx, y)
        p.curveTo(cx, y + s * 0.02, x + s * 0.88, y + s * 0.16, x + s * 0.88, y + s * 0.38)
        p.lineTo(x + s * 0.88, y + s * 0.76); p.close()
        c.drawPath(p, stroke=1, fill=0)
        c.setLineWidth(lw * 1.15)
        c.lines([(x + s * 0.30, cy - s * 0.02, cx - s * 0.04, y + s * 0.24),
                 (cx - s * 0.04, y + s * 0.24, x + s * 0.72, y + s * 0.60)])
    elif kind == "person":
        c.circle(cx, y + s * 0.86, s * 0.13, stroke=1, fill=0)
        c.lines([(cx, y + s * 0.72, cx, y + s * 0.34),
                 (x + s * 0.16, y + s * 0.62, x + s * 0.84, y + s * 0.58),
                 (cx, y + s * 0.34, x + s * 0.20, y),
                 (cx, y + s * 0.34, x + s * 0.82, y + s * 0.04)])
    elif kind == "badge":
        c.circle(cx, y + s * 0.62, s * 0.34, stroke=1, fill=0)
        c.circle(cx, y + s * 0.62, s * 0.17, stroke=1, fill=0)
        c.lines([(x + s * 0.26, y + s * 0.34, x + s * 0.20, y),
                 (x + s * 0.20, y, x + s * 0.44, y + s * 0.12),
                 (x + s * 0.74, y + s * 0.34, x + s * 0.80, y),
                 (x + s * 0.80, y, x + s * 0.56, y + s * 0.12)])
    elif kind == "support":
        p = c.beginPath()
        p.moveTo(x + s * 0.12, y + s * 0.40)
        p.curveTo(x + s * 0.12, y + s * 0.96, x + s * 0.88, y + s * 0.96, x + s * 0.88, y + s * 0.40)
        c.drawPath(p, stroke=1, fill=0)
        c.roundRect(x + s * 0.02, y + s * 0.16, s * 0.22, s * 0.32, s * 0.07, stroke=1, fill=0)
        c.roundRect(x + s * 0.76, y + s * 0.16, s * 0.22, s * 0.32, s * 0.07, stroke=1, fill=0)
        c.lines([(x + s * 0.87, y + s * 0.16, x + s * 0.87, y + s * 0.06),
                 (x + s * 0.87, y + s * 0.06, cx + s * 0.06, y + s * 0.06)])
    elif kind == "gear":
        c.circle(cx, cy, s * 0.20, stroke=1, fill=0)
        for i in range(8):
            a = math.radians(i * 45)
            c.line(cx + math.cos(a) * s * 0.30, cy + math.sin(a) * s * 0.30,
                   cx + math.cos(a) * s * 0.46, cy + math.sin(a) * s * 0.46)
        c.circle(cx, cy, s * 0.33, stroke=1, fill=0)
    elif kind == "heart":
        p = c.beginPath()
        p.moveTo(cx, y + s * 0.10)
        p.curveTo(x - s * 0.10, y + s * 0.52, x + s * 0.22, y + s * 1.00, cx, y + s * 0.70)
        p.curveTo(x + s * 0.78, y + s * 1.00, x + s * 1.10, y + s * 0.52, cx, y + s * 0.10)
        p.close(); c.drawPath(p, stroke=1, fill=0)
        c.lines([(x + s * 0.14, y + s * 0.52, x + s * 0.34, y + s * 0.52),
                 (x + s * 0.34, y + s * 0.52, x + s * 0.42, y + s * 0.66),
                 (x + s * 0.42, y + s * 0.66, cx + s * 0.02, y + s * 0.34),
                 (cx + s * 0.02, y + s * 0.34, x + s * 0.64, y + s * 0.52),
                 (x + s * 0.64, y + s * 0.52, x + s * 0.86, y + s * 0.52)])
    elif kind == "check":                       # spec-list bullet
        c.roundRect(x, y, s, s, s * 0.26, stroke=1, fill=0)
        c.setLineWidth(lw * 1.25)
        c.lines([(x + s * 0.26, y + s * 0.52, x + s * 0.43, y + s * 0.32),
                 (x + s * 0.43, y + s * 0.32, x + s * 0.76, y + s * 0.70)])
    elif kind == "phone":
        p = c.beginPath()
        p.moveTo(x + s * 0.10, y + s * 0.78)
        p.curveTo(x + s * 0.10, y + s * 0.20, x + s * 0.66, y - s * 0.04, x + s * 0.92, y + s * 0.24)
        c.drawPath(p, stroke=1, fill=0)
        c.lines([(x + s * 0.10, y + s * 0.78, x + s * 0.34, y + s * 0.90),
                 (x + s * 0.34, y + s * 0.90, x + s * 0.44, y + s * 0.62),
                 (x + s * 0.44, y + s * 0.62, x + s * 0.26, y + s * 0.50),
                 (x + s * 0.92, y + s * 0.24, x + s * 0.72, y + s * 0.02),
                 (x + s * 0.72, y + s * 0.02, x + s * 0.50, y + s * 0.18),
                 (x + s * 0.50, y + s * 0.18, x + s * 0.62, y + s * 0.38)])
    elif kind == "mail":
        c.roundRect(x + s * 0.04, y + s * 0.18, s * 0.92, s * 0.64, s * 0.08, stroke=1, fill=0)
        c.lines([(x + s * 0.10, y + s * 0.76, cx, y + s * 0.44),
                 (cx, y + s * 0.44, x + s * 0.90, y + s * 0.76)])
    elif kind == "pin":
        p = c.beginPath()
        p.moveTo(cx, y)
        p.curveTo(x + s * 0.06, y + s * 0.44, x + s * 0.06, y + s * 0.96, cx, y + s * 0.96)
        p.curveTo(x + s * 0.94, y + s * 0.96, x + s * 0.94, y + s * 0.44, cx, y)
        p.close(); c.drawPath(p, stroke=1, fill=0)
        c.circle(cx, y + s * 0.66, s * 0.16, stroke=1, fill=0)
    c.restoreState()


# ---------------------------------------------------------------- page furniture
def footer(c, page_no=None):
    c.setStrokeColor(RULE); c.setLineWidth(0.7)
    c.line(40, 46, W - 40, 46)
    tracked(c, C.FOOTER_TEXT, 40, 27, MED, 6.2, MUTED, 1.5)
    if page_no:
        p = c.beginPath()
        p.moveTo(W, 0); p.lineTo(W, 44); p.lineTo(W - 78, 0); p.close()
        c.setFillColor(RED); c.drawPath(p, stroke=0, fill=1)
        c.setFont(BLD, 9); c.setFillColor(WHITE)
        c.drawRightString(W - 14, 12, page_no)


def tag(c, num, fill):
    """Numbered ribbon badge flush to the left edge."""
    p = c.beginPath()
    p.moveTo(0, 524); p.lineTo(104, 524)
    p.curveTo(104, 500, 96, 486, 62, 479)
    p.lineTo(0, 479); p.close()
    c.setFillColor(fill); c.drawPath(p, stroke=0, fill=1)
    c.setFont(BLD, 21); c.setFillColor(WHITE)
    c.drawCentredString(46, 494, num)


def title_two_tone(c, x, y, a, b, size, sep=" – "):
    c.setFont(BLD, size); c.setFillColor(NAVY)
    c.drawString(x, y, a)
    x += sw(a, BLD, size)
    c.drawString(x, y, sep)
    x += sw(sep, BLD, size)
    c.setFillColor(RED); c.drawString(x, y, b)


# ---------------------------------------------------------------- pages
def page_cover(c):
    # hero photo, right side, melting into the page on the left
    im = fade(cover_crop(_load(C.COVER_IMG), 376, 316),
              left=0.32, right=0.05, bottom=0.20, top=0.10)
    place(c, im, 344, 128, 376, 316)

    # red wedge, top right
    p = c.beginPath()
    p.moveTo(474, 540); p.lineTo(720, 540); p.lineTo(720, 392)
    p.curveTo(672, 396, 596, 436, 546, 486)
    p.close()
    c.setFillColor(RED); c.drawPath(p, stroke=0, fill=1)
    c.setFillColor(NAVY); c.rect(702, 250, 18, 142, stroke=0, fill=1)

    logo(c, 48, 470, 34)

    c.setFont(BLD, 41); c.setFillColor(NAVY)
    c.drawString(52, 344, "AMBULANCE")
    c.setFillColor(RED)
    c.drawString(52, 300, "CATALOGUE")

    c.setFont(MED, 12.5); c.setFillColor(INK)
    c.drawString(54, 268, C.COVER_TAGLINE[0])
    c.drawString(54, 250, C.COVER_TAGLINE[1])
    c.setStrokeColor(RED); c.setLineWidth(2.2); c.line(54, 236, 92, 236)

    # navy pillar band, bottom left, rounded right end
    p = c.beginPath()
    p.moveTo(0, 186); p.lineTo(298, 186)
    p.curveTo(344, 186, 372, 166, 372, 126)
    p.curveTo(372, 86, 344, 66, 298, 66)
    p.lineTo(0, 66); p.close()
    c.setFillColor(NAVY); c.drawPath(p, stroke=0, fill=1)
    for i, (kind, label) in enumerate(zip(("gear", "shield", "badge"), C.COVER_PILLARS)):
        x = 52 + i * 92
        icon(c, kind, x + 8, 132, 22, WHITE, 1.15)
        c.setFont(MED, 7.2); c.setFillColor(WHITE)
        for j, ln in enumerate(label.split("\n")):
            c.drawCentredString(x + 19, 116 - j * 9, ln)


def page_about(c):
    im = _load(C.ABOUT_IMG).convert("L").convert("RGB")
    im = ImageEnhance.Brightness(im).enhance(1.12)
    im = fade(cover_crop(im, 440, 348), left=0.34, bottom=0.10)
    place(c, im, 280, 200, 440, 348)

    c.setFont(BLD, 23); c.setFillColor(NAVY)
    c.drawString(48, 462, C.ABOUT_HEAD)
    c.setStrokeColor(RED); c.setLineWidth(2.4); c.line(48, 450, 86, 450)
    para(c, C.ABOUT_BODY, 48, 424, REG, 10, 16.5, 236)

    # navy promise band
    c.setFillColor(NAVY); c.rect(0, 62, W, 138, stroke=0, fill=1)
    tracked(c, "OUR PROMISE", 48, 170, BLD, 9, WHITE, 1.2)
    for i, (kind, label) in enumerate(C.PROMISE):
        x = 48 + i * 104
        icon(c, kind, x + 6, 116, 21, WHITE, 1.05)
        c.setFont(REG, 6.6); c.setFillColor(HexColor("#D6DEEC"))
        for j, ln in enumerate(label.split("\n")):
            c.drawString(x, 102 - j * 8.4, ln)

    # red quote block with a rounded left edge
    p = c.beginPath()
    p.roundRect(478, 62, 242 + 30, 138, 30)
    c.setFillColor(RED); c.drawPath(p, stroke=0, fill=1)
    c.setFillColor(WHITE); c.rect(700, 62, 20, 138, stroke=0, fill=1)
    c.setFillColor(RED); c.rect(690, 62, 30, 138, stroke=0, fill=1)
    c.setFont(BLD, 40); c.setFillColor(HexColor("#E19B9E"))
    c.drawString(506, 142, "“")
    c.setFont(SEM, 11.5); c.setFillColor(WHITE)
    for j, ln in enumerate(wrap(C.STRAPLINE, SEM, 11.5, 190)):
        c.drawString(506, 116 - j * 15.5, ln)

    footer(c, "02")


def page_model(c, m, page_no, idx):
    tag(c, m["n"], RED if idx % 2 == 0 else NAVY)
    title_two_tone(c, 124, 496, m["name"], m["kind"], 19)
    c.setFont(MED, 10.5); c.setFillColor(NAVY)
    c.drawString(124, 478, m["sub"])

    TOP, BOT, LL, SL = 456.0, 96.0, 12.8, 17.2
    lede = wrap(m["lede"], REG, 8.8, 268)
    block = len(lede) * LL + 10 + len(m["specs"]) * SL
    y = TOP - max(0.0, (TOP - BOT - block) / 2.0)

    c.setFont(REG, 8.8); c.setFillColor(MUTED)
    for ln in lede:
        if ln:
            c.drawString(48, y, ln)
        y -= LL
    y -= 10
    for spec in m["specs"]:
        icon(c, "check", 48, y - 2.5, 11, NAVY, 0.9)
        draw_spec(c, 68, y, spec, MED, 8.8, INK)
        y -= SL

    place(c, cover_crop(_load(m["img"]), 352, 306), 348, 150, 352, 306,
          radius=12, stroke=RED, sw_=1.1)

    c.setFont(MED, 8.6); c.setFillColor(RED)
    for j, ln in enumerate(wrap(m["close"], MED, 8.6, 352)):
        c.drawString(348, 130 - j * 12.2, ln)

    footer(c, page_no)


def page_pricing(c, page_no):
    c.setFont(BLD, 21); c.setFillColor(NAVY)
    c.drawString(48, 480, C.PRICING_HEAD[0])
    c.setFillColor(RED)
    c.drawString(48, 452, C.PRICING_HEAD[1])
    c.setStrokeColor(RED); c.setLineWidth(2.4); c.line(48, 436, 86, 436)

    c.setFont(SEM, 11); c.setFillColor(NAVY)
    c.drawString(48, 408, C.PRICING_LEDE)
    para(c, C.PRICING_BODY, 48, 386, REG, 9.2, 14, 300, INK)

    for i, (n, t, d) in enumerate(C.PRICING_FACTORS):
        y = 396 - i * 92
        c.setFillColor(HexColor("#F4F6FA"))
        c.roundRect(384, y - 62, 288, 74, 10, stroke=0, fill=1)
        c.setFillColor(RED if i % 2 == 0 else NAVY)
        c.roundRect(384, y - 62, 5, 74, 2.5, stroke=0, fill=1)
        c.setFont(BLD, 15); c.setFillColor(HexColor("#C9D2E0"))
        c.drawString(404, y - 16, n)
        c.setFont(SEM, 10.5); c.setFillColor(NAVY)
        c.drawString(434, y - 16, t)
        c.setFont(REG, 8.4); c.setFillColor(MUTED)
        for j, ln in enumerate(wrap(d, REG, 8.4, 224)):
            c.drawString(434, y - 32 - j * 11, ln)

    dl = wrap(C.DISCLAIMER, REG, 6.4, 632)
    top, lead = 124.0, 9.4
    c.setFillColor(HexColor("#F4F6FA"))
    c.rect(0, top - 14 - len(dl) * lead, W, 14 + len(dl) * lead, stroke=0, fill=1)
    c.setFont(REG, 6.4); c.setFillColor(MUTED)
    for j, ln in enumerate(dl):
        c.drawString(48, top - 14 - j * lead, ln)

    footer(c, page_no)


def page_closing(c):
    im = fade(cover_crop(_load(C.CLOSING_IMG), 400, 400), left=0.34, top=0.16, bottom=0.10)
    place(c, im, 320, 118, 400, 400)

    for i, (a, b) in enumerate(C.CLOSING_HEAD):
        y = 448 - i * 30
        c.setFont(BLD, 22); c.setFillColor(NAVY)
        c.drawString(48, y, a)
        c.setFillColor(RED)
        c.drawString(48 + sw(a, BLD, 22), y, b)

    c.setFont(REG, 10.5); c.setFillColor(INK)
    c.drawString(48, 384, C.CLOSING_SUB[0])
    c.drawString(48, 366, C.CLOSING_SUB[1])

    # navy contact block with a rounded top-right corner
    p = c.beginPath()
    p.moveTo(0, 206); p.lineTo(302, 206)
    p.curveTo(356, 206, 392, 172, 392, 122)
    p.lineTo(392, 0); p.lineTo(0, 0); p.close()
    c.setFillColor(NAVY); c.drawPath(p, stroke=0, fill=1)

    tracked(c, "GET IN TOUCH", 48, 168, BLD, 9.5, WHITE, 1.2)
    rows = [("phone", [C.CONTACT["phone"]]),
            ("mail", [C.CONTACT["email"]]),
            ("pin", C.CONTACT["address"].split("\n"))]
    y = 140
    for kind, lines in rows:
        icon(c, kind, 48, y - 9, 13, WHITE, 1.0)
        c.setFont(REG, 8.8); c.setFillColor(HexColor("#DCE3F0"))
        for j, ln in enumerate(lines):
            c.drawString(72, y - 6 - j * 11, ln)
        y -= 26 + 11 * (len(lines) - 1)

    # white logo plate, bottom right
    p = c.beginPath()
    p.roundRect(452, -30, 268, 118, 26)
    c.setFillColor(WHITE); c.drawPath(p, stroke=0, fill=1)
    logo(c, 486, 22, 40)


# ---------------------------------------------------------------- assemble
def build():
    c = rl_canvas.Canvas(OUT, pagesize=(W, H))
    c.setTitle("Adhavan Coach — Ambulance Catalogue")
    c.setAuthor("Adhavan Coach")
    c.setSubject("Ambulance fabrication catalogue")

    def bg():
        c.setFillColor(WHITE); c.rect(0, 0, W, H, stroke=0, fill=1)

    bg(); page_cover(c); c.showPage()
    bg(); page_about(c); c.showPage()
    for i, m in enumerate(C.MODELS):
        bg(); page_model(c, m, "%02d" % (i + 3), i); c.showPage()
    bg(); page_pricing(c, "08"); c.showPage()
    bg(); page_closing(c); c.showPage()
    c.save()
    print("wrote", OUT)


if __name__ == "__main__":
    build()
