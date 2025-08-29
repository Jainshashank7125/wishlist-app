export function normalizeUrl(url: string): string {
  try {
    const u = new URL(url);
    u.hash = "";
    u.host = u.host.toLowerCase();
    u.search = u.search
      .split("&")
      .filter((param) => !param.startsWith("utm_"))
      .join("&");
    return u.toString();
  } catch {
    return url;
  }
}
