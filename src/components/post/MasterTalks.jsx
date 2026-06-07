import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";
import DataErrorPlaceholder from "../common/DataErrorPlaceholder";

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

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["master-talks-home-v2"],
    queryFn: async () => {
      const response = await client.fetch(query);
      return response;
    },
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <Loader />;
  if (error) return <DataErrorPlaceholder section="Master Talks" refetch={refetch} />;
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
          {/* Section Header */}
          <div className="ec-section-header">
            <div>
              <div className="ec-section-label">Insights &amp; Analysis</div>
              <h2 className="ec-section-title">Master Talks</h2>
            </div>
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
                <span className="ec-talks-featured-tag">Master Talks · Featured</span>
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
                <span className="ec-talk-tag">{talk.category?.title || "Master Talks"}</span>
                <h4 className="ec-talk-title">{talk.title}</h4>
                {talk.description && (
                  <p className="ec-talk-excerpt">{talk.description}</p>
                )}
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
            <Link
              href="/category/master-talks"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#7A0F23",
                textDecoration: "none",
                borderBottom: "1px solid #7A0F23",
                paddingBottom: "1px",
                whiteSpace: "nowrap",
              }}
            >
              All Master Talks
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .ec-talks {
          background: #FAF8F5;
          padding: 20px 0 64px;
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
          margin-bottom: 32px;
          padding-bottom: 12px;
          border-bottom: 2px solid #0f1923;
        }

        .ec-section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #7A0F23;
          margin-bottom: 6px;
        }

        .ec-section-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 700;
          color: #0f1923;
          letter-spacing: -0.01em;
          margin: 0;
        }

        .ec-view-all {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #7A0F23;
          text-decoration: none;
          border-bottom: 1px solid #7A0F23;
          padding-bottom: 1px;
          transition: color 0.25s ease, border-color 0.25s ease;
          white-space: nowrap;
        }
        .ec-view-all:hover {
          color: #96010D;
          border-color: #96010D;
        }

        /* FEATURED TALK — asymmetric horizontal split */
        .ec-talks-featured {
          display: grid;
          grid-template-columns: 4fr 6fr;
          gap: 0;
          background: #FAF8F5;
          margin-bottom: 18px;
          border-top: 1px solid #E2DDD7;
          border-bottom: 1px solid #E2DDD7;
          cursor: pointer;
        }

        .ec-talks-featured-img {
          overflow: hidden;
          background: #1A2535;
          aspect-ratio: 16 / 9;
          position: relative;
        }

        .ec-tfi {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ec-talks-featured:hover .ec-tfi {
          transform: scale(1.03);
        }

        .ec-talks-img-placeholder {
          width: 100%;
          height: 100%;
          background: #1A2535;
        }

        .ec-talks-featured-body {
          background: #FAF8F5;
          padding: 24px 32px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .ec-talks-featured-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 8.5px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #7A0F23;
          margin-bottom: 10px;
          display: block;
        }

        .ec-talks-featured-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 2.5vw, 32px) !important;
          font-weight: 700;
          color: #0f1923;
          line-height: 1.25;
          margin: 0 0 10px;
          transition: color 0.25s ease;
        }
        .ec-talks-featured:hover .ec-talks-featured-title {
          color: #7A0F23;
        }

        .ec-talks-featured-excerpt {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #6B6560;
          line-height: 1.6;
          margin: 0 0 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .ec-talks-featured-author {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: #9A9490;
          font-style: italic;
          margin-bottom: 16px;
        }

        .ec-talks-cta {
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #7A0F23;
          text-decoration: none;
          border-bottom: 1px solid #7A0F23;
          padding-bottom: 2px;
          width: fit-content;
          transition: color 0.25s ease, border-color 0.25s ease;
        }
        .ec-talks-cta:hover {
          color: #96010D;
          border-color: #96010D;
        }

        /* 4-COLUMN PRINT INDEX NUMBERED GRID */
        .ec-talks-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 36px;
          background: transparent;
        }

        .ec-talk-item {
          background: transparent;
          padding: 0;
          cursor: pointer;
          text-decoration: none;
          display: flex !important;
          flex-direction: column !important;
          transition: transform 0.25s ease;
        }
        .ec-talk-item:hover {
          transform: translateY(-4px);
        }

        .ec-talk-num {
          font-family: 'Playfair Display', serif;
          font-size: 56px;
          font-weight: 300;
          color: #D0C9BF;
          line-height: 0.9;
          margin-bottom: 16px;
          padding-top: 16px;
          border-top: 1px solid #E2DDD7;
          transition: color 0.25s ease, border-top-color 0.25s ease;
        }
        .ec-talk-item:hover .ec-talk-num {
          color: #7A0F23;
          border-top-color: #7A0F23;
        }

        .ec-talk-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #7A0F23;
          margin-bottom: 8px;
          display: block;
        }

        .ec-talk-title {
          font-family: 'Libre Baskerville', serif;
          font-size: 13.5px;
          font-weight: 400;
          color: #0f1923;
          line-height: 1.45;
          margin-bottom: 8px;
          transition: color 0.2s ease;
          flex: 1;
        }
        .ec-talk-item:hover .ec-talk-title {
          color: #7A0F23;
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

        /* RESPONSIVE MEDIA QUERIES */
        @media (max-width: 1024px) {
          .ec-talks-featured {
            grid-template-columns: 1.2fr 1fr;
          }
          .ec-talks-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 28px;
          }
        }

        @media (max-width: 768px) {
          .ec-talks {
            padding: 16px 0 48px;
          }
          .ec-talks-container {
            padding: 0 18px;
          }
          .ec-talks-featured {
            grid-template-columns: 1fr;
          }
          .ec-talks-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .ec-talks-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
};

export default MasterTalks;
