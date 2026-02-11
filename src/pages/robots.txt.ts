export function GET() {
  // Prefer Astro SITE env, fallback to production domain
  const site = import.meta.env.SITE || 'https://narainkarthikv.space';

  // Normalize base URL (remove trailing slash)
  const base = site.replace(/\/+$/, '');
  const sitemap = `${base}/sitemap.xml`;

  const robots = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    '',
    `Sitemap: ${sitemap}`,
    `Host: ${base}`,
    ''
  ].join('\n');

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400'
    }
  });
}
