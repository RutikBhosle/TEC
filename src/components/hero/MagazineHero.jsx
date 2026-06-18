import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";
import DataErrorPlaceholder from "../common/DataErrorPlaceholder";

const MagazineHero = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { data: magazineData, isLoading, error, refetch } = useQuery({
    queryKey: ["web-profiles-hero"],
    queryFn: async () => {
      const query = `*[
        _type == "post" &&
        "web-profiles" in categories[]->slug.current
      ] | order(coalesce(publishedAt, _updatedAt) desc, _updatedAt desc)[0...8] {
        title,
        slug,
        'featureImg': mainImage.asset->url,
        description,
        publishedAt,
        _updatedAt,
        'categories': categories[]->{title, slug}
      }`;
      return await client.fetch(query);
    },
  });

  const fallbackData = [
    { title: "Dr. Hanan Algotaumel — Transforming Visions into Entrepreneurial Legacies", slug: { current: "hanan-algotaumel" }, featureImg: null, description: "A powerhouse in global business development, Dr. Hanan Algotaumel has redefined what it means to lead with purpose.", publishedAt: "2026-05-01", categories: [{ title: "Business & Finance" }] },
    { title: "Gregory Chow — Top Visionaries in AgriTech Shaping Tomorrow's Food Systems", slug: { current: "gregory-chow" }, featureImg: null, description: "", publishedAt: "2026-04-01", categories: [{ title: "Business & Finance" }] },
    { title: "Dr. Daniel Andreae — Driving Change in Nanomedicine", slug: { current: "daniel-andreae" }, featureImg: null, description: "", publishedAt: "2026-03-01", categories: [{ title: "Innovation" }] },
    { title: "Clem Newton-Brown — The Most Eminent Aviation & Airline Leader of 2026", slug: { current: "clem-newton-brown" }, featureImg: null, description: "", publishedAt: "2026-02-01", categories: [{ title: "Leadership" }] },
    { title: "Justin Ménetez — The Most Iconic CEO to Watch in 2025", slug: { current: "justin-menetez" }, featureImg: null, description: "", publishedAt: "2026-01-01", categories: [{ title: "Profiles" }] },
  ];

  const displayData = magazineData && magazineData.length > 0 ? magazineData : fallbackData;
  const mainMag = displayData[selectedIndex] || displayData[0];
  const sidebarMags = displayData.slice(0, 7);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", { month: "long", year: "numeric" });
    } catch { return ""; }
  };

  const getCategory = (mag) => {
    if (mag.categories && mag.categories.length > 0) return mag.categories[0].title;
    return "Cover Story";
  };

  const renderTitle = (title) => {
    if (!title) return "";
    const match = title.match(/\s*(—|–|:|―)\s*|\s+-\s+/);
    if (match) {
      const separator = match[0];
      const index = title.indexOf(separator);
      const mainName = title.substring(0, index).trim();
      const description = title.substring(index + separator.length).trim();
      return (
        <>
          {mainName} —
          <br />
          <em style={{ color: "#D0C9BF", fontStyle: "italic", fontWeight: 400 }}>{description}</em>
        </>
      );
    }
    return title;
  };

  if (isLoading) return <Loader />;
  if (error) return <DataErrorPlaceholder section="Featured Magazine" refetch={refetch} height="400px" />;

  return (
    <>
      <section className="ec-hero">
        <div className="ec-hero-container">
          {/* MAIN COVER */}
          <div className="ec-hero-main">
            <span className="ec-hero-kicker">Featured Profile</span>
            <div className="ec-hero-img-wrapper">
              {mainMag.featureImg ? (
                <Link href={`/post/${mainMag.slug?.current || mainMag.slug}`} className="ec-hero-img-link">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={mainMag.featureImg} alt={mainMag.title} className="ec-hero-img" />
                </Link>
              ) : (
                <div className="ec-hero-img-placeholder" />
              )}
              <div className="ec-hero-img-overlay" />
            </div>
            <div className="ec-hero-text">
              <span className="ec-hero-cat">{getCategory(mainMag)}</span>
              <h1 className="ec-hero-title">
                <Link href={`/post/${mainMag.slug?.current || mainMag.slug}`} className="ec-hero-title-link">
                  {renderTitle(mainMag.title)}
                </Link>
              </h1>
              {mainMag.description && (
                <p className="ec-hero-excerpt">{mainMag.description}</p>
              )}
              <div className="ec-hero-read-more-wrapper">
                <Link
                  href={`/post/${mainMag.slug?.current || mainMag.slug}`}
                  className="ec-hero-read-more"
                >
                  Read More
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="ec-hero-read-more-arrow">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
              <div className="ec-hero-meta">
                <span className="ec-hero-meta-author">By Editorial Team</span>
                <span className="ec-hero-meta-dot">·</span>
                <span>{formatDate(mainMag.publishedAt || mainMag._updatedAt)}</span>
                <span className="ec-hero-meta-dot">·</span>
                <span>8 min read</span>
              </div>
              <Link
                href={`/post/${mainMag.slug?.current || mainMag.slug}`}
                className="ec-hero-cta"
              >
                Read Cover Story →
              </Link>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="ec-hero-sidebar">
            <div className="ec-hero-sidebar-label">Also In This Issue</div>
            {sidebarMags.map((mag, i) => (
              <div
                key={mag.slug?.current || i}
                className={`ec-hero-sidebar-item ${selectedIndex === i ? "is-active" : ""}`}
                onClick={() => setSelectedIndex(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelectedIndex(i)}
              >
                <span className="ec-hero-sidebar-num">0{i + 1}</span>
                <div className="ec-hero-sidebar-content">
                  <div className="ec-hero-sidebar-cat">{getCategory(mag)}</div>
                  <span className="ec-hero-sidebar-title">
                    {renderTitle(mag.title)}
                  </span>
                  <div className="ec-hero-sidebar-date">
                    {formatDate(mag.publishedAt || mag._updatedAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .ec-hero {
          background: #0f1923;
          padding: 40px 0 8px 0;
          overflow: hidden;
        }

        .ec-hero-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 32px;
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 0;
          align-items: stretch;
        }

        /* MAIN */
        .ec-hero-main {
          border-right: 1px solid #2E4057;
          padding-right: 48px;
          display: flex;
          flex-direction: column;
        }

        .ec-hero-kicker {
          display: inline-block;
          background: #7A0F23;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 3px 12px;
          margin-bottom: 12px;
          animation: fadeInUp 0.5s ease 0.1s both;
          width: fit-content;
        }

        .ec-hero-img-wrapper {
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          margin-bottom: 28px;
          position: relative;
          background: #1E2D3D;
          border-radius: 0;
          border-left: 5px solid #7A0F23;
        }

        .ec-hero-img-link {
          display: block;
          width: 100%;
          height: 100%;
          cursor: pointer;
          overflow: hidden;
        }

        .ec-hero-img-link:hover .ec-hero-img {
          transform: scale(1.03);
        }

        .ec-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.85;
          transition: transform 0.5s ease;
        }

        .ec-hero-img-placeholder {
          width: 100%;
          height: 100%;
          background: #1E2D3D;
        }

        .ec-hero-img-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(to top, #0f1923 0%, transparent 100%);
        }

        .ec-hero-text { flex: 1; }

        .ec-hero-cat {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #7A0F23;
          margin-bottom: 10px;
        }

        .ec-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(26px, 2.4vw, 32px) !important;
          font-weight: 900;
          color: #fff;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
          max-width: 560px;
          animation: fadeInUp 0.5s ease 0.2s both;
        }

        .ec-hero-title-link {
          text-decoration: none !important;
          color: inherit !important;
          transition: color 0.25s ease;
        }

        .ec-hero-title-link:hover {
          color: #D0C9BF !important;
        }

        .ec-hero-title :global(em) {
          font-style: italic;
          color: #D0C9BF;
          font-weight: 400;
        }

        .ec-hero-excerpt {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: #D0C9BF;
          line-height: 1.7;
          max-width: 480px;
          margin-bottom: 16px;
          animation: fadeInUp 0.5s ease 0.3s both;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .ec-hero-read-more-wrapper {
          margin-bottom: 20px;
          margin-top: -8px;
          animation: fadeInUp 0.5s ease 0.35s both;
        }

        .ec-hero-read-more {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: #FAF8F5;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          text-decoration: none !important;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border-bottom: 1px solid rgba(250, 248, 245, 0.3);
          padding-bottom: 2px;
        }

        .ec-hero-read-more:hover {
          color: #7A0F23;
          border-bottom-color: #7A0F23;
        }

        :global(.ec-hero-read-more-arrow) {
          transition: transform 0.25s ease;
        }

        .ec-hero-read-more:hover :global(.ec-hero-read-more-arrow) {
          transform: translateX(3px);
        }

        .ec-hero-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: #9A9490;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 24px;
          animation: fadeInUp 0.5s ease 0.4s both;
        }

        .ec-hero-meta-author { color: #D0C9BF; font-weight: 600; }
        .ec-hero-meta-dot { color: #2E4057; }

        .ec-hero-cta {
          display: inline-block;
          background: #7A0F23;
          color: #fff;
          font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 10px 24px;
          transition: background 0.2s;
          width: fit-content;
        }
        .ec-hero-cta:hover { background: #96010D; color: #fff; }

        /* SIDEBAR */
        .ec-hero-sidebar {
          padding-left: 36px;
          display: flex;
          flex-direction: column;
        }

        .ec-hero-sidebar-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #7A0F23;
          margin-bottom: 20px;
          padding-bottom: 18px;
          border-bottom: 1px solid #2E4057;
        }

        .ec-hero-sidebar-item {
          display: flex;
          gap: 14px;
          padding: 16px 0;
          border-bottom: 1px solid #1E2D3D;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .ec-hero-sidebar-item:last-child { border-bottom: none; }
        .ec-hero-sidebar-item.is-active { border-left: 2px solid #7A0F23; padding-left: 10px; margin-left: -12px; }
        .ec-hero-sidebar-item:hover { border-bottom-color: #2E4057; }

        .ec-hero-sidebar-num {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          font-weight: 900;
          color: rgba(250, 248, 245, 0.3);
          line-height: 1;
          flex-shrink: 0;
          width: 36px;
          transition: color 0.2s;
        }
        .ec-hero-sidebar-item.is-active .ec-hero-sidebar-num { color: #7A0F23; }

        .ec-hero-sidebar-cat {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #7A0F23;
          margin-bottom: 4px;
        }

        .ec-hero-sidebar-title {
          font-family: 'Libre Baskerville', serif;
          font-size: 13px;
          font-weight: 400;
          color: #FAF8F5;
          line-height: 1.45;
          display: block;
          margin-bottom: 4px;
          transition: color 0.2s;
        }
        .ec-hero-sidebar-item:hover .ec-hero-sidebar-title {
          color: #D0C9BF;
        }

        .ec-hero-sidebar-date {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          color: #9A9490;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .ec-hero-container {
            grid-template-columns: 1fr 320px;
          }
          .ec-hero-title { font-size: 30px; }
        }

        @media (max-width: 768px) {
          .ec-hero {
            padding: 40px 0 10px 0;
          }
          .ec-hero-container {
            grid-template-columns: 1fr;
            padding: 0 18px;
          }
          .ec-hero-main {
            border-right: none;
            padding-right: 0;
            margin-bottom: 40px;
          }
          .ec-hero-sidebar {
            padding-left: 0;
            border-top: 1px solid #2E4057;
            padding-top: 32px;
          }
          .ec-hero-title { font-size: 26px; }
        }

        @media (max-width: 480px) {
          .ec-hero-title { font-size: 22px; }
        }
      `}</style>
    </>
  );
};

export default MagazineHero;
