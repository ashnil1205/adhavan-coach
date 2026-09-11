import { useEffect } from "react";

/* Tiny head manager — sets title, description and canonical per route,
   plus injects JSON-LD once for the organisation. */
function meta(name, content, attr = "name") {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function Seo({ title, desc, path = "/" }) {
  useEffect(() => {
    document.title = title;
    meta("description", desc);
    meta("og:title", title, "property");
    meta("og:description", desc, "property");
    meta("og:type", "website", "property");
    meta("twitter:card", "summary_large_image");

    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = location.origin + path;
  }, [title, desc, path]);

  return null;
}

/* Organisation + LocalBusiness structured data, mounted once from Contact. */
export function LocalBusinessJsonLd({ data }) {
  useEffect(() => {
    const id = "ld-localbusiness";
    document.getElementById(id)?.remove();
    const s = document.createElement("script");
    s.id = id;
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
    return () => document.getElementById(id)?.remove();
  }, [data]);
  return null;
}
