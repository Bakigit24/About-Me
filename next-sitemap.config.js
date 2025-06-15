/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://shoxruh.vercel.app',
    generateRobotsTxt: true,
    generateIndexSitemap: true,
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
    exclude: ['/api/*'],
};
