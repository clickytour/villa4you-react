export type MediaVideoRender =
  | { kind: "iframe"; src: string; title: string; provider: "YouTube" | "Vimeo" }
  | { kind: "video"; src: string; title: string; provider: "MP4" }
  | { kind: "link"; href: string; title: string; provider: "External" };

export function isHttpsUrl(value?: string): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

function youtubeEmbedFrom(url: URL): string | null {
  const host = url.hostname.replace(/^www\./, "");
  if (host === "youtu.be") {
    const id = url.pathname.split("/").filter(Boolean)[0];
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }
  if (host === "youtube.com" || host === "m.youtube.com") {
    if (url.pathname === "/watch") {
      const id = url.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (url.pathname.startsWith("/embed/")) {
      return url.toString();
    }
  }
  return null;
}

function vimeoEmbedFrom(url: URL): string | null {
  const host = url.hostname.replace(/^www\./, "");
  if (host !== "vimeo.com") return null;
  const id = url.pathname.split("/").filter(Boolean)[0];
  return id ? `https://player.vimeo.com/video/${id}` : null;
}

export function normalizeVideoForRender(videoUrl?: string): MediaVideoRender | null {
  if (!isHttpsUrl(videoUrl)) return null;

  const url = new URL(videoUrl);
  const yt = youtubeEmbedFrom(url);
  if (yt) return { kind: "iframe", src: yt, title: "Video presentation", provider: "YouTube" };

  const vimeo = vimeoEmbedFrom(url);
  if (vimeo) return { kind: "iframe", src: vimeo, title: "Video presentation", provider: "Vimeo" };

  if (url.pathname.toLowerCase().endsWith(".mp4")) {
    return { kind: "video", src: url.toString(), title: "Video presentation", provider: "MP4" };
  }

  return { kind: "link", href: url.toString(), title: "Open video presentation", provider: "External" };
}

export function normalizeContentUrls(entries?: Array<{ site: string; url: string }>) {
  if (!entries || entries.length === 0) return [];
  return entries.filter((e) => isHttpsUrl(e.url));
}
