export type PreviewData = {
  title: string;
  image: string;
  price?: string;
  currency?: string;
  siteName?: string;
  sourceUrl?: string;
};

export async function fetchPreview(url: string): Promise<PreviewData> {
  // Replace with your backend endpoint
  const res = await fetch("http://localhost:4000/preview/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  console.log("Fetch preview response:", res);
  if (!res.ok) throw new Error("Failed to fetch preview");
  return res.json();
}
