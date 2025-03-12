/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.meveddetdernegi.org',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: ['/admin'],
      },
    ],
  },
  exclude: ['/admin', '/admin/*'],
  generateIndexSitemap: false,
  outDir: 'public',
}; 