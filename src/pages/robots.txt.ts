export function GET() {
  const site = import.meta.env.SITE ?? '';
  const sitemapUrl = site.replace(/\/$/, '') + '/sitemap.xml';
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\nDisallow: /admin\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}
