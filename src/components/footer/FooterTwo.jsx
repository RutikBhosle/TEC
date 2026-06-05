import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import SocialLink from "../../data/social/SocialLink.json";

const navColumns = [
  {
    heading: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Magazines", href: "/magazines" },
      { label: "Blogs", href: "/blogs" },
      { label: "Web Profiles", href: "/category/web-profiles" },
      { label: "Advertise", href: "/advertise-with-us" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Sectors",
    links: [
      { label: "Business & Finance", href: "/category/business-bulletin" },
      { label: "Innovation & Tech", href: "/industries/tech-ai" },
      { label: "Leadership", href: "/category/master-talks" },
      { label: "Aviation & Aerospace", href: "/industries/transportation" },
      { label: "Health & Wellness", href: "/industries/healthcare" },
      { label: "AgriTech", href: "/category/market-news" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Entrepreneurship", href: "/blogs" },
      { label: "Legal", href: "/industries/legal" },
      { label: "Market News", href: "/category/market-news" },
      { label: "Master Talks", href: "/category/master-talks" },
      { label: "Privacy Policy", href: "/" },
    ],
  },
];

const FooterTwo = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const query = `
*[_type == "magazine"]{
  title,
  slug,
  "featureImg": mainImage.asset->url,
  publishedAt
} | order(publishedAt desc)[0...3]
`;

  const { data } = useQuery({
    queryKey: ["footer-magazines-editorial"],
    queryFn: async () => client.fetch(query),
  });

  const magazines = data || [];

  const formatDate = (mag) => {
    const d = mag.publishedAt;
    if (!d) return "";
    try {
      return new Date(d).toLocaleDateString("en-US", { month: "long", year: "numeric" });
    } catch { return ""; }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <>
      <footer className="ft-root">

        {/* ── NEWSLETTER BAND ── */}
        <div className="ft-newsletter-band">
          <div className="ft-inner">
            <div className="ft-nl-grid">
              <div className="ft-nl-left">
                <span className="ft-nl-kicker">Stay Ahead of the Curve</span>
                <h2 className="ft-nl-headline">
                  The Entrepreneurial<br />
                  <em>Intelligence</em> Brief.
                </h2>
                <p className="ft-nl-sub">
                  Curated insights on leadership, market moves, and emerging ventures —
                  delivered weekly to founders and decision-makers.
                </p>
              </div>
              <div className="ft-nl-right">
                {subscribed ? (
                  <div className="ft-nl-success">
                    <span className="ft-nl-check">✓</span>
                    <p>You&apos;re on the list.<br />Expect brilliance in your inbox.</p>
                  </div>
                ) : (
                  <form className="ft-nl-form" onSubmit={handleSubscribe}>
                    <label className="ft-nl-label" htmlFor="ft-email">Your professional email</label>
                    <div className="ft-nl-row">
                      <input
                        id="ft-email"
                        className="ft-nl-input"
                        type="email"
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <button className="ft-nl-btn" type="submit">Subscribe</button>
                    </div>
                    <p className="ft-nl-note">No spam. Unsubscribe at any time.</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN NAV GRID ── */}
        <div className="ft-main">
          <div className="ft-inner">

            {/* Top row: Logo + nav columns */}
            <div className="ft-main-grid">

              {/* Brand block */}
              <div className="ft-brand">
                <Link href="/" className="ft-logo-link">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/logoblack.png"
                    alt="Star Prime"
                    className="ft-logo-img"
                  />
                </Link>
                <p className="ft-brand-desc">
                  {"Star Prime is an independent editorial platform chronicling the minds, markets, and movements shaping tomorrow's economy."}
                </p>

              </div>

              {/* Nav columns */}
              {navColumns.map((col) => (
                <div key={col.heading} className="ft-nav-col">
                  <div className="ft-nav-heading">{col.heading}</div>
                  <ul className="ft-nav-list">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="ft-nav-link">{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Latest Editions */}
              <div className="ft-editions-col">
                <div className="ft-nav-heading">Latest Editions</div>
                {magazines.length > 0 ? (
                  <div className="ft-editions-list">
                    {magazines.map((mag, i) => (
                      <Link
                        key={mag.slug?.current || i}
                        href={`/magazine/${mag.slug?.current}`}
                        className="ft-edition-item"
                      >
                        <div className="ft-edition-thumb">
                          {mag.featureImg ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={mag.featureImg} alt={mag.title} />
                          ) : (
                            <div className="ft-edition-placeholder" />
                          )}
                        </div>
                        <div className="ft-edition-info">
                          <div className="ft-edition-title">{mag.title}</div>
                          <div className="ft-edition-date">{formatDate(mag)}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="ft-muted">Loading editions…</p>
                )}
              </div>
            </div>

            {/* ── DIVIDER ── */}
            <div className="ft-divider" />

            {/* ── IDENTITY STRIP ── */}
            <div className="ft-identity-strip">
              <div className="ft-wordmark">STAR PRIME</div>
              <div className="ft-tagline-strip">Crafting Entrepreneurial Legends</div>
            </div>

            {/* ── BOTTOM BAR ── */}
            <div className="ft-bottom">
              <div className="ft-copy">
                © {new Date().getFullYear()} Star Prime Media. All rights reserved.{" "}
                <a
                  href="https://www.intellisysitsolutions.com/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Designed by Team Intellisys
                </a>
              </div>
              <div className="ft-bottom-links">
                <Link href="/">Privacy Policy</Link>
                <span className="ft-bottom-sep">·</span>
                <Link href="/">Terms of Use</Link>
                <span className="ft-bottom-sep">·</span>
                <Link href="/">Cookie Policy</Link>
                <span className="ft-bottom-sep">·</span>
                <Link href="/">Sitemap</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        /* ── ROOT ── */
        .ft-root {
          font-family: var(--secondary-font);
          color: rgba(255,255,255,0.55);
          margin-top: 0;
          /* Hard reset: prevent any parent context color from cascading in */
          -webkit-font-smoothing: antialiased;
        }

        /* Lock all plain paragraph text inside the footer */
        .ft-root p {
          color: inherit;
          font-size: 13px;
          font-weight: 400;
        }

        .ft-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
        }

        /* ── NEWSLETTER BAND ── */
        .ft-newsletter-band {
          background: #7A0F23;
          padding: 72px 0;
          position: relative;
          overflow: hidden;
        }
        .ft-newsletter-band::before {
          content: '';
          position: absolute;
          top: -80px;
          right: -80px;
          width: 360px;
          height: 360px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 50%;
          pointer-events: none;
        }
        .ft-newsletter-band::after {
          content: '';
          position: absolute;
          bottom: -120px;
          left: 10%;
          width: 500px;
          height: 500px;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 50%;
          pointer-events: none;
        }

        .ft-nl-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .ft-nl-kicker {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.25);
          padding-bottom: 8px;
        }

        .ft-nl-headline {
          font-family: var(--primary-font);
          font-size: clamp(28px, 3vw, 42px);
          font-weight: 400;
          color: #ffffff;
          line-height: 1.15;
          margin: 0 0 20px;
          letter-spacing: -0.01em;
        }
        .ft-nl-headline em {
          font-style: italic;
          color: rgba(255,255,255,0.8);
        }

        .ft-nl-sub {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255,255,255,0.7);
          margin: 0;
          max-width: 400px;
        }

        .ft-nl-right {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .ft-nl-label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          margin-bottom: 12px;
        }

        .ft-nl-row {
          display: flex;
          gap: 0;
        }

        .ft-nl-input {
          flex: 1;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.25);
          border-right: none;
          color: #fff;
          font-family: var(--secondary-font);
          font-size: 14px;
          padding: 14px 18px;
          outline: none;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .ft-nl-input::placeholder {
          color: rgba(255,255,255,0.35);
        }
        .ft-nl-input:focus {
          background: rgba(255,255,255,0.16);
          border-color: rgba(255,255,255,0.5);
        }

        .ft-nl-btn {
          background: #ffffff;
          color: #7A0F23;
          border: none;
          font-family: var(--secondary-font);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 14px 24px;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
          white-space: nowrap;
        }
        .ft-nl-btn:hover {
          background: #0f1923;
          color: #ffffff;
        }

        .ft-nl-note {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          margin: 10px 0 0;
        }

        .ft-nl-success {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .ft-nl-check {
          font-size: 28px;
          color: #ffffff;
          line-height: 1;
        }
        .ft-nl-success p {
          font-family: var(--primary-font);
          font-size: 16px;
          color: rgba(255,255,255,0.9);
          line-height: 1.5;
          margin: 0;
        }

        /* ── MAIN SECTION ── */
        .ft-main {
          background: #0f1923;
          padding: 60px 0 0;
        }

        /* ── MAIN GRID ──
         * Brand col: fixed 220px
         * 3 nav cols: each 1fr (flex, equal)
         * Editions: fixed 210px
         */
        .ft-main-grid {
          display: grid;
          grid-template-columns: 220px repeat(3, 1fr) 210px;
          gap: 40px;
          padding-bottom: 56px;
        }

        /* ── BRAND ── */
        .ft-logo-link {
          display: inline-block;
          margin-bottom: 16px;
          line-height: 0;
          transition: opacity 0.2s ease;
        }
        .ft-logo-link:hover { opacity: 0.8; }

        .ft-logo-img {
          width: 170px;
          height: auto;
          object-fit: contain;
        }

        .ft-brand-desc {
          font-size: 12px !important;
          line-height: 1.7 !important;
          color: rgba(255,255,255,0.42) !important;
          margin: 0 0 20px;
          font-weight: 400 !important;
        }



        /* ────────────────────────────────────────────────────
         * NAV COLUMN HIERARCHY SYSTEM
         *
         * Tier 1 — Column label (EXPLORE, SECTORS…)
         *   9px | weight 700 | 0.2em spacing | 28% opacity
         *
         * Tier 2 — Nav link (default)
         *   13px | weight 400 | 52% opacity white
         *
         * Tier 3 — Nav link hover
         *   13px | weight 500 | 95% white
         *
         * SPECIFICITY FIX:
         *   Global a { color: inherit } = specificity (0,0,1)
         *   Global a:hover { color: #7A0F23 } = (0,0,2)
         *   Using :global(a.ft-nav-link) = (0,1,1) — always wins.
         *   Using :global(a.ft-nav-link:hover) = (0,1,2) — always wins.
         * ──────────────────────────────────────────────────── */
        .ft-nav-col {}

        .ft-nav-heading {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          margin: 0 0 18px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        .ft-nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        /* Tier 2: default
         * Using !important across font & color ensures this wins over:
         * - global a { color: inherit } (specificity 0,0,1)
         * - any parent with --primary-color set (color: inherit cascade)
         * - styled-jsx runtime reordering edge cases
         */
        :global(a.ft-nav-link),
        :global(a.ft-nav-link:visited),
        :global(a.ft-nav-link:active) {
          font-family: var(--secondary-font) !important;
          font-size: 13px !important;
          font-weight: 400 !important;
          color: rgba(255,255,255,0.55) !important;
          text-decoration: none !important;
          display: block;
          line-height: 1.45;
          transition: color 0.18s ease;
          background: none !important;
        }
        /* Tier 3: hover */
        :global(a.ft-nav-link:hover),
        :global(a.ft-nav-link:focus) {
          color: rgba(255,255,255,0.92) !important;
          text-decoration: none !important;
          background: none !important;
        }

        /* ── EDITIONS ── */
        .ft-editions-col {}

        .ft-editions-list {
          display: flex;
          flex-direction: column;
        }

        :global(a.ft-edition-item) {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          padding: 11px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          text-decoration: none !important;
          transition: opacity 0.2s ease;
        }
        :global(a.ft-edition-item:first-child) {
          padding-top: 0;
        }
        :global(a.ft-edition-item:last-child) {
          border-bottom: none;
        }
        :global(a.ft-edition-item:hover) {
          opacity: 0.72;
          text-decoration: none !important;
        }

        .ft-edition-thumb {
          width: 48px;
          height: 38px;
          flex-shrink: 0;
          overflow: hidden;
          background: #1A2535;
        }
        .ft-edition-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .ft-edition-placeholder {
          width: 100%;
          height: 100%;
          background: #1A2535;
        }

        .ft-edition-info { flex: 1; min-width: 0; }

        .ft-edition-title {
          font-family: var(--primary-font);
          font-size: 11.5px;
          font-weight: 400;
          color: rgba(255,255,255,0.7);
          line-height: 1.4;
          margin-bottom: 3px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .ft-edition-date {
          font-size: 9.5px;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.05em;
        }

        .ft-muted {
          font-size: 12px;
          color: rgba(255,255,255,0.28);
          margin: 0;
        }

        /* ── DIVIDER ── */
        .ft-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
        }

        /* ── IDENTITY STRIP ── */
        .ft-identity-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 0 10px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          gap: 24px;
          overflow: hidden;
        }

        .ft-wordmark {
          font-family: var(--primary-font);
          font-size: clamp(28px, 4vw, 52px);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: rgba(255,255,255,0.04);
          line-height: 1;
          white-space: nowrap;
          user-select: none;
        }

        .ft-tagline-strip {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.18);
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* ── BOTTOM BAR ── */
        .ft-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 0 26px;
          gap: 24px;
          flex-wrap: wrap;
        }

        .ft-copy {
          font-size: 11px;
          color: rgba(255,255,255,0.22);
        }
        .ft-copy :global(a) {
          font-size: 11px;
          color: rgba(255,255,255,0.35) !important;
          text-decoration: none !important;
          transition: color 0.2s ease;
        }
        .ft-copy :global(a:hover) {
          color: #7A0F23 !important;
        }

        .ft-bottom-links {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ft-bottom-links :global(a) {
          font-size: 11px;
          color: rgba(255,255,255,0.28) !important;
          text-decoration: none !important;
          transition: color 0.2s ease;
        }
        .ft-bottom-links :global(a:hover) {
          color: rgba(255,255,255,0.75) !important;
        }
        .ft-bottom-sep {
          color: rgba(255,255,255,0.12);
          font-size: 10px;
        }

        /* ── RESPONSIVE ── */

        @media (max-width: 1200px) {
          .ft-main-grid {
            grid-template-columns: 190px repeat(3, 1fr) 190px;
            gap: 32px;
          }
        }

        @media (max-width: 960px) {
          .ft-main-grid {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 28px;
          }
          .ft-brand {
            grid-column: 1 / -1;
            display: grid;
            grid-template-columns: auto 1fr auto;
            align-items: start;
            gap: 32px;
          }
          .ft-logo-link { margin-bottom: 0; }
          .ft-brand-desc { margin-bottom: 0; }
          .ft-editions-col { grid-column: 1 / -1; }
        }

        @media (max-width: 768px) {
          .ft-inner { padding: 0 20px; }
          .ft-nl-grid { grid-template-columns: 1fr; gap: 40px; }
          .ft-newsletter-band { padding: 52px 0; }
          .ft-main { padding: 44px 0 0; }
          .ft-main-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
          .ft-brand { grid-column: 1 / -1; display: block; }
          .ft-brand-desc { margin-bottom: 18px; }
          .ft-identity-strip { flex-direction: column; gap: 6px; padding: 18px 0 14px; }
          .ft-wordmark { font-size: 36px; }
          .ft-bottom { flex-direction: column; align-items: flex-start; gap: 10px; }
          .ft-bottom-links { flex-wrap: wrap; }
        }

        @media (max-width: 480px) {
          .ft-main-grid { grid-template-columns: 1fr; }
          .ft-nl-row { flex-direction: column; }
          .ft-nl-input { border-right: 1px solid rgba(255,255,255,0.25); }
          .ft-nl-btn { width: 100%; text-align: center; }
        }
      `}</style>
    </>
  );
};

export default FooterTwo;
