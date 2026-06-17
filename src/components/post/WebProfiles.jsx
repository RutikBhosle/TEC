import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";
import DataErrorPlaceholder from "../common/DataErrorPlaceholder";

const WebProfiles = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const query = `
*[_type == "magazine"] | order(coalesce(publishedAt, _updatedAt, _createdAt) desc) [0...5] {
  title,
  slug,
  'featureImg': mainImage.asset->url,
  'description': coalesce(linkedArticle[0]->description, description),
  publishedAt,
  _updatedAt,
  _createdAt,
  'categories': categories[]->{title, slug}
}
`;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["magazine-profiles-v6"],
    queryFn: async () => {
      const response = await client.fetch(query);
      console.log("Fetched WebProfiles from Sanity:", response);
      return response;
    },
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });

  // Auto-play carousel
  useEffect(() => {
    if (!data || data.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [data]);

  if (isLoading) return <Loader />;
  if (error) return <DataErrorPlaceholder section="Featured Articles" refetch={refetch} height="400px" />;
  if (!data?.length) return null;

  const currentMagazine = data[currentIndex] || data[0];

  const formatTitle = (title) => {
    if (!title) return "";
    const match = title.match(/\s*(—|–|:|―)\s*|\s+-\s+/);
    if (match) {
      const separator = match[0];
      const index = title.indexOf(separator);
      const first = title.substring(0, index).trim();
      const rest = title.substring(index + separator.length).trim();
      return (
        <>
          {first} —
          <br />
          <span className="ec-italic-title" style={{ color: "#6B6560", fontStyle: "italic", fontWeight: 400 }}>{rest}</span>
        </>
      );
    }
  };

  const formatDescription = (desc) => {
    if (!desc) return "";
    let cleaned = desc.trim();
    // Locate the first colon or dash that appears in the first 80 characters (to avoid splitting much later inside sentences)
    const splitIndex = cleaned.search(/(?<=^[^:\-]{2,80})[:\-]/);
    if (splitIndex !== -1) {
      cleaned = cleaned.substring(splitIndex + 1).trim();
    }
    if (cleaned.length > 0) {
      cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    }
    const maxLen = 180;
    if (cleaned.length <= maxLen) return cleaned;
    const truncated = cleaned.substring(0, maxLen);
    const lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace > 0) {
      return truncated.substring(0, lastSpace).trim() + " ...";
    }
  };

  const formatPublishDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }).toUpperCase();
    } catch {
      return "";
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  return (
    <>
      <section className="ec-profiles">
        <div className="ec-profiles-container">
          <div className="ec-profiles-layout">

            {/* LEFT COLUMN: MAGAZINE COVER MOCKUP */}
            <div className="ec-magazine-cover-side">
              <div className="ec-magazine-cover-wrapper">
                <div className="ec-magazine-cover-red-bg" />
                <div className="ec-magazine-cover-card">
                  {data.map((item, index) => (
                    <div
                      key={item.slug?.current || index}
                      className="ec-cover-img-slide"
                      style={{
                        position: "absolute",
                        inset: 0,
                        opacity: currentIndex === index ? 1 : 0,
                        transition: "opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        zIndex: currentIndex === index ? 2 : 1,
                        pointerEvents: currentIndex === index ? "auto" : "none",
                      }}
                    >
                      {item.featureImg ? (
                        <img
                          src={item.featureImg}
                          alt={item.title}
                          className="ec-cover-img"
                        />
                      ) : (
                        <div className="ec-cover-img-placeholder" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: MAGAZINE DETAILS */}
            <div className="ec-magazine-details-side" key={`details-${currentIndex}`}>
              <div className="ec-magazine-header">
                <span className="ec-magazine-label">FEATURED MAGAZINE</span>
                <div className="ec-magazine-header-line" />
                <div className="ec-magazine-nav">
                  <button onClick={handlePrev} className="ec-nav-btn" aria-label="Previous Slide">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                  </button>
                  <button onClick={handleNext} className="ec-nav-btn" aria-label="Next Slide">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>

              <h2 className="ec-magazine-title animate-slideUp">
                {formatTitle(currentMagazine.title)}
              </h2>

              <p className="ec-magazine-description animate-slideUp">
                {formatDescription(currentMagazine.description) ||
                  "This landmark issue explores their philosophy, their impact on learning systems, and why education remains the most powerful lever for societal transformation."}
              </p>

              <div className="ec-magazine-divider" />

              {/* STATS SECTION */}
              <div className="ec-magazine-stats animate-slideUp">
                <div className="ec-stat-col">
                  <div className="ec-stat-num" style={{ fontSize: "24px" }}>Vol. 0{data.length - currentIndex}</div>
                  <div className="ec-stat-label">EDITION VOLUME</div>
                </div>
                <div className="ec-stat-col">
                  <div className="ec-stat-num" style={{ fontSize: "24px" }}>
                    {formatPublishDate(currentMagazine.publishedAt || currentMagazine._createdAt)}
                  </div>
                  <div className="ec-stat-label">PUBLISHED DATE</div>
                </div>
                <div className="ec-stat-col">
                  <div className="ec-stat-num" style={{ fontSize: "24px" }}>COVER</div>
                  <div className="ec-stat-label">EDITORIAL TYPE</div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="ec-magazine-actions animate-slideUp">
                <Link
                  href={`/magazine/${currentMagazine.slug?.current || currentMagazine.slug}`}
                  className="ec-btn-primary"
                >
                  VIEW MAGAZINE
                </Link>
                <Link href="/magazines" className="ec-btn-secondary">
                  VIEW ALL MAGAZINES
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <style jsx>{`
        .ec-profiles {
          background: #FAF8F5;
          padding: 40px 0 60px;
          color: #0f1923;
          overflow: hidden;
          border-bottom: 1px solid #E8E3DC;
        }

        .ec-profiles-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .ec-profiles-layout {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 60px;
          align-items: center;
        }

        /* LEFT SIDE: MAGAZINE COVER */
        .ec-magazine-cover-side {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        .ec-magazine-cover-wrapper {
          position: relative;
          width: 100%;
          max-width: 380px;
          aspect-ratio: 3 / 4;
        }

        .ec-magazine-cover-red-bg {
          position: absolute;
          inset: 0;
          transform: translate(24px, 24px);
          background: #7A0F23;
          z-index: 1;
        }

        .ec-magazine-cover-card {
          position: relative;
          width: 100%;
          height: 100%;
          background: #E8E3DC;
          z-index: 2;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 1px solid #D0C9BF;
        }

        .ec-cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.95;
        }

        .ec-cover-img-placeholder {
          width: 100%;
          height: 100%;
          background: #E8E3DC;
        }

        /* RIGHT SIDE: MAGAZINE DETAILS */
        .ec-magazine-details-side {
          display: flex;
          flex-direction: column;
        }

        .ec-magazine-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .ec-magazine-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.25em;
          color: #7A0F23;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .ec-magazine-header-line {
          height: 1px;
          flex-grow: 1;
          background: rgba(15, 25, 35, 0.15);
        }

        /* NAV BUTTONS */
        .ec-magazine-nav {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .ec-nav-btn {
          background: transparent;
          border: 1px solid rgba(15, 25, 35, 0.15);
          color: #0f1923;
          cursor: pointer;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          padding: 0;
        }

        .ec-nav-btn:hover {
          background: #7A0F23;
          border-color: #7A0F23;
          color: #FAF8F5;
        }

        .ec-magazine-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(24px, 2.2vw, 30px) !important;
          font-weight: 700;
          color: #0f1923;
          line-height: 1.25;
          margin: 0 0 24px 0;
          letter-spacing: -0.01em;
        }

        :global(.ec-italic-title) {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 400;
          color: #5A544F;
        }

        .ec-magazine-description {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: #5A544F;
          line-height: 1.75;
          margin: 0 0 32px 0;
        }

        .ec-magazine-divider {
          height: 1px;
          background: rgba(15, 25, 35, 0.1);
          margin-bottom: 32px;
        }

        /* STATS */
        .ec-magazine-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 40px;
          border-left: none;
        }

        .ec-stat-col {
          border-left: 1px solid rgba(15, 25, 35, 0.15);
          padding-left: 20px;
        }

        .ec-stat-col:first-child {
          border-left: none;
          padding-left: 0;
        }

        .ec-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 900;
          color: #7A0F23;
          line-height: 1;
          margin-bottom: 8px;
        }

        .ec-stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: rgba(15, 25, 35, 0.45);
          text-transform: uppercase;
        }

        /* ACTIONS */
        .ec-magazine-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        :global(.ec-btn-primary) {
          display: inline-block;
          background: #7A0F23;
          color: #FAF8F5;
          font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 10px 24px;
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
          opacity: 0.88;
        }
        :global(.ec-btn-primary:hover) {
          background: #96010D;
          color: #FAF8F5 !important;
          opacity: 1;
        }

        :global(.ec-btn-secondary) {
          display: inline-block;
          background: transparent;
          color: #0f1923;
          font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 9px 24px;
          border: 1px solid rgba(15, 25, 35, 0.2);
          transition: all 0.2s ease;
          cursor: pointer;
          opacity: 0.8;
        }
        :global(.ec-btn-secondary:hover) {
          border-color: #0f1923;
          color: #0f1923 !important;
          background: rgba(15, 25, 35, 0.05);
          opacity: 1;
        }

        /* ANIMATIONS */
        .animate-fade {
          animation: fadeIn 0.8s ease forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 0.95; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .ec-magazine-title {
            font-size: 36px;
          }
          .ec-profiles-layout {
            grid-template-columns: 320px 1fr;
            gap: 40px;
          }
          .ec-magazine-cover-wrapper {
            max-width: 320px;
          }
        }

        @media (max-width: 768px) {
          .ec-profiles {
            padding: 32px 0 40px;
          }
          .ec-profiles-layout {
            grid-template-columns: 1fr;
            gap: 60px;
          }
          .ec-magazine-cover-wrapper {
            max-width: 320px;
          }
          .ec-magazine-cover-red-bg {
            transform: translate(16px, 16px);
          }
          .ec-magazine-stats {
            display: none !important;
          }
        }

        @media (max-width: 480px) {
          .ec-magazine-title {
            font-size: 28px;
          }
          .ec-magazine-actions {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .ec-btn-primary, .ec-btn-secondary {
            text-align: center;
          }
          .ec-magazine-stats {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .ec-stat-col {
            border-left: none;
            padding-left: 0;
            border-bottom: 1px solid rgba(15, 25, 35, 0.1);
            padding-bottom: 12px;
          }
          .ec-stat-col:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
        }
      `}</style>
    </>
  );
};

export default WebProfiles;
