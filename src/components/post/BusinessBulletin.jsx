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
} | order(coalesce(publishedAt, _updatedAt) desc, _updatedAt desc)[0...7]
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
  const leftListPosts = data.slice(2, 5);
  const rightListPosts = data.slice(5, 7);

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
          {/* Section Header */}
          <div className="ec-section-header">
            <div>
              <div className="ec-section-label">Curated Intelligence</div>
              <h2 className="ec-section-title">Business Bulletin</h2>
            </div>
            <Link href="/category/business-bulletin" className="ec-view-all">
              View All Bulletin
            </Link>
          </div>

          <div className="ec-bulletin-grid">
            {/* LEFT COLUMN: ORIGINAL FEATURED CARD SPREAD + LIST ITEMS 01, 02, 03 */}
            <div className="ec-bulletin-main">
              {/* Featured Asymmetric Cover Spread */}
              <div className="ec-bulletin-featured">
                {featuredPosts.map((post, i) => (
                  <Link
                    key={post.slug?.current || i}
                    href={`/post/${post.slug?.current}`}
                    className={`ec-bfi ${i === 0 ? "ec-bfi-primary" : "ec-bfi-secondary"}`}
                  >
                    <div className="ec-bfi-img">
                      {post.featureImg ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={post.featureImg}
                          alt={post.altText || post.title}
                          className="ec-bfi-picture"
                        />
                      ) : (
                        <div className="ec-bfi-placeholder" />
                      )}
                    </div>
                    <div className="ec-bfi-body">
                      <span className="ec-bfi-tag">
                        {post.category?.title || "Business Bulletin"}
                      </span>
                      <h3 className="ec-bfi-title">{post.title}</h3>
                      {post.description && (
                        <p className="ec-bfi-excerpt">{post.description}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Numbered List Part 1 (01, 02, 03) */}
              <div className="ec-bulletin-list">
                {leftListPosts.map((post, i) => (
                  <Link
                    key={post.slug?.current || i}
                    href={`/post/${post.slug?.current}`}
                    className="ec-bli"
                  >
                    <span className="ec-bli-num">0{i + 1}</span>
                    <div className="ec-bli-content">
                      <span className="ec-bli-tag">
                        {post.category?.title || "Business Bulletin"}
                      </span>
                      <h4 className="ec-bli-title">{post.title}</h4>
                      {post.description && (
                        <p className="ec-bli-excerpt">{post.description}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: EDITOR'S PICK + NEWSLETTER CARD + EXTRA LIST ITEMS 04 & 05 */}
            <div className="ec-bulletin-sidebar">
              {/* Joined Editor's Pick & Newsletter Card */}
              <div className="ec-joined-card">
                {/* Editor's Pick Section */}
                <div className="ec-bsc" style={{ background: "transparent", padding: 0, borderLeft: "none", boxShadow: "none" }}>
                  <div className="ec-bsc-overline">Editor&apos;s Pick</div>
                  <h3 className="ec-bsc-title" style={{ color: "#0F1923" }}>
                    The Most Influential Businesses Shaping Our Digital World
                  </h3>
                  <p className="ec-bsc-text" style={{ color: "#6B6560" }}>
                    A curated deep-dive into the companies rewriting the rules of commerce,
                    innovation, and global influence in 2026.
                  </p>
                  <Link href="/blogs" className="ec-bsc-link">
                    Explore Feature →
                  </Link>
                </div>

                {/* Divider */}
                <div className="ec-joined-divider" />

                {/* Newsletter Section */}
                <div className="ec-newsletter" style={{ background: "transparent", padding: 0, border: "none" }}>
                  <div className="ec-newsletter-label">Newsletter</div>
                  <h3 className="ec-newsletter-title">Stay ahead of the story.</h3>
                  <p className="ec-newsletter-text">
                    The Star Prime digest — curated business intelligence, fresh profiles,
                    and market insights, delivered weekly.
                  </p>
                  <div className="ec-newsletter-form">
                    <input
                      type="email"
                      className="ec-newsletter-input"
                      placeholder="Your email address"
                      aria-label="Email address"
                    />
                    <button className="ec-newsletter-btn" type="button">
                      Join
                    </button>
                  </div>
                </div>
              </div>

              {/* Numbered List Part 2 (04, 05) - Renders below the Newsletter Card */}
              {rightListPosts.length > 0 && (
                <div className="ec-bulletin-list" style={{ borderTop: "1px solid #E2DDD7", marginTop: "16px" }}>
                  {rightListPosts.map((post, i) => (
                    <Link
                      key={post.slug?.current || i}
                      href={`/post/${post.slug?.current}`}
                      className="ec-bli"
                    >
                      <span className="ec-bli-num">0{i + 4}</span>
                      <div className="ec-bli-content">
                        <span className="ec-bli-tag">
                          {post.category?.title || "Business Bulletin"}
                        </span>
                        <h4 className="ec-bli-title">{post.title}</h4>
                        {post.description && (
                          <p className="ec-bli-excerpt">{post.description}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .ec-bulletin {
          background: #FAF8F5;
          padding: 24px 0 64px;
        }

        .ec-joined-card {
          background: #F5F2EE;
          border: 1px solid #E2DDD7;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .ec-joined-divider {
          height: 1px;
          background: #E2DDD7;
          width: 100%;
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
          margin-bottom: 32px;
          padding-bottom: 12px;
          border-bottom: 2px solid #0F1923;
        }

        .ec-section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #C1121F;
          margin-bottom: 6px;
        }

        .ec-section-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
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
          transition: color 0.25s ease, border-color 0.25s ease;
          white-space: nowrap;
        }
        .ec-view-all:hover {
          color: #96010D;
          border-color: #96010D;
        }

        /* 2-COLUMN SPLIT */
        .ec-bulletin-grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr;
          gap: 48px;
        }

        /* FEATURED COVER SPREAD */
        .ec-bulletin-featured {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 24px;
          margin-bottom: 36px;
        }

        .ec-bfi {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          background: #FAF8F5;
        }

        .ec-bfi-img {
          width: 100%;
          height: 220px;
          overflow: hidden;
          background: #1A2535;
          position: relative;
        }

        .ec-bfi-picture {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ec-bfi:hover .ec-bfi-picture {
          transform: scale(1.03);
        }

        .ec-bfi-placeholder {
          width: 100%;
          height: 100%;
          background: #1A2535;
        }

        .ec-bfi-body {
          padding: 16px 0 0;
        }

        .ec-bfi-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 8.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #C1121F;
          margin-bottom: 8px;
          display: block;
        }

        .ec-bfi-title {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 700;
          color: #0F1923;
          line-height: 1.35;
          margin: 0 0 10px;
          transition: color 0.2s ease;
        }

        .ec-bfi:hover .ec-bfi-title {
          color: #C1121F;
        }

        .ec-bfi-excerpt {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #6B6560;
          line-height: 1.6;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* PRIMARY VS SECONDARY CARD TYPOGRAPHY SCALING */
        .ec-bfi-primary .ec-bfi-title {
          font-size: 18px;
        }

        /* NUMBERED LIST */
        .ec-bulletin-list {
          border-top: 1px solid #E2DDD7;
          display: flex;
          flex-direction: column;
        }

        .ec-bli {
          display: flex;
          gap: 24px;
          padding: 24px 0;
          border-bottom: 1px solid #E2DDD7;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
        }

        .ec-bli:last-child {
          border-bottom: none;
        }

        .ec-bli-num {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          font-weight: 900;
          color: #D0C9BF;
          line-height: 0.9;
          letter-spacing: -0.05em;
          flex-shrink: 0;
          width: 44px;
          transition: color 0.25s ease;
        }

        .ec-bli:hover .ec-bli-num {
          color: #C1121F;
        }

        .ec-bli-content {
          flex: 1;
          min-width: 0;
        }

        .ec-bli-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #C1121F;
          margin-bottom: 4px;
          display: block;
        }

        .ec-bli-title {
          font-family: 'Libre Baskerville', serif;
          font-size: 13.5px;
          font-weight: 400;
          color: #0F1923;
          line-height: 1.45;
          margin: 0 0 6px;
          transition: color 0.2s ease;
        }

        .ec-bli:hover .ec-bli-title {
          color: #C1121F;
        }

        .ec-bli-excerpt {
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px;
          color: #6B6560;
          line-height: 1.55;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* SIDEBAR COMPONENTS */
        .ec-bulletin-sidebar {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        /* Editor's Pick Card */
        .ec-bsc {
          background: #000000;
          padding: 32px;
          border-left: 3px solid #C1121F;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
        }

        .ec-bsc-overline {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #C1121F;
          margin-bottom: 12px;
          display: block;
        }

        .ec-bsc-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.3;
          margin: 0 0 12px;
        }

        .ec-bsc-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #D0C9BF;
          line-height: 1.65;
          margin: 0 0 20px;
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
          padding-bottom: 2px;
          transition: color 0.25s ease, border-color 0.25s ease;
        }
        .ec-bsc-link:hover {
          color: #ffffff;
          border-color: #ffffff;
        }

        /* Newsletter Card */
        .ec-newsletter {
          background: #F5F2EE;
          border: 1px solid #E2DDD7;
          padding: 32px;
        }

        .ec-newsletter-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #C1121F;
          margin-bottom: 12px;
          display: block;
        }

        .ec-newsletter-title {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          color: #0F1923;
          line-height: 1.3;
          margin: 0 0 8px;
        }

        .ec-newsletter-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px;
          color: #6B6560;
          line-height: 1.65;
          margin: 0 0 20px;
        }

        .ec-newsletter-form {
          display: flex;
        }

        .ec-newsletter-input {
          flex: 1;
          border: 1px solid #D0C9BF;
          border-right: none;
          padding: 12px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          background: #FAF8F5;
          color: #0F1923;
          outline: none;
          transition: border-color 0.25s ease;
        }
        .ec-newsletter-input:focus {
          border-color: #0F1923;
        }
        .ec-newsletter-input::placeholder {
          color: #9A9490;
        }

        .ec-newsletter-btn {
          background: #C1121F;
          color: #ffffff;
          border: none;
          padding: 12px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.25s ease;
        }
        .ec-newsletter-btn:hover {
          background: #96010D;
        }

        /* RESPONSIVE MEDIA QUERIES */
        @media (max-width: 1024px) {
          .ec-bulletin-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }

        @media (max-width: 768px) {
          .ec-bulletin {
            padding: 56px 0 48px;
          }
          .ec-bulletin-container {
            padding: 0 18px;
          }
          .ec-bulletin-featured {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .ec-bfi-img {
            height: 200px;
          }
        }
      `}</style>
    </>
  );
};

export default BusinessBulletin;
