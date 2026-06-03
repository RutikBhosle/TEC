import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";

const WebProfiles = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const query = `
*[_type == "magazine"] | order(coalesce(publishedAt, _updatedAt, _createdAt) desc) [0...5] {
  title,
  slug,
  'featureImg': mainImage.asset->url,
  description,
  publishedAt,
  _updatedAt,
  _createdAt,
  'categories': categories[]->{title, slug}
}
`;

  const { data, isLoading, error } = useQuery({
    queryKey: ["magazine-profiles-v4"],
    queryFn: async () => {
      const response = await client.fetch(query);
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
  if (error) return <div style={{ color: "#fff", background: "#0F1923", padding: "40px" }}>Error fetching posts</div>;
  if (!data?.length) return null;

  const currentMagazine = data[currentIndex] || data[0];

  const formatTitle = (title) => {
    if (!title) return "";
    const separators = [" — ", " - ", " : ", ": "];
    for (const sep of separators) {
      if (title.includes(sep)) {
        const parts = title.split(sep);
        const first = parts[0].trim();
        const rest = parts.slice(1).join(sep).trim();
        return (
          <>
            {first} — <span className="ec-italic-title" style={{ color: "#D0C9BF", fontStyle: "italic", fontWeight: 400 }}>{rest}</span>
          </>
        );
      }
    }
    return title;
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
                {currentMagazine.description || 
                  "This landmark issue explores their philosophy, their impact on learning systems, and why education remains the most powerful lever for societal transformation."}
              </p>

              <div className="ec-magazine-divider" />

              {/* STATS SECTION */}
              <div className="ec-magazine-stats animate-slideUp">
                <div className="ec-stat-col">
                  <div className="ec-stat-num">10+</div>
                  <div className="ec-stat-label">COUNTRIES REACHED</div>
                </div>
                <div className="ec-stat-col">
                  <div className="ec-stat-num">50K</div>
                  <div className="ec-stat-label">STUDENTS IMPACTED</div>
                </div>
                <div className="ec-stat-col">
                  <div className="ec-stat-num">12</div>
                  <div className="ec-stat-label">INDUSTRY AWARDS</div>
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
          background: #0F1923;
          padding: 40px 0 60px;
          color: #FAF8F5;
          overflow: hidden;
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
          background: #C1121F;
          z-index: 1;
        }

        .ec-magazine-cover-card {
          position: relative;
          width: 100%;
          height: 100%;
          background: #17222E;
          z-index: 2;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 1px solid rgba(250, 248, 245, 0.05);
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
          background: #17222E;
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
          color: #C1121F;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .ec-magazine-header-line {
          height: 1px;
          flex-grow: 1;
          background: rgba(250, 248, 245, 0.15);
        }

        /* NAV BUTTONS */
        .ec-magazine-nav {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .ec-nav-btn {
          background: transparent;
          border: 1px solid rgba(250, 248, 245, 0.15);
          color: #FAF8F5;
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
          background: #C1121F;
          border-color: #C1121F;
        }

        .ec-magazine-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(24px, 2.2vw, 30px) !important;
          font-weight: 700;
          color: #FAF8F5;
          line-height: 1.25;
          margin: 0 0 24px 0;
          letter-spacing: -0.01em;
        }

        :global(.ec-italic-title) {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 400;
          color: #D0C9BF;
        }

        .ec-magazine-description {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: #D0C9BF;
          line-height: 1.75;
          margin: 0 0 32px 0;
        }

        .ec-magazine-divider {
          height: 1px;
          background: rgba(250, 248, 245, 0.1);
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
          border-left: 1px solid rgba(250, 248, 245, 0.15);
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
          color: #C1121F;
          line-height: 1;
          margin-bottom: 8px;
        }

        .ec-stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: rgba(250, 248, 245, 0.4);
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
          background: #C1121F;
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
          color: #FAF8F5;
          font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 9px 24px;
          border: 1px solid rgba(250, 248, 245, 0.2);
          transition: all 0.2s ease;
          cursor: pointer;
          opacity: 0.72;
        }
        :global(.ec-btn-secondary:hover) {
          border-color: #FAF8F5;
          color: #FAF8F5 !important;
          background: rgba(250, 248, 245, 0.05);
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
            border-bottom: 1px solid rgba(250, 248, 245, 0.1);
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
