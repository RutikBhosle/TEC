import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { client } from "../client";
import Loader from "../components/common/Loader";
import HeaderOne from "../components/header/HeaderOne";
import Faq from "../components/FAQ/Faq";
import FooterTwo from "../components/footer/FooterTwo";
import PostLayoutformag from "../components/post/layout/PostLayoutformag";
import HeadMeta from "../components/elements/HeadMeta";

const Magazines = () => {
  const [searchValue, setSearchValue] = useState("");

  const query = `
    *[_type == "magazine"] {
      title,
      slug,
      'featureImg': mainImage.asset->url,
      publishedAt,
      _createdAt
    } | order(publishedAt desc)
  `;

  const { data, isLoading, error } = useQuery({
    queryKey: ["allMagazinesPage"],
    queryFn: async () => {
      const response = await client.fetch(query);
      return response.sort((a, b) => {
        const aKey = a.publishedAt || a._createdAt || 0;
        const bKey = b.publishedAt || b._createdAt || 0;
        return new Date(bKey) - new Date(aKey);
      });
    },
  });

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div style={{ color: "#7A0F23", textAlign: "center", background: "#FAF8F5", padding: "3rem 1rem", fontFamily: "var(--font-sans)" }}>
        Error fetching magazines. Please try again later.
      </div>
    );
  if (!data) return null;

  const filteredMagazines = searchValue
    ? data.filter((mag) =>
      (mag.title || "").toLowerCase().includes(searchValue.toLowerCase())
    )
    : data;

  return (
    <>
      <HeadMeta
        metaTitle="Exclusive Interviews with Entrepreneurs Featured in Star Prime Magazine"
        metaDesc="Exclusive interviews with top entrepreneurs featured in Star Prime Magazine."
      />

      <HeaderOne />

      <div className="magazines-page">
        <style jsx>{`
          .magazines-page {
            width: 100%;
            min-height: 100vh;
            background: #FAF8F5;
            color: #0f1923;
            padding-bottom: 5rem;
          }

          /* Premium Editorial Hero */
          .editorial-hero {
            max-width: 900px;
            margin: 0 auto;
            text-align: center;
            padding: 4.5rem 1.5rem 3rem;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .hero-eyebrow {
            font-family: var(--font-sans, 'DM Sans', sans-serif);
            font-size: 0.85rem;
            font-weight: 700;
            letter-spacing: 0.18em;
            color: var(--cardinal, #7A0F23);
            text-transform: uppercase;
            margin-bottom: 0.75rem;
          }

          .hero-title {
            font-family: var(--font-serif, 'Playfair Display', serif);
            font-size: clamp(2.5rem, 5vw, 3.75rem);
            font-weight: 800;
            line-height: 1.15;
            color: #0f1923;
            margin: 0 0 1.25rem;
          }

          .hero-desc {
            font-family: var(--font-serif-body, 'Libre Baskerville', serif);
            font-size: clamp(1rem, 2vw, 1.2rem);
            line-height: 1.7;
            color: #4a5568;
            max-width: 720px;
            margin: 0 auto;
          }

          .hero-divider {
            width: 80px;
            height: 3px;
            background: var(--cardinal, #7A0F23);
            margin-top: 1.5rem;
            border-radius: 999px;
          }

          /* Search Section */
          .search-section {
            max-width: 600px;
            margin: 0 auto 4rem;
            padding: 0 1.5rem;
            width: 100%;
          }

          .search-input-wrapper {
            position: relative;
            width: 100%;
          }

          .magazines-search {
            width: 100%;
            background: #FFFFFF;
            color: #0f1923;
            border: 1.5px solid rgba(15, 25, 35, 0.1);
            outline: none;
            padding: 14px 20px 14px 45px;
            border-radius: 999px;
            font-family: var(--font-sans, 'DM Sans', sans-serif);
            font-size: 0.95rem;
            transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
            box-shadow: 0 4px 15px rgba(15, 25, 35, 0.03);
          }

          .magazines-search:focus {
            border-color: var(--cardinal, #7A0F23);
            box-shadow: 0 8px 25px rgba(193, 18, 31, 0.08);
            transform: translateY(-1px);
          }

          .magazines-search::placeholder {
            color: #a0aec0;
          }

          .search-icon {
            position: absolute;
            left: 18px;
            top: 50%;
            transform: translateY(-50%);
            color: #a0aec0;
            transition: color 0.3s ease;
          }

          .magazines-search:focus + .search-icon {
            color: var(--cardinal, #7A0F23);
          }

          /* Magazine Grid */
          .grid-container {
            max-width: 1320px;
            margin: 0 auto;
            padding: 0 1.5rem;
            width: 100%;
          }

          .magazine-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
            justify-items: center;
            width: 100%;
          }

          @media (max-width: 991px) {
            .magazine-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 575px) {
            .magazine-grid {
              grid-template-columns: repeat(1, 1fr);
            }
          }

          .no-magazines {
            color: #718096;
            font-family: var(--font-serif-body, 'Libre Baskerville', serif);
            font-size: 1.15rem;
            text-align: center;
            width: 100%;
            padding: 4rem 1rem;
          }
        `}</style>

        {/* 1. Hero Header */}
        <header className="editorial-hero">
          <span className="hero-eyebrow">The Archives</span>
          <h1 className="hero-title">Star Prime Library</h1>
          <p className="hero-desc">
            Explore our curated catalog of print-inspired business leadership magazines, visionary startup profiles, and exclusive global founder portfolios.
          </p>
          <div className="hero-divider" />
        </header>

        {/* 2. Stylized Search */}
        <section className="search-section">
          <div className="search-input-wrapper">
            <input
              className="magazines-search"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search issues by name..."
              aria-label="Search magazines by name"
            />
            <svg
              className="search-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </section>

        {/* 3. Grid Content */}
        <div className="grid-container">
          <div className="magazine-grid">
            {filteredMagazines.length > 0 ? (
              filteredMagazines.map((post, index) => (
                <PostLayoutformag data={post} key={index} />
              ))
            ) : (
              <p className="no-magazines">
                No archived issues matching your search criteria were found.
              </p>
            )}
          </div>
        </div>
      </div>

      <Faq />

      <div className="magazines-footer" style={{ marginTop: "0" }}>
        <FooterTwo />
      </div>
    </>
  );
};

export default Magazines;
