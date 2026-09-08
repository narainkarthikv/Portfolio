export async function GET() {
  const site = import.meta.env.SITE || 'https://narainkarthikv.com';
  const base = site.replace(/\/$/, '');

  const pages = [
    { url: '/', priority: 1.0 },
    { url: '/blog', priority: 0.6 },
    { url: '/narainkarthik-cv.pdf', priority: 0.4 },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
      .map(
        (p) => `
      <url>
        <loc>${base}${p.url}</loc>
        <changefreq>monthly</changefreq>
        <priority>${p.priority}</priority>
      </url>`
      )
      .join('')}
  </urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
