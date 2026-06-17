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
          <div className="hero-bg-grid" />
          <div className="hero-bg-radial" />
          <div className="advertise-hero-shell">
            <div className="advertise-hero-grid">

              {/* LEFT COLUMN: HERO COPY */}
              <div className="advertise-hero__left">
                <span className="advertise-hero__eyebrow">Brand Amplification</span>
                <h1 className="advertise-hero__title">
                  Advertise With <span className="accent-text">Star Prime</span>
                </h1>
                <p className="advertise-hero__desc">
                  Welcome to Star Prime, where we spotlight trailblazers
                  shaping the global business landscape. Connect your brand with an elite circle
                  of founders, executives, and high-net-worth innovators.
                </p>
                <div className="advertise-hero__actions">
                  <button 
                    onClick={() => {
                      document.querySelector('.website-showcase')?.scrollIntoView({ behavior: 'smooth' });
                    }} 
                    className="hero-btn-primary"
                  >
                    Explore Placements
                  </button>
                  <button 
                    onClick={() => {
                      document.querySelector('.advertise-cta')?.scrollIntoView({ behavior: 'smooth' });
                    }} 
                    className="hero-btn-secondary"
                  >
                    Request Media Kit
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN: PREMIUM EDITORIAL MASTHEAD BADGES */}
              <div className="advertise-hero__right">
                <div className="media-masthead-card">
                  <div className="masthead-border-accent" />
                  <div className="masthead-seal">T.S.P</div>
                  <div className="masthead-info">
                    <span className="masthead-label">Audience Scale</span>
                    
                    <div className="masthead-badge">
                      <div className="badge-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5V3.5A2.5 2.5 0 0 1 6.5 1V17H4"/></svg>
                      </div>
                      <div className="badge-content">
                        <span className="badge-kicker">Print Circulation</span>
                        <span className="badge-value">85,000+</span>
                      </div>
                    </div>
                    
                    <div className="masthead-badge">
                      <div className="badge-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                      </div>
                      <div className="badge-content">
                        <span className="badge-kicker">Monthly Digital</span>
                        <span className="badge-value">420,000+</span>
                      </div>
                    </div>
                    
                    <div className="masthead-badge">
                      <div className="badge-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      </div>
                      <div className="badge-content">
                        <span className="badge-kicker">Decision Makers</span>
                        <span className="badge-value">78% Executive</span>
                      </div>
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
              <div className="ad-layout-demo">
                <div className="ad-web-mockup">
                  {/* Top Banner */}
                  <div className="ad-banner-mock">
                    <div className="ad-banner-inner">
                      <span className="ad-banner-title">BANNER ADVERTISEMENT</span>
                      <span className="ad-banner-dim">980px × 110px</span>
                    </div>
                  </div>
                  
                  {/* Middle content section with sidebar */}
                  <div className="ad-web-body">
                    <div className="ad-web-content-placeholder">
                      <div className="mock-line long"></div>
                      <div className="mock-line short"></div>
                      <div className="mock-line long"></div>
                      <div className="mock-line medium"></div>
                    </div>
                    <div className="ad-sidebar-mock">
                      <div className="ad-sidebar-inner">
                        <span className="ad-sidebar-title">SIDE BAR ADVERTISEMENT</span>
                        <span className="ad-sidebar-dim">280px × 280px</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Banner */}
                  <div className="ad-banner-mock">
                    <div className="ad-banner-inner">
                      <span className="ad-banner-title">BANNER ADVERTISEMENT</span>
                      <span className="ad-banner-dim">980px × 110px</span>
                    </div>
                  </div>
                </div>
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

                <div className="web-spec-list">
                  <div className="web-spec-item">
                    <div className="web-spec-header">
                      <span className="web-spec-marker"></span>
                      <h4 className="web-spec-title">Header & Footer Banners</h4>
                      <span className="web-spec-dim">980px × 110px</span>
                    </div>
                    <p className="web-spec-desc">
                      Prime top-of-page and bottom-of-page placements offering maximum visual share-of-voice across high-traffic landing pages.
                    </p>
                  </div>
                  
                  <div className="web-spec-item">
                    <div className="web-spec-header">
                      <span className="web-spec-marker"></span>
                      <h4 className="web-spec-title">Sticky Sidebar Display</h4>
                      <span className="web-spec-dim">280px × 280px</span>
                    </div>
                    <p className="web-spec-desc">
                      An interactive square banner that stays locked in the reader&apos;s viewport as they scroll through in-depth editorial articles.
                    </p>
                  </div>

                  <div className="web-spec-item">
                    <div className="web-spec-header">
                      <span className="web-spec-marker"></span>
                      <h4 className="web-spec-title">Editorial Inline Native</h4>
                      <span className="web-spec-dim">640px × 180px</span>
                    </div>
                    <p className="web-spec-desc">
                      Seamlessly integrated horizontal slots placed natively between article paragraphs for high engagement.
                    </p>
                  </div>
                </div>
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

            <div className="ad-designs-comparison-grid">
              {/* Box 1: Trim, Bleed, Safety specs */}
              <div className="ad-specs-container">
                <div className="ad-specs-box bleed-box">
                  <div className="spec-label bleed-lbl">Bleed Size: 8.5&quot; × 11&quot;</div>
                  
                  <div className="ad-specs-box trim-box">
                    <div className="spec-label trim-lbl">Trim Size: 8&quot; × 10.5&quot;</div>
                    
                    <div className="ad-specs-box live-box">
                      <div className="spec-label live-lbl">Live Area / Type Safety: 7.25&quot; × 10&quot;</div>
                      
                      <div className="ad-specs-content">
                        <h4 className="specs-title-red">Trim Size</h4>
                        <p className="specs-val">8&quot; × 10.5&quot;</p>
                        
                        <h4 className="specs-title-red">Bleed Size</h4>
                        <p className="specs-val">8.5&quot; × 11&quot;</p>
                        
                        <h4 className="specs-title-red">Type Safety</h4>
                        <p className="specs-val">7.25&quot; × 10&quot;</p>
                        
                        <p className="specs-notice">(keep all copy within this area on bleed ads)</p>
                        
                        <p className="specs-note"><strong>NOTE:</strong> All dimensions are width × height</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Labeled pointers below */}
                <div className="ad-specs-pointers">
                  <div className="pointer-item">
                    <span className="pointer-arrow">↑</span>
                    <span className="pointer-text trim-text">Trim Line</span>
                  </div>
                  <div className="pointer-item">
                    <span className="pointer-arrow">↑</span>
                    <span className="pointer-text live-text">Live Area</span>
                  </div>
                  <div className="pointer-item">
                    <span className="pointer-arrow">↑</span>
                    <span className="pointer-text bleed-text">Bleed Line</span>
                  </div>
                </div>
              </div>

              {/* Box 2: Sizes Grid */}
              <div className="ad-sizes-grid-wrapper">
                {/* Top Row: Full Page & Spread Page */}
                <div className="ad-sizes-row">
                  <div className="ad-size-card full-page-card">
                    <div className="page-sheet-container single-page">
                      <div className="shaded-area full-page">Full Page</div>
                    </div>
                    <span className="ad-size-label">Full Page</span>
                    <span className="ad-size-dim">8&quot; × 10.5&quot;</span>
                  </div>
                  
                  <div className="ad-size-card spread-card">
                    <div className="page-sheet-container double-page">
                      <div className="shaded-area spread-page">Spread Page</div>
                    </div>
                    <span className="ad-size-label">Spread Page</span>
                    <span className="ad-size-dim">16&quot; × 10.5&quot;</span>
                  </div>
                </div>
                
                {/* Middle Row: Vertical and Horizontal Splits */}
                <div className="ad-sizes-row three-cols">
                  <div className="ad-size-card split-card">
                    <div className="page-sheet-container single-page split-bg">
                      <div className="shaded-area vertical-2-3">2/3 Vertical</div>
                    </div>
                    <span className="ad-size-label">2/3 Vertical</span>
                    <span className="ad-size-dim">5&quot; × 10.5&quot;</span>
                  </div>
                  
                  <div className="ad-size-card split-card">
                    <div className="page-sheet-container single-page split-bg">
                      <div className="shaded-area vertical-1-2">1/2 Vertical</div>
                    </div>
                    <span className="ad-size-label">1/2 Vertical</span>
                    <span className="ad-size-dim">4&quot; × 10.5&quot;</span>
                  </div>
                  
                  <div className="ad-size-card split-card">
                    <div className="page-sheet-container single-page split-bg">
                      <div className="shaded-area horizontal-1-2">1/2 Horizontal</div>
                    </div>
                    <span className="ad-size-label">1/2 Horizontal</span>
                    <span className="ad-size-dim">8&quot; × 5.25&quot;</span>
                  </div>
                </div>
                
                {/* Bottom Row: Horizontal Spread Split */}
                <div className="ad-sizes-row centered">
                  <div className="ad-size-card horizontal-spread-card">
                    <div className="page-sheet-container double-page split-bg">
                      <div className="shaded-area horizontal-spread-1-2">1/2 Horizontal Spread</div>
                    </div>
                    <span className="ad-size-label">1/2 Horizontal Spread</span>
                    <span className="ad-size-dim">16&quot; × 5.25&quot;</span>
                  </div>
                </div>
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
          padding: 7.5rem 0;
          position: relative;
          border-bottom: 1px solid #E8E3DC;
          overflow: hidden;
        }

        .hero-bg-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(122, 15, 35, 0.02) 1px, transparent 1px);
          background-size: 24px 24px;
          pointer-events: none;
          z-index: 1;
        }

        .hero-bg-radial {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 70% 30%, rgba(122, 15, 35, 0.04) 0%, transparent 60%);
          pointer-events: none;
          z-index: 1;
        }

        .advertise-hero-shell {
          max-width: 1240px !important;
          width: 100% !important;
          margin: 0 auto;
          padding-left: 32px !important;
          padding-right: 32px !important;
          position: relative;
          z-index: 2;
        }

        .advertise-hero-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 5rem;
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
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          color: var(--cardinal, #7A0F23);
          text-transform: uppercase;
          margin-bottom: 1rem;
          position: relative;
          padding-left: 1rem;
        }

        .advertise-hero__eyebrow::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 6px;
          background: var(--cardinal, #7A0F23);
          border-radius: 50%;
        }

        .advertise-hero__title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: clamp(2.5rem, 5vw, 3.8rem);
          font-weight: 800;
          line-height: 1.1;
          color: #0f1923;
          margin: 0 0 1.5rem;
          letter-spacing: -0.02em;
        }

        .advertise-hero__title .accent-text {
          color: var(--cardinal, #7A0F23);
          position: relative;
          display: inline-block;
        }

        .advertise-hero__desc {
          font-family: var(--font-serif-body, 'Libre Baskerville', serif);
          font-size: clamp(1.05rem, 1.8vw, 1.25rem);
          line-height: 1.8;
          color: #5A544F;
          margin: 0 0 2.5rem;
        }

        .advertise-hero__actions {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .hero-btn-primary {
          background: var(--cardinal, #7A0F23);
          color: #FFFFFF;
          border: none;
          padding: 14px 28px;
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(122, 15, 35, 0.15);
        }

        .hero-btn-primary:hover {
          background: #0f1923;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(15, 25, 35, 0.2);
        }

        .hero-btn-secondary {
          background: transparent;
          color: #0f1923;
          border: 1.5px solid #0f1923;
          padding: 12.5px 28px;
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .hero-btn-secondary:hover {
          background: #0f1923;
          color: #FFFFFF;
          transform: translateY(-2px);
        }

        /* Right Column: Premium Masthead Card */
        .advertise-hero__right {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .media-masthead-card {
          background: #FFFFFF;
          border: 1px solid #E2DDD7;
          border-radius: 0;
          padding: 3rem 2.5rem;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 20px 45px rgba(15, 25, 35, 0.04);
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .media-masthead-card:hover {
          border-color: var(--cardinal, #7A0F23);
          transform: translateY(-5px);
          box-shadow: 0 30px 60px rgba(122, 15, 35, 0.08);
        }

        .masthead-border-accent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--cardinal, #7A0F23);
        }

        .masthead-seal {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 7rem;
          font-weight: 900;
          color: rgba(122, 15, 35, 0.02);
          line-height: 1;
          position: absolute;
          right: -10px;
          bottom: -15px;
          pointer-events: none;
          letter-spacing: -0.05em;
          transition: color 0.4s ease;
        }

        .media-masthead-card:hover .masthead-seal {
          color: rgba(122, 15, 35, 0.04);
        }

        .masthead-info {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          position: relative;
          z-index: 2;
        }

        .masthead-label {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--cardinal, #7A0F23);
          margin-bottom: 0.25rem;
        }

        .masthead-badge {
          display: flex;
          gap: 1.25rem;
          align-items: center;
          border-bottom: 1px solid #F0ECE6;
          padding-bottom: 1.25rem;
          transition: border-color 0.3s ease;
        }

        .media-masthead-card:hover .masthead-badge {
          border-color: #E2DDD7;
        }

        .masthead-badge:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .badge-icon {
          width: 44px;
          height: 44px;
          background: rgba(122, 15, 35, 0.04);
          color: var(--cardinal, #7A0F23);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .media-masthead-card:hover .badge-icon {
          background: var(--cardinal, #7A0F23);
          color: #FFFFFF;
        }

        .badge-content {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .badge-kicker {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #666666;
          text-transform: uppercase;
        }

        .badge-value {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 1.6rem;
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
        }

        /* ── ADVERTISEMENT MOCKUP DESIGNS ── */
        .ad-layout-demo {
          background: #FAF8F5;
          border: 1px solid #E2DDD7;
          padding: 2rem;
          max-width: 700px;
          margin: 0 auto;
          width: 100%;
        }
        .ad-web-mockup {
          background: #FFFFFF;
          border: 1px solid #C4BDB3;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
        .ad-banner-mock {
          background: #4A4A4A;
          color: #FFFFFF;
          height: 110px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
          border: 1px dashed #7E7E7E;
        }
        .ad-banner-inner, .ad-sidebar-inner {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .ad-banner-title, .ad-sidebar-title {
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.05em;
        }
        .ad-banner-dim, .ad-sidebar-dim {
          font-family: monospace;
          font-size: 12px;
          color: #DCDCDC;
        }
        .ad-web-body {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 1.5rem;
          align-items: stretch;
        }
        .ad-web-content-placeholder {
          display: flex;
          flex-direction: column;
          gap: 12px;
          justify-content: center;
        }
        .mock-line {
          height: 10px;
          background: #E8E3DC;
          border-radius: 4px;
        }
        .mock-line.long { width: 100%; }
        .mock-line.medium { width: 75%; }
        .mock-line.short { width: 40%; }
        .ad-sidebar-mock {
          background: #4A4A4A;
          color: #FFFFFF;
          height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          border: 1px dashed #7E7E7E;
        }

        .web-spec-list {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .web-spec-item {
          border-left: 2px solid rgba(122, 15, 35, 0.15);
          padding-left: 1.25rem;
          transition: border-color 0.3s ease;
        }
        .web-spec-item:hover {
          border-left-color: var(--cardinal, #7A0F23);
        }
        .web-spec-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.35rem;
          flex-wrap: wrap;
        }
        .web-spec-marker {
          width: 6px;
          height: 6px;
          background: var(--cardinal, #7A0F23);
          border-radius: 50%;
          display: inline-block;
        }
        .web-spec-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-weight: 700;
          font-size: 1.15rem;
          color: #0f1923;
          margin: 0;
        }
        .web-spec-dim {
          font-family: monospace;
          font-size: 0.85rem;
          color: var(--cardinal, #7A0F23);
          background: rgba(122, 15, 35, 0.06);
          padding: 1px 6px;
          border-radius: 2px;
          font-weight: 700;
        }
        .web-spec-desc {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 0.95rem;
          line-height: 1.5;
          color: #666666;
          margin: 0;
        }

        .ad-designs-comparison-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 2.5rem;
          align-items: flex-start;
          width: 100%;
        }

        .ad-specs-container {
          background: #FFFFFF;
          padding: 2rem;
          border: 1px solid #E2DDD7;
          width: 100%;
        }
        .ad-specs-box {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          width: 100%;
        }
        .bleed-box {
          border: 2px dashed #D63031;
          aspect-ratio: 8.5 / 11;
          padding: 1.5rem;
        }
        .trim-box {
          border: 2px solid #000000;
          padding: 1.5rem;
          height: 100%;
        }
        .live-box {
          border: 2px dashed #D63031;
          padding: 2rem;
          height: 100%;
          background: rgba(250, 248, 245, 0.5);
        }
        .spec-label {
          position: absolute;
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          padding: 2px 6px;
          background: #FFFFFF;
          white-space: nowrap;
          z-index: 5;
        }
        .bleed-lbl {
          top: -10px;
          left: 10px;
          color: #D63031;
          border: 1px solid #D63031;
        }
        .trim-lbl {
          top: -10px;
          left: 10px;
          color: #000000;
          border: 1px solid #000000;
        }
        .live-lbl {
          top: -10px;
          left: 10px;
          color: #D63031;
          border: 1px solid #D63031;
        }
        .ad-specs-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .specs-title-red {
          color: #D63031;
          font-size: 13px;
          font-weight: 700;
          margin: 0;
        }
        .specs-val {
          font-size: 15px;
          font-weight: 700;
          color: #000000;
          margin: 0 0 6px;
        }
        .specs-notice {
          font-size: 11px;
          color: #555555;
          margin: 4px 0;
          font-style: italic;
          line-height: 1.4;
        }
        .specs-note {
          font-size: 10px;
          color: #000000;
          margin-top: 8px;
        }
        .ad-specs-pointers {
          display: flex;
          justify-content: space-around;
          margin-top: 1.5rem;
          border-top: 1px solid #E2DDD7;
          padding-top: 1rem;
        }
        .pointer-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .pointer-arrow {
          font-size: 14px;
          color: #000000;
        }
        .pointer-text {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .trim-text { color: #000000; }
        .live-text { color: #D63031; }
        .bleed-text { color: #D63031; }

        .ad-sizes-grid-wrapper {
          background: #FAF8F5;
          padding: 2rem;
          border: 1px solid #E2DDD7;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          width: 100%;
        }
        .ad-sizes-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          width: 100%;
        }
        .ad-sizes-row.three-cols {
          grid-template-columns: repeat(3, 1fr);
        }
        .ad-sizes-row.centered {
          display: flex;
          justify-content: center;
        }
        .ad-size-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background: #FFFFFF;
          border: 1px solid rgba(15, 25, 35, 0.05);
          padding: 1.25rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.02);
          transition: all 0.3s ease;
          width: 100%;
        }
        .ad-size-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
        }
        .horizontal-spread-card {
          max-width: 380px;
        }
        .page-sheet-container {
          border: 1px solid #000000;
          background: #FFFFFF;
          position: relative;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          margin-bottom: 0.75rem;
        }
        .page-sheet-container.single-page {
          aspect-ratio: 8 / 10.5;
          width: 90px;
        }
        .page-sheet-container.double-page {
          aspect-ratio: 16 / 10.5;
          width: 180px;
        }
        .shaded-area {
          background: #E8E3DC;
          border: 1px dashed #7A0F23;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          font-weight: 700;
          color: #7A0F23;
          text-align: center;
          position: absolute;
          padding: 2px;
          line-height: 1.1;
        }
        .shaded-area.full-page {
          inset: 0;
        }
        .shaded-area.spread-page {
          inset: 0;
        }
        .shaded-area.vertical-2-3 {
          top: 0;
          bottom: 0;
          left: 0;
          width: 66.6%;
        }
        .shaded-area.vertical-1-2 {
          top: 0;
          bottom: 0;
          left: 0;
          width: 50%;
        }
        .shaded-area.horizontal-1-2 {
          bottom: 0;
          left: 0;
          right: 0;
          height: 50%;
        }
        .shaded-area.horizontal-spread-1-2 {
          bottom: 0;
          left: 0;
          right: 0;
          height: 50%;
        }
        .ad-size-label {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-weight: 700;
          font-size: 13px;
          color: #0f1923;
          margin-bottom: 4px;
        }
        .ad-size-dim {
          font-family: monospace;
          font-size: 11px;
          color: #7A0F23;
          font-weight: 700;
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
          .ad-web-body {
            grid-template-columns: 1fr;
          }
          .ad-banner-mock {
            height: 80px;
          }
          .ad-sidebar-mock {
            height: 200px;
          }
          .ad-designs-comparison-grid {
            grid-template-columns: 1fr;
          }
          .ad-sizes-row.three-cols {
            grid-template-columns: 1fr;
          }
          .ad-sizes-row {
            grid-template-columns: 1fr;
          }
          .page-sheet-container.single-page {
            width: 80px;
          }
          .page-sheet-container.double-page {
            width: 160px;
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
