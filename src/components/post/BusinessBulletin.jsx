import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";

const BusinessBulletin = () => {
  const query = `
*[
  _type == "post" &&
  "business-bulletin" in categories[]->slug.current
]
{
  title,
  slug,
  altText,
  'featureImg': mainImage.asset->url,
  publishedAt,
  _updatedAt,
  description,
  'category': {
    'title': "Business Bulletin",
    'slug': "business-bulletin"
  }
} | order(coalesce(publishedAt, _updatedAt) desc, _updatedAt desc)[0...5]
`;

  const { data, isLoading, error } = useQuery({
    queryKey: ["business-bulletin-home-v2"],
    queryFn: async () => {
      const response = await client.fetch(query);
      return response;
    },
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error fetching posts</div>;
  if (!data) return null;

  const featuredPosts = data.slice(0, 2);
  const listPosts = data.slice(2, 5);

  const formatDate = (post) => {
    const d = post.publishedAt || post._updatedAt;
    if (!d) return "";
    try {
      return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch { return ""; }
  };

  return (
    <>
      <section className="ec-bulletin">
        <div className="ec-bulletin-container">
          <div className="ec-section-header">
            <div>
              <div className="ec-section-label">Curated Intelligence</div>
              <h2 className="ec-section-title">Business Bulletin</h2>
            </div>
            <Link href="/category/business-bulletin" className="ec-view-all">View All</Link>
          </div>

          <div className="ec-bulletin-grid">
            {/* MAIN CONTENT COLUMN */}
            <div className="ec-bulletin-main">
              {/* Featured 2-column grid */}
              <div className="ec-bulletin-featured">
                {featuredPosts.map((post, i) => (
                  <Link key={post.slug?.current || i} href={`/post/${post.slug?.current}`} className="ec-bfi">
                    <div className="ec-bfi-img">
                      {post.featureImg ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={post.featureImg} alt={post.altText || post.title} className="ec-bfi-picture" />
                      ) : (
                        <div className="ec-bfi-placeholder" />
                      )}
                    </div>
                    <div className="ec-bfi-body">
                      <div className="ec-bfi-tag">{post.category?.title || "Business"}</div>
                      <div className="ec-bfi-title">{post.title}</div>
                      {post.description && (
                        <p className="ec-bfi-excerpt">{post.description}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Numbered list */}
              <div className="ec-bulletin-list">
                {listPosts.map((post, i) => (
                  <Link key={post.slug?.current || i} href={`/post/${post.slug?.current}`} className="ec-bli">
                    <span className="ec-bli-num">0{i + 1}</span>
                    <div className="ec-bli-content">
                      <div className="ec-bli-tag">{post.category?.title || "Business"}</div>
                      <div className="ec-bli-title">{post.title}</div>
                      {post.description && (
                        <p className="ec-bli-excerpt">{post.description}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="ec-bulletin-sidebar">
              {/* Editor's Pick */}
              <div className="ec-bsc">
                <div className="ec-bsc-overline">Editor&apos;s Pick</div>
                <div className="ec-bsc-title">The Most Influential Businesses Shaping Our Digital World</div>
                <p className="ec-bsc-text">
                  A curated deep-dive into the companies rewriting the rules of commerce, innovation,
                  and global influence in 2026.
                </p>
                <Link href="/blogs" className="ec-bsc-link">Explore Feature →</Link>
              </div>

              {/* Newsletter */}
              <div className="ec-newsletter">
                <div className="ec-newsletter-label">Newsletter</div>
                <div className="ec-newsletter-title">Stay ahead of the story.</div>
                <p className="ec-newsletter-text">
                  The EC Chronicles digest — curated business intelligence, fresh profiles, and market
                  insight, weekly.
                </p>
                <div className="ec-newsletter-form">
                  <input
                    type="email"
                    className="ec-newsletter-input"
                    placeholder="Your email address"
                    aria-label="Email address"
                  />
                  <button className="ec-newsletter-btn" type="button">Join</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .ec-bulletin {
          background: #FAF8F5;
          padding: 64px 0 56px;
        }

        .ec-bulletin-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .ec-section-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 28px;
          padding-bottom: 12px;
          border-bottom: 2px solid #0F1923;
        }

        .ec-section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #C1121F;
          margin-bottom: 6px;
        }

        .ec-section-title {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: #0F1923;
          letter-spacing: -0.01em;
          margin: 0;
        }

        .ec-view-all {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #C1121F;
          text-decoration: none;
          border-bottom: 1px solid #C1121F;
          padding-bottom: 1px;
          transition: opacity 0.2s;
          white-space: nowrap;
        }
        .ec-view-all:hover { opacity: 0.7; color: #C1121F; }

        /* 2-COL SPLIT */
        .ec-bulletin-grid {
          display: grid;
          grid-template-columns: 2fr 1.2fr;
          gap: 48px;
        }

        /* FEATURED MINI-GRID */
        .ec-bulletin-featured {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: #D0C9BF;
          border: 1px solid #D0C9BF;
          margin-bottom: 1px;
        }

        .ec-bfi {
          background: #FAF8F5;
          overflow: hidden;
          cursor: pointer;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          transition: background 0.18s;
        }
        .ec-bfi:hover { background: #F5F2EE; }
        .ec-bfi:hover .ec-bfi-picture { transform: scale(1.04); }

        .ec-bfi-img {
          width: 100%;
          flex: 1;
          min-height: 160px;
          overflow: hidden;
          background: #1E2D3D;
        }

        .ec-bfi-picture {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }

        .ec-bfi-placeholder {
          width: 100%;
          height: 100%;
          background: #1E2D3D;
        }

        .ec-bfi-body { padding: 16px; }

        .ec-bfi-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #C1121F;
          margin-bottom: 6px;
        }

        .ec-bfi-title {
          font-family: 'Playfair Display', serif;
          font-size: 14px;
          font-weight: 700;
          color: #0F1923;
          line-height: 1.3;
          margin-bottom: 6px;
        }

        .ec-bfi-excerpt {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: #6B6560;
          line-height: 1.55;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* NUMBERED LIST */
        .ec-bulletin-list {
          border-top: 2px solid #0F1923;
          margin-top: 20px;
        }

        .ec-bli {
          display: flex;
          gap: 20px;
          padding: 16px 0;
          border-bottom: 1px solid #D0C9BF;
          cursor: pointer;
          text-decoration: none;
          transition: opacity 0.18s;
        }
        .ec-bli:last-child { border-bottom: none; }
        .ec-bli:hover { opacity: 0.8; }

        .ec-bli-num {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 900;
          color: #D0C9BF;
          flex-shrink: 0;
          line-height: 1;
          width: 28px;
        }

        .ec-bli-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #C1121F;
          margin-bottom: 4px;
        }

        .ec-bli-title {
          font-family: 'Libre Baskerville', serif;
          font-size: 13.5px;
          color: #0F1923;
          line-height: 1.35;
          margin-bottom: 4px;
        }

        .ec-bli-excerpt {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: #6B6560;
          line-height: 1.5;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* SIDEBAR */
        .ec-bsc {
          background: #0F1923;
          padding: 28px;
          margin-bottom: 1px;
        }

        .ec-bsc-overline {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #C1121F;
          margin-bottom: 12px;
        }

        .ec-bsc-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          line-height: 1.25;
          margin-bottom: 10px;
        }

        .ec-bsc-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #D0C9BF;
          line-height: 1.65;
          margin: 0 0 18px;
        }

        .ec-bsc-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #C1121F;
          text-decoration: none;
          border-bottom: 1px solid #C1121F;
        }
        .ec-bsc-link:hover { opacity: 0.75; }

        .ec-newsletter {
          background: #F5F2EE;
          border: 1px solid #D0C9BF;
          padding: 28px;
          margin-top: 1px;
        }

        .ec-newsletter-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #C1121F;
          margin-bottom: 10px;
        }

        .ec-newsletter-title {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          color: #0F1923;
          line-height: 1.3;
          margin-bottom: 8px;
        }

        .ec-newsletter-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px;
          color: #6B6560;
          line-height: 1.6;
          margin: 0 0 18px;
        }

        .ec-newsletter-form { display: flex; }

        .ec-newsletter-input {
          flex: 1;
          border: 1px solid #D0C9BF;
          border-right: none;
          padding: 10px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          background: #FAF8F5;
          color: #2C2C2C;
          outline: none;
        }
        .ec-newsletter-input::placeholder { color: #9A9490; }

        .ec-newsletter-btn {
          background: #C1121F;
          color: #fff;
          border: none;
          padding: 10px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s;
        }
        .ec-newsletter-btn:hover { background: #96010D; }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .ec-bulletin-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .ec-bulletin { padding: 48px 0 40px; }
          .ec-bulletin-container { padding: 0 18px; }
          .ec-bulletin-featured { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
};

export default BusinessBulletin;
