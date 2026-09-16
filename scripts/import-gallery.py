#!/usr/bin/env python3
"""
Import photos into the website gallery.

    python3 scripts/import-gallery.py "/path/to/Gallery Images"

For every image in the folder this:
  - writes an optimised copy to      public/img/gallery/<slug>.jpg   (max 1600px)
  - writes a grid thumbnail to       public/img/gallery/sm/<slug>.jpg (max 800px)
  - records size + caption in        src/data/gallery.json

The caption is taken from the filename, so name files descriptively:
    "ALS cabin with ventilator mount.jpeg"  ->  "ALS cabin with ventilator mount"
Generic names like "WhatsApp Image 2026-..." get no caption.
Re-running is safe: files already imported are skipped unless the source changed.
"""
import json, os, re, subprocess, sys, hashlib
from pathlib import Path

ROOT   = Path(__file__).resolve().parent.parent
OUT    = ROOT / "public" / "img" / "gallery"
OUT_SM = OUT / "sm"
DATA   = ROOT / "src" / "data" / "gallery.json"
EXT    = {".jpg", ".jpeg", ".png", ".heic", ".webp", ".tif", ".tiff"}
GENERIC = re.compile(r"^(whatsapp image|img[_-]?\d|dsc|pxl|screenshot|photo|image)", re.I)

def sips(*args):
    r = subprocess.run(["sips", *args], capture_output=True, text=True)
    if r.returncode: raise RuntimeError(r.stderr.strip() or r.stdout.strip())
    return r.stdout

def dims(p):
    out = sips("-g", "pixelWidth", "-g", "pixelHeight", str(p))
    w = int(re.search(r"pixelWidth:\s*(\d+)", out).group(1))
    h = int(re.search(r"pixelHeight:\s*(\d+)", out).group(1))
    return w, h

def slugify(stem):
    s = re.sub(r"[^a-z0-9]+", "-", stem.lower()).strip("-")
    return s or "photo"

def caption(stem):
    stem = re.sub(r"\s*\(\d+\)$", "", stem).strip()
    return "" if GENERIC.match(stem) else stem

def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    src = Path(sys.argv[1]).expanduser()
    if not src.is_dir():
        sys.exit(f"Not a folder: {src}")

    OUT_SM.mkdir(parents=True, exist_ok=True)
    existing = {e["id"]: e for e in json.loads(DATA.read_text())} if DATA.exists() else {}

    files = sorted(p for p in src.iterdir() if p.suffix.lower() in EXT and not p.name.startswith("."))
    items, seen = [], set()
    for i, p in enumerate(files, 1):
        base = slugify(p.stem)
        slug = base; n = 2
        while slug in seen: slug = f"{base}-{n}"; n += 1
        seen.add(slug)

        sig = hashlib.md5(f"{p.stat().st_size}:{int(p.stat().st_mtime)}".encode()).hexdigest()[:10]
        prev = existing.get(slug)
        full, sm = OUT / f"{slug}.jpg", OUT_SM / f"{slug}.jpg"

        if prev and prev.get("sig") == sig and full.exists() and sm.exists():
            items.append(prev); print(f"  = {p.name}  (unchanged)"); continue

        w, h = dims(p)
        # never upscale: cap at the source's own long edge
        sips("-Z", str(min(1600, max(w, h))), "-s", "format", "jpeg", "-s", "formatOptions", "72", str(p), "--out", str(full))
        sips("-Z", str(min(800,  max(w, h))), "-s", "format", "jpeg", "-s", "formatOptions", "62", str(full), "--out", str(sm))
        fw, fh = dims(full)
        items.append({
            "id": slug, "s": f"/img/gallery/{slug}.jpg", "sm": f"/img/gallery/sm/{slug}.jpg",
            "w": fw, "h": fh, "c": prev["c"] if prev and prev.get("c") else caption(p.stem), "sig": sig,
        })
        print(f"  + {p.name}  ->  {slug}.jpg  ({fw}x{fh})")

    # drop outputs for photos removed from the source folder
    for old in set(existing) - seen:
        for f in (OUT / f"{old}.jpg", OUT_SM / f"{old}.jpg"):
            if f.exists(): f.unlink()
        print(f"  - {old}  (removed)")

    DATA.write_text(json.dumps(items, indent=2, ensure_ascii=False) + "\n")
    print(f"\n{len(items)} photos in the gallery -> {DATA.relative_to(ROOT)}")

if __name__ == "__main__":
    main()
