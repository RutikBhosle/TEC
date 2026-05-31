import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";

const MasterTalks = () => {
  const query = `
*[
  _type == "post" &&
  "master-talks" in categories[]->slug.current
]
{
  title,
  altText,
  slug,
  'featureImg': mainImage.asset->url,
  description,
  _updatedAt,
  'category': {
    'title': "Master Talks",
    'slug': "master-talks"
  },
  publishedAt
} | order(coalesce(publishedAt, _updatedAt) desc, _updatedAt desc)[0...5]
`;

  const { data, isLoading, error } = useQuery({
    queryKey: ["master-talks-home-v2"],
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

  const featuredTalk = data[0];
  const gridTalks = data.slice(1, 5);

  const formatDate = (post) => {
    const d = post.publishedAt || post._updatedAt;
    if (!d) return "";
    try {
      return new Date(d).toLocaleDateString("en-US", { month: "long", year: "numeric" });
    } catch { return ""; }
  };

  return (
    <>
      <section className="ec-talks">
        <div className="ec-talks-container">
          <div className="ec-section-header">
            <div>
              <div className="ec-section-label">Insights &amp; Analysis</div>
              <h2 className="ec-section-title">Master Talks</h2>
            </div>
            <Link href="/category/master-talks" className="ec-view-all">All Posts</Link>
          </div>

          {/* FEATURED TALK */}
          {featuredTalk && (
            <div className="ec-talks-featured">
              <div className="ec-talks-featured-img">
                {featuredTalk.featureImg ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={featuredTalk.featureImg}
                    alt={featuredTalk.altText || featuredTalk.title}
                    className="ec-tfi"
                  />
                ) : (
                  <div className="ec-talks-img-placeholder" />
                )}
              </div>
              <div className="ec-talks-featured-body">
                <div className="ec-talks-featured-tag">Master Talks · Featured</div>
                <h3 className="ec-talks-featured-title">{featuredTalk.title}</h3>
                {featuredTalk.description && (
                  <p className="ec-talks-featured-excerpt">{featuredTalk.description}</p>
                )}
                <div className="ec-talks-featured-author">
                  By Editorial Team · {formatDate(featuredTalk)} · 6 min read
                </div>
                <Link
                  href={`/post/${featuredTalk.slug?.current}`}
                  className="ec-talks-cta"
                >
                  Read Full Talk →
                </Link>
              </div>
            </div>
          )}

          {/* NUMBERED GRID */}
          <div className="ec-talks-grid">
            {gridTalks.map((talk, i) => (
              <Link
                key={talk.slug?.current || i}
                href={`/post/${talk.slug?.current}`}
                className="ec-talk-item"
              >
                <div className="ec-talk-num">0{i + 1}</div>
                <div className="ec-talk-tag">{talk.category?.title || "Master Talks"}</div>
                <div className="ec-talk-title">{talk.title}</div>
                {talk.description && (
                  <p className="ec-talk-excerpt">{talk.description}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .ec-talks {
          background: #FAF8F5;
          padding: 64px 0 56px;
        }

        .ec-talks-container {
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

        /* FEATURED TALK — horizontal split */
        .ec-talks-featured {
          display: grid;
          grid-template-columns: 2fr 1.5fr;
          gap: 0;
          background: #FAF8F5;
          margin-bottom: 40px;
          border-top: 1px solid #D0C9BF;
          border-bottom: 1px solid #D0C9BF;
        }

        .ec-talks-featured-img {
          overflow: hidden;
          background: #1E2D3D;
          height: 320px;
        }

        .ec-tfi {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
        .ec-talks-featured:hover .ec-tfi { transform: scale(1.03); }

        .ec-talks-img-placeholder {
          width: 100%;
          height: 100%;
          background: #1E2D3D;
        }

        .ec-talks-featured-body {
          background: #FAF8F5;
          padding: 36px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .ec-talks-featured-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #C1121F;
          margin-bottom: 14px;
        }

        .ec-talks-featured-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 700;
          color: #0F1923;
          line-height: 1.2;
          margin: 0 0 12px;
        }

        .ec-talks-featured-excerpt {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #6B6560;
          line-height: 1.7;
          margin: 0 0 16px;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .ec-talks-featured-author {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: #9A9490;
          font-style: italic;
          margin-bottom: 20px;
        }

        .ec-talks-cta {
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #C1121F;
          text-decoration: none;
          border-bottom: 1px solid #C1121F;
          padding-bottom: 2px;
          width: fit-content;
          transition: opacity 0.2s;
        }
        .ec-talks-cta:hover { opacity: 0.7; }

        /* 4-COLUMN NUMBERED GRID */
        .ec-talks-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          background: transparent;
        }

        .ec-talk-item {
          background: transparent;
          padding: 0;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.2s;
          display: flex !important;
          flex-direction: column !important;
        }
        .ec-talk-item:hover {
          transform: translateY(-4px);
        }

        .ec-talk-num {
          font-family: 'Playfair Display', serif;
          font-size: 56px;
          font-weight: 300;
          color: #0F1923;
          line-height: 1;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid #D0C9BF;
          transition: color 0.2s, border-color 0.2s;
        }
        .ec-talk-item:hover .ec-talk-num { color: #C1121F; border-bottom-color: #C1121F; }

        .ec-talk-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #C1121F;
          margin-bottom: 8px;
        }

        .ec-talk-title {
          font-family: 'Libre Baskerville', serif;
          font-size: 15px;
          color: #0F1923;
          line-height: 1.4;
          margin-bottom: 8px;
          flex: 1;
        }

        .ec-talk-excerpt {
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

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .ec-talks-featured { grid-template-columns: 280px 1fr; }
          .ec-talks-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .ec-talks { padding: 48px 0 40px; }
          .ec-talks-container { padding: 0 18px; }
          .ec-talks-featured { grid-template-columns: 1fr; }
          .ec-talks-featured-img { height: 240px; }
          .ec-talks-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 480px) {
          .ec-talks-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
};

export default MasterTalks;
