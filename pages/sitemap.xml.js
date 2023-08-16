import { Charter, User } from "../server/models"

function prettifyDate(date) {

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

}

function generateSiteMap({ charters, users }) {

    const domain = "https://c.fairfieldprogramming.org"

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
        <url>
            <loc>${domain}/</loc>
            <lastmod>${prettifyDate(new Date())}</lastmod>
        </url>
        <url>
            <loc>${domain}/map</loc>
            <lastmod>${prettifyDate(new Date())}</lastmod>
        </url>
        <url>
            <loc>${domain}/charter</loc>
            <lastmod>${prettifyDate(new Date())}</lastmod>
        </url>
        <url>
            <loc>${domain}/join</loc>
            <lastmod>2023-08-14</lastmod>
        </url>
        <url>
            <loc>${domain}/user/login</loc>
            <lastmod>2023-08-14</lastmod>
        </url>
        ${charters
        .map(({ id }) => {
            return `
        <url>
            <loc>${`${domain}/charter/${id}`}</loc>
        </url>
        `;
        })
        .join('')}
        ${charters
            .map(({ id }) => {
            return `
            <url>
                <loc>${`${domain}/charter/${id}`}</loc>
            </url>
        `;
            })
            .join('')}
    </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {

  // We make an API call to gather the URLs for our site
  const charters = await Charter.findAll({ });
  const users = await User.findAll({ });

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap({ charters, users });

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;