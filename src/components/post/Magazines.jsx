import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";

const Magazines = () => {
  const query = `
*[_type == "magazine"]
{
  title,
  altText,
  slug,
  'featureImg': mainImage.asset->url,
  publishedAt,
  _updatedAt,
  _createdAt,
  description,
  'categories': categories[]->{title}
} | order(coalesce(publishedAt, _updatedAt, _createdAt) desc)[0...8]
`;

  const { data, isLoading, error } = useQuery({
    queryKey: ["allMagazines-grid"],
    queryFn: async () => {
      const response = await client.fetch(query);
      return response;
    },
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error fetching magazines</div>;
  if (!data) return null;

  const formatDate = (item) => {
    const d = item.publishedAt || item._updatedAt || item._createdAt;
    if (!d) return "";
    try {
      return new Date(d).toLocaleDateString("en-US", { month: "long", year: "numeric" });
    } catch { return ""; }
  };

  const getCategory = (item) => {
    if (item.categories && item.categories.length > 0) {
      return item.categories.map(c => c.title).join(" · ");
    }
    return "Magazine";
  };

  return (
    <>
      <section className="ec-magazines">
        <div className="ec-magazines-container">
          <div className="ec-section-header">
            <div>
              <div className="ec-section-label">Fresh off the Press</div>
              <h2 className="ec-section-title">Latest Magazines</h2>
            </div>
            <Link href="/magazines" className="ec-view-all">View All Magazines</Link>
          </div>

          <div className="ec-magazines-grid">
            {data.slice(0, 8).map((mag, i) => (
              <div key={mag.slug?.current || i} className="ec-mag-card">
                <div className="ec-mag-card-img">
                  {mag.featureImg ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={mag.featureImg} alt={mag.altText || mag.title} className="ec-mag-img" />
                  ) : (
                    <div className="ec-mag-img-placeholder" />
                  )}
                  <span className="ec-mag-issue">Vol. {String(data.length - i).padStart(2, "0")}</span>
                </div>
                <div className="ec-mag-card-body">
                  <div className="ec-mag-tag">{getCategory(mag)}</div>
                  <div className="ec-mag-title">{mag.title}</div>
                  {mag.description && (
                    <div className="ec-mag-sub">{mag.description}</div>
                  )}
                </div>
                <div className="ec-mag-card-footer">
                  <span className="ec-mag-date">{formatDate(mag)}</span>
                  <Link
                    href={`/magazine/${mag.slug?.current || mag.slug}`}
                    className="ec-mag-cta"
                  >
                    Read Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .ec-magazines {
          background: #FAF8F5;
          padding: 64px 0 56px;
        }

        .ec-magazines-container {
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

        /* 4-COLUMN GRID */
        .ec-magazines-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: #D0C9BF;
          border: 1px solid #D0C9BF;
        }

        .ec-mag-card {
          background: #FAF8F5;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          cursor: pointer;
          transition: background 0.2s;
        }
        .ec-mag-card:hover { background: #F5F2EE; }

        .ec-mag-card-img {
          width: 100%;
          height: 380px;
          background: #1E2D3D;
          overflow: hidden;
          position: relative;
          flex-shrink: 0;
        }

        .ec-mag-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .ec-mag-card:hover .ec-mag-img { transform: scale(1.04); }

        .ec-mag-img-placeholder {
          width: 100%;
          height: 100%;
          background: #1E2D3D;
        }

        .ec-mag-issue {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #C1121F;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 4px 8px;
        }

        .ec-mag-card-body {
          padding: 20px;
          flex: 1;
        }

        .ec-mag-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #C1121F;
          margin-bottom: 8px;
        }

        .ec-mag-title {
          font-family: 'Playfair Display', serif;
          font-size: 15px;
          font-weight: 700;
          color: #0F1923;
          line-height: 1.3;
          margin-bottom: 8px;
        }

        .ec-mag-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: #6B6560;
          line-height: 1.55;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .ec-mag-card-footer {
          padding: 12px 20px;
          border-top: 1px solid #E8E3DC;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ec-mag-date {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: #9A9490;
        }

        .ec-mag-cta {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #C1121F;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .ec-mag-cta:hover { opacity: 0.75; color: #C1121F; }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .ec-magazines-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .ec-magazines {
            padding: 48px 0 40px;
          }
          .ec-magazines-container { padding: 0 18px; }
          .ec-magazines-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .ec-mag-card-img { height: 320px; }
        }

        @media (max-width: 480px) {
          .ec-magazines-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
};

export default Magazines;
