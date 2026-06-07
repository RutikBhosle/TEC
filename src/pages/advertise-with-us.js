import HeaderOne from "../components/header/HeaderOne";
import FooterTwo from "../components/footer/FooterTwo";
import HeadMeta from "../components/elements/HeadMeta";
import Image from "next/image";
import Link from "next/link";

const AdvertiseWithUs = () => {
  return (
    <>
      <HeadMeta
        metaTitle="Advertise With Us - Brand Amplification & Media Kit | Star Prime"
        metaDesc="Partner with Star Prime Magazine to align your brand with leading global decision-makers, startup founders, and innovators. Access premium placements today."
      />

      <HeaderOne />

      <main className="advertise-page animate-fade">

        {/* ULTRA-PREMIUM ASYMMETRIC SPLIT DARK HERO COVER */}
        <section className="advertise-hero">
          <div className="advertise-hero-shell">
            <div className="advertise-hero-grid">

              {/* LEFT COLUMN: HERO COPY */}
              <div className="advertise-hero__left">
                <span className="advertise-hero__eyebrow">Brand Amplification</span>
                <h1 className="advertise-hero__title">Advertise With Star Prime</h1>
                <p className="advertise-hero__desc">
                  Welcome to Star Prime, where we spotlight trailblazers
                  shaping the global business landscape. Connect your brand with an elite circle
                  of founders, executives, and high-net-worth innovators.
                </p>
                <div className="advertise-hero__divider" />
              </div>

              {/* RIGHT COLUMN: PREMIUM EDITORIAL MASTHEAD BADGES */}
              <div className="advertise-hero__right">
                <div className="media-masthead-card">
                  <div className="masthead-seal">T.S.P</div>
                  <div className="masthead-info">
                    <span className="masthead-label">Audience Scale</span>
                    <div className="masthead-badge">
                      <span className="badge-kicker">Print Circulation</span>
                      <span className="badge-value">85,000+</span>
                    </div>
                    <div className="masthead-badge">
                      <span className="badge-kicker">Monthly Digital</span>
                      <span className="badge-value">420,000+</span>
                    </div>
                    <div className="masthead-badge">
                      <span className="badge-kicker">Decision Makers</span>
                      <span className="badge-value">78% Executive</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 1: WHY ADVERTISE WITH US */}
        <section className="advertise-section">
          <div className="advertise-shell">
            <div className="intro-grid">
              {/* Left Intro Card */}
              <div className="intro-block">
                <span className="section-eyebrow">Market Influence</span>
                <h2 className="section-title">Why Brands Advertise Here</h2>
                <p className="advertise-copy italic-quote">
                  {'"The toothpaste you use, the shiny shoes you wear, the car you drive, the bed you sleep in—all of it is advertised."'}
                </p>
                <p className="advertise-copy">
                  Being a prime digital and print journal that brings trailblazing new-age businesses to light, Star Prime makes the perfect, trusted ecosystem for high-value brands to secure visibility.
                </p>
                <p className="advertise-copy">
                  Establish authentic connections with market leaders of the paradigm shift in the global enterprise world.
                </p>
              </div>

              {/* Right Metrics Grid */}
              <div className="metric-grid">
                <div className="metric-card">
                  <span className="metric-num">01</span>
                  <h3>Premium Niche Audience</h3>
                  <p>Reach founders, decision-makers, high-net-worth investors, and innovators.</p>
                </div>
                <div className="metric-card">
                  <span className="metric-num">02</span>
                  <h3>Editorial Storytelling</h3>
                  <p>High-recall environments custom-tailored for maximum brand trust.</p>
                </div>
                <div className="metric-card">
                  <span className="metric-num">03</span>
                  <h3>Multi-Format Reach</h3>
                  <p>Website listings, high-end print-replica digital magazines, and newsletter streams.</p>
                </div>
                <div className="metric-card">
                  <span className="metric-num">04</span>
                  <h3>High Conversion Rates</h3>
                  <p>Targeted placements that naturally draw click-throughs and corporate inquiries.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: WEBSITE PLACEMENT */}
        <section className="advertise-section website-showcase">
          <div className="advertise-shell">
            <div className="website-layout">
              <div className="showcase-image-card">
                <Image
                  src="/images/ads-img.png"
                  alt="The Star Prime Advertisement Placements on Desktop Website"
                  width={600}
                  height={800}
                  style={{ width: "100%", height: "auto" }}
                  className="showcase-img"
                />
              </div>
              <div className="website-copy">
                <span className="section-eyebrow">Digital Channels</span>
                <h2 className="showcase-title">Website Placements</h2>
                <p className="advertise-copy italic-quote">
                  {'"Connect yourself with the brand leaders of the paradigm shift in the business world."'}
                </p>
                <p className="advertise-copy">
                  Position your brand natively alongside top-performing global features, break-out founder stories, and trending sector reports.
                </p>
                <p className="advertise-copy">
                  We offer premium header banners, inline editorial placements, and sidebar campaign sponsorships designed for seamless visibility with highly optimized CTRs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: DIGITAL MAGAZINE */}
        <section className="advertise-section magazine-showcase-section">
          <div className="advertise-shell">
            <header className="showcase-section-header">
              <span className="section-eyebrow">Print Archives</span>
              <h2 className="showcase-title">Digital Magazine Placements</h2>
              <p className="showcase-desc">
                Choose the perfect space and dimension for your campaign in our print-replica digital edition.
              </p>
              <div className="showcase-divider" />
            </header>

            <div className="image-grid">
              <div className="showcase-image-card hover-lift">
                <Image
                  src="/images/Advertisement-1.jpg"
                  alt="The Star Prime Full Page Ad Dimensions"
                  width={600}
                  height={800}
                  style={{ width: "100%", height: "auto" }}
                  className="showcase-img"
                />
              </div>
              <div className="showcase-image-card hover-lift">
                <Image
                  src="/images/Advertisement-2.jpg"
                  alt="The Star Prime Half Page Ad Dimensions"
                  width={600}
                  height={800}
                  style={{ width: "100%", height: "auto" }}
                  className="showcase-img"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: CALL TO ACTION */}
        <section className="advertise-cta">
          <div className="advertise-shell">
            <div className="cta-wrap">
              <span className="cta-kicker">Request Media Kit</span>
              <h2>Ready to Advertise Your Brand?</h2>
              <p>{"Let's align your campaign with the right target audience and premium placements."}</p>
              <Link href="/contact" className="btn btn-primary-cta">
                Get In Touch
              </Link>
            </div>
          </div>
        </section>

      </main>

      <FooterTwo />

      <style jsx>{`
        .advertise-page {
          background: #FAF8F5;
          color: #0f1923;
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          min-height: 100vh;
        }

        .advertise-shell {
          width: 100%;
          max-width: 1240px;
          padding-left: 32px;
          padding-right: 32px;
          margin: 0 auto;
        }

        /* Immersive Light Hero Cover with Asymmetric Split */
        .advertise-hero {
          background: #FAF8F5;
          color: #0f1923;
          padding: 6.5rem 0;
          position: relative;
          border-bottom: 1px solid #E8E3DC;
        }

        .advertise-hero-shell {
          max-width: 1240px !important;
          width: 100% !important;
          margin: 0 auto;
          padding-left: 32px !important;
          padding-right: 32px !important;
        }

        .advertise-hero-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 4.5rem;
          align-items: center;
        }

        .advertise-hero__left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .advertise-hero__eyebrow {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: var(--cardinal, #7A0F23);
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }

        .advertise-hero__title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: clamp(2.25rem, 4.5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.15;
          color: #0f1923;
          margin: 0 0 1.25rem;
          letter-spacing: -0.02em;
        }

        .advertise-hero__desc {
          font-family: var(--font-serif-body, 'Libre Baskerville', serif);
          font-size: clamp(1.05rem, 1.8vw, 1.25rem);
          line-height: 1.75;
          color: #5A544F;
          margin: 0 0 1.5rem;
        }

        .advertise-hero__divider {
          width: 80px;
          height: 3px;
          background: var(--cardinal, #7A0F23);
          margin-bottom: 2.25rem;
          border-radius: 0;
        }

        /* Right Column: Premium Masthead Card */
        .advertise-hero__right {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .media-masthead-card {
          background: #FFFFFF;
          border: 1.5px solid rgba(15, 25, 35, 0.08);
          border-radius: 0;
          padding: 2.5rem;
          width: 100%;
          max-width: 380px;
          box-shadow: 0 15px 35px rgba(15, 25, 35, 0.05);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .media-masthead-card:hover {
          border-color: rgba(15, 25, 35, 0.15);
          transform: translateY(-3px);
          box-shadow: 0 20px 45px rgba(15, 25, 35, 0.1);
        }

        .masthead-seal {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 5.5rem;
          font-weight: 900;
          color: rgba(15, 25, 35, 0.03);
          line-height: 1;
          position: absolute;
          right: -10px;
          bottom: -15px;
          pointer-events: none;
          letter-spacing: -0.05em;
        }

        .masthead-info {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
          z-index: 2;
        }

        .masthead-label {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--cardinal, #7A0F23);
          margin-bottom: 0.25rem;
        }

        .masthead-badge {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          border-bottom: 1.5px solid rgba(15, 25, 35, 0.08);
          padding-bottom: 0.75rem;
        }

        .masthead-badge:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .badge-kicker {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: var(--cardinal, #7A0F23);
          text-transform: uppercase;
        }

        .badge-value {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 1.45rem;
          font-weight: 700;
          color: #0f1923;
        }

        /* ── SECTIONS GENERAL ── */
        .advertise-section {
          padding: 6rem 0 0;
          background: #FAF8F5;
        }

        .section-eyebrow {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: var(--cardinal, #7A0F23);
          text-transform: uppercase;
          margin-bottom: 0.5rem;
          display: block;
        }

        .section-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: clamp(1.85rem, 3.5vw, 2.5rem);
          font-weight: 800;
          color: #0f1923;
          margin: 0 0 1.5rem;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        .intro-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 4rem;
        }

        .intro-block {
          background: #FFFFFF;
          border: 1px solid rgba(15, 25, 35, 0.06);
          border-radius: 0;
          padding: 2.75rem;
          box-shadow: 0 8px 30px rgba(15, 25, 35, 0.03);
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .intro-block::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 4px;
          background: var(--cardinal, #7A0F23);
        }

        .advertise-copy {
          color: #555555;
          font-size: 1.05rem;
          line-height: 1.65;
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          margin-bottom: 1.25rem;
        }

        .advertise-copy:last-child {
          margin-bottom: 0;
        }

        .italic-quote {
          font-family: var(--font-serif-body, 'Libre Baskerville', serif);
          font-size: 1.25rem;
          font-style: italic;
          color: #0f1923;
          line-height: 1.7;
          border-left: 2px dashed rgba(15, 25, 35, 0.15);
          padding-left: 1.25rem;
          margin-bottom: 1.5rem;
        }

        /* Right Metrics Grid */
        .metric-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.5rem;
        }

        .metric-card {
          background: #FFFFFF;
          border: 1px solid rgba(15, 25, 35, 0.05);
          border-radius: 0;
          padding: 1.75rem;
          box-shadow: 0 4px 15px rgba(15, 25, 35, 0.02);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .metric-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(15, 25, 35, 0.06);
          border-color: rgba(15, 25, 35, 0.1);
        }

        .metric-num {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 2.2rem;
          font-weight: 900;
          color: rgba(193, 18, 31, 0.2);
          margin-bottom: 0.5rem;
          display: block;
          transition: color 0.3s ease;
          line-height: 1;
        }

        .metric-card:hover .metric-num {
          color: var(--cardinal, #7A0F23);
        }

        .metric-card h3 {
          color: #0f1923;
          font-size: 1.35rem;
          line-height: 1.35;
          font-family: var(--font-serif, 'Playfair Display', serif);
          margin: 0 0 0.5rem;
          font-weight: 700;
        }

        .metric-card p {
          color: #555555;
          font-size: 1.05rem;
          line-height: 1.6;
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          margin: 0;
        }

        /* website placement showcase */
        .website-showcase {
          padding-top: 6rem;
        }

        .website-layout {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 4.5rem;
          align-items: center;
        }

        .showcase-image-card {
          background: #FFFFFF;
          border: 1px solid rgba(15, 25, 35, 0.06);
          border-radius: 0;
          overflow: hidden;
          box-shadow: 0 12px 35px rgba(15, 25, 35, 0.04);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .showcase-image-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 45px rgba(15, 25, 35, 0.1);
        }

        .showcase-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: clamp(1.85rem, 3.5vw, 2.5rem);
          font-weight: 800;
          color: #0f1923;
          margin: 0 0 1.5rem;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        /* Digital Magazine Showcase Section */
        .magazine-showcase-section {
          padding-bottom: 6rem;
        }

        .showcase-section-header {
          text-align: center;
          margin-bottom: 3.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .showcase-desc {
          font-family: var(--font-serif-body, 'Libre Baskerville', serif);
          font-size: 1.15rem;
          color: #555555;
          line-height: 1.65;
          max-width: 680px;
          margin: 0.5rem auto 0;
        }

        .showcase-divider {
          width: 50px;
          height: 2px;
          background: var(--cardinal, #7A0F23);
          margin-top: 1.25rem;
        }

        .image-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 2.5rem;
        }

        /* CTA block at bottom */
        .advertise-cta {
          padding: 0 0 6rem 0;
          background: #FAF8F5;
        }

        .cta-wrap {
          background: #0f1923;
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 0;
          padding: 4rem 2rem;
          text-align: center;
          color: #FFFFFF;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .cta-wrap:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.25);
        }

        .cta-kicker {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: var(--cardinal, #7A0F23);
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }

        .cta-wrap h2 {
          font-family: var(--font-serif, 'Playfair Display', serif);
          color: #FFFFFF;
          font-size: clamp(1.85rem, 3.5vw, 2.5rem);
          line-height: 1.25;
          margin: 0 0 0.85rem 0;
          letter-spacing: -0.01em;
        }

        .cta-wrap p {
          font-family: var(--font-serif-body, 'Libre Baskerville', serif);
          color: #D0C9BF;
          font-size: 1.15rem;
          line-height: 1.65;
          margin: 0 0 2rem 0;
          max-width: 600px;
        }

        .cta-wrap :global(.btn-primary-cta) {
          border-radius: 0 !important;
          padding: 16px 44px !important;
          font-family: var(--font-sans, 'DM Sans', sans-serif) !important;
          font-size: 1rem !important;
          font-weight: 700 !important;
          letter-spacing: 0.12em !important;
          text-transform: uppercase !important;
          transition: all 0.3s ease !important;
          cursor: pointer !important;
          background-color: var(--cardinal, #7A0F23) !important;
          border: none !important;
          color: #FFFFFF !important;
          box-shadow: 0 4px 15px rgba(193, 18, 31, 0.25) !important;
          text-decoration: none !important;
        }

        .cta-wrap :global(.btn-primary-cta:hover) {
          background-color: #FFFFFF !important;
          color: var(--ink, #0f1923) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2) !important;
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade {
          animation: fadeInUp 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        }

        /* Responsive rules */
        @media (max-width: 1024px) {
          .advertise-shell {
            padding-left: 24px;
            padding-right: 24px;
          }

          .advertise-hero-grid {
            grid-template-columns: 1.2fr 1fr;
            gap: 3rem;
          }

          .intro-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .website-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        @media (max-width: 991px) {
          .advertise-section {
            padding-top: 4rem;
          }
          .magazine-showcase-section {
            padding-bottom: 4rem;
          }
          .advertise-cta {
            padding-bottom: 4rem;
          }
          .advertise-hero-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          .advertise-hero__right {
            justify-content: center;
          }
          .media-masthead-card {
            max-width: 100%;
          }
        }

        @media (max-width: 768px) {
          .advertise-hero {
            padding: 4.5rem 0;
          }
          .advertise-hero__left {
            align-items: center;
            text-align: center;
          }
          .advertise-hero__divider {
            margin-left: auto;
            margin-right: auto;
          }
          .metric-grid {
            grid-template-columns: 1fr;
          }
          .image-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .cta-wrap {
            padding: 3rem 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .advertise-shell {
            padding-left: 16px;
            padding-right: 16px;
          }
          .advertise-hero {
            padding: 3.5rem 0;
          }
          .intro-block {
            padding: 1.75rem 1.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default AdvertiseWithUs;
