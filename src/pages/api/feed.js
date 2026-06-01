import RSS from "rss";
import { fetchAllPost } from "../../utils";

export default async function handler(req, res) {
  const posts = await fetchAllPost();
  const site_url = "https://starprime.com";

  const feed = new RSS({
    title:
      "Star Prime: A Business Magazine for Inspiring Entrepreneur Stories",
    description:
      "Star Prime is a business magazine that brings inspiring stories of entrepreneurs who have turned their dreams into reality.",
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    language: "en",
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Your Name`,
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      url: `${site_url}/posts/${post.slug.current}`,
      date: new Date(post.publishedAt),
      description: post.description,
      author: "Star Prime",
    });
  });

  res.setHeader("Content-Type", "text/xml");
  res.write(feed.xml({ indent: true }));
  res.end();
}
