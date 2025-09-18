// app/robots.ts
export const runtime = 'edge';

export default function robots() {
  const baseUrl = 'http://localhost:4000';

  return new Response(
    `
User-agent: *
Allow: /
Disallow: /api
Sitemap: ${baseUrl}/sitemap.xml
`,
    { headers: { 'Content-Type': 'text/plain' } }
  );
}
