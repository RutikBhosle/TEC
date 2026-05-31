import Head from "next/head";
import { useEffect } from "react";
import HeadMeta from "../components/elements/HeadMeta";
import FooterTwo from "../components/footer/FooterTwo";
import HeaderOne from "../components/header/HeaderOne";
import MasterTalks from "../components/post/MasterTalks";
import LogoSlider from "../components/post/LogoSlider";
import Magazines from "../components/post/Magazines";
import BusinessBulletin from "../components/post/BusinessBulletin";
import WebProfiles from "../components/post/WebProfiles";
import MarketNews from "../components/post/MarketNews";
import MagazineHero from "../components/hero/MagazineHero";
import BreakingTicker from "../components/post/BreakingTicker";
import ScrollToTop from "../components/common/ScrollToTop";

const Home = () => {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div
      suppressHydrationWarning
      style={{ background: "#FAF8F5", color: "#0F1923", minHeight: "100vh" }}
    >
      <Head>
        <meta name="google-site-verification" content="Hb-PBtfDrWImSPQKiNhfbw0JxtOLWsPKDEbfz_WJ8ZE" />
      </Head>
      <HeadMeta
        metaTitle="The Entrepreneurial Chronicles: A Business Magazine for Inspiring Entrepreneur Stories"
        metaDesc="The Entrepreneurial Chronicles is a business magazine that brings inspiring stories of entrepreneurs who have turned their dreams into reality."
      />

      {/* 1 — HEADER (Top Bar + Ink Navy Sticky Nav) */}
      <HeaderOne />

      {/* 2 — HERO (Split: large cover + numbered sidebar) */}
      <MagazineHero />

      {/* 3 — BREAKING TICKER */}
      <BreakingTicker />

      {/* 4 — LATEST MAGAZINES (4-col grid) */}
      <Magazines />

      {/* 5 — MARKET NEWS (Asymmetric 3-col) */}
      <MarketNews />

      {/* 6 — BUSINESS BULLETIN (2-col split with newsletter) */}
      <BusinessBulletin />

      {/* 7 — WEB PROFILES (Featured + list stack) */}
      <WebProfiles />

      {/* 8 — MASTER TALKS (Featured + 4-col numbered grid) */}
      <MasterTalks />

      {/* 9 — PARTNER BRANDS (Dark strip, logo scroll) */}
      <LogoSlider title="Our Partner Brands" showTitle={true} />

      {/* 10 — FOOTER */}
      <FooterTwo />
      <ScrollToTop />

      <style jsx global>{`
        /* ── EDITORIAL GLOBAL VARIABLES ── */
        :root {
          --ink: #0F1923;
          --warm-white: #FAF8F5;
          --cardinal: #C1121F;
          --font-serif: 'Playfair Display', Georgia, serif;
          --font-serif-body: 'Libre Baskerville', Georgia, serif;
          --font-sans: 'DM Sans', system-ui, sans-serif;
        }

        /* Smooth body */
        body {
          font-family: var(--font-sans);
          background: var(--warm-white);
          color: var(--ink);
          overflow-x: hidden;
          margin: 0;
        }

        /* Ensure sections don't bleed */
        * { box-sizing: border-box; }

        /* Remove blue link highlights site-wide */
        a { color: inherit; }
        a:hover { text-decoration: none; }
      `}</style>
    </div>
  );
};

export default Home;
