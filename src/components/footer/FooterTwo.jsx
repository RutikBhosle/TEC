import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import SocialLink from "../../data/social/SocialLink.json";
import NavbarLogo from "../../assest/chronicle_logo.png";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Magazines", href: "/magazines" },
  { label: "Blogs", href: "/blogs" },
  { label: "Web Profiles", href: "/category/web-profiles" },
  { label: "Market News", href: "/category/market-news" },
  { label: "Master Talks", href: "/category/master-talks" },
  { label: "Advertise", href: "/advertise-with-us" },
  { label: "Contact", href: "/contact" },
];

const categories = [
  { label: "Business & Finance", href: "/category/business-bulletin" },
  { label: "Innovation & Technology", href: "/industries/tech-ai" },
  { label: "Leadership", href: "/category/master-talks" },
  { label: "Aviation & Aerospace", href: "/industries/transportation" },
  { label: "Health & Wellness", href: "/industries/healthcare" },
  { label: "AgriTech", href: "/category/market-news" },
  { label: "Entrepreneurship", href: "/blogs" },
  { label: "Legal", href: "/industries/legal" },
];

const FooterTwo = () => {
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

  return (
    <>
      <footer className="ec-footer">
        <div className="ec-footer-wrap">
          {/* TOP GRID */}
          <div className="ec-footer-top">
            {/* Brand Column */}
            <div className="ec-footer-brand">
              <Link href="/" className="ec-footer-logo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={NavbarLogo.src}
                  alt="The Entrepreneurial Chronicles"
                  width="240"
                  height="80"
                  style={{ objectFit: "contain", width: "200px", height: "auto" }}
                />
              </Link>
              <p className="ec-footer-tagline">
                The Entrepreneurial Chronicles — Crafting Entrepreneurial Legends, one story at a time.
              </p>
              <div className="ec-footer-socials">
                <a href={SocialLink.fb.url} target="_blank" rel="noopener noreferrer" className="ec-footer-social">
                  <i className={SocialLink.fb.icon} />
                </a>
                <a href={SocialLink.linked.url} target="_blank" rel="noopener noreferrer" className="ec-footer-social">
                  <i className={SocialLink.linked.icon} />
                </a>
                <a href={SocialLink.yt.url} target="_blank" rel="noopener noreferrer" className="ec-footer-social">
                  <i className={SocialLink.yt.icon} />
                </a>
                <a href={SocialLink.instagram.url} target="_blank" rel="noopener noreferrer" className="ec-footer-social">
                  <i className={SocialLink.instagram.icon} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="ec-footer-col">
              <div className="ec-footer-col-title">Quick Links</div>
              <ul className="ec-footer-links">
                {quickLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="ec-footer-col">
              <div className="ec-footer-col-title">Categories</div>
              <ul className="ec-footer-links">
                {categories.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Latest Magazines */}
            <div className="ec-footer-col">
              <div className="ec-footer-col-title">Latest Magazines</div>
              {magazines.length > 0 ? (
                <div className="ec-footer-mags">
                  {magazines.map((mag, i) => (
                    <Link
                      key={mag.slug?.current || i}
                      href={`/magazine/${mag.slug?.current}`}
                      className="ec-footer-mag-item"
                    >
                      <div className="ec-footer-mag-img">
                        {mag.featureImg ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={mag.featureImg} alt={mag.title} />
                        ) : (
                          <div className="ec-footer-mag-placeholder" />
                        )}
                      </div>
                      <div>
                        <div className="ec-footer-mag-title">{mag.title}</div>
                        <div className="ec-footer-mag-date">{formatDate(mag)}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="ec-footer-muted">Loading magazines…</p>
              )}
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="ec-footer-bottom">
            <div className="ec-footer-copy">
              © 2026 The Entrepreneurial Chronicles. All rights reserved.{" "}
              <a href="https://www.intellisysitsolutions.com/index.html" target="_blank" rel="noopener noreferrer">
                Designed by Team Intellisys
              </a>
            </div>
            <div className="ec-footer-bottom-links">
              <Link href="/">Privacy Policy</Link>
              <Link href="/">Terms of Use</Link>
              <Link href="/">Cookie Policy</Link>
              <Link href="/">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .ec-footer {
          background: #0F1923;
          border-top: 1px solid #1E2D3D;
          color: #D0C9BF;
          margin-top: 0;
          font-family: 'DM Sans', sans-serif;
        }

        .ec-footer-wrap {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .ec-footer-top {
          display: grid;
          grid-template-columns: 260px 1fr 1fr 1fr;
          gap: 48px;
          padding: 60px 0 48px;
          border-bottom: 1px solid #1E2D3D;
        }

        /* Brand */
        .ec-footer-logo {
          display: inline-block;
          margin-bottom: 16px;
          line-height: 0;
        }

        .ec-footer-tagline {
          font-size: 12px;
          color: #9A9490;
          line-height: 1.6;
          margin: 0 0 20px;
          font-style: italic;
        }

        .ec-footer-socials {
          display: flex;
          gap: 10px;
        }

        .ec-footer-social {
          width: 32px;
          height: 32px;
          border: 1px solid #1E2D3D;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          color: #9A9490;
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }
        .ec-footer-social:hover { border-color: #C1121F; color: #C1121F; }

        /* Columns */
        .ec-footer-col {}

        .ec-footer-col-title {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #fff;
          margin: 0 0 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid #1E2D3D;
        }

        .ec-footer-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .ec-footer-links :global(a) {
          font-size: 13px;
          color: #9A9490;
          text-decoration: none;
          transition: color 0.2s;
        }
        .ec-footer-links :global(a:hover) { color: #fff; }

        /* Latest Magazines */
        .ec-footer-mags {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .ec-footer-mag-item {
          display: flex;
          gap: 12px;
          margin-bottom: 14px;
          padding-bottom: 14px;
          border-bottom: 1px solid #1E2D3D;
          text-decoration: none;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .ec-footer-mag-item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .ec-footer-mag-item:hover { opacity: 0.8; }

        .ec-footer-mag-img {
          width: 56px;
          height: 42px;
          object-fit: cover;
          background: #1E2D3D;
          flex-shrink: 0;
          overflow: hidden;
        }

        .ec-footer-mag-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .ec-footer-mag-placeholder {
          width: 100%;
          height: 100%;
          background: #1E2D3D;
        }

        .ec-footer-mag-title {
          font-family: 'Libre Baskerville', serif;
          font-size: 12px;
          color: #D0C9BF;
          line-height: 1.4;
          margin-bottom: 4px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .ec-footer-mag-date {
          font-size: 10px;
          color: #9A9490;
        }

        .ec-footer-muted {
          font-size: 13px;
          color: #9A9490;
          margin: 0;
        }

        /* Bottom Bar */
        .ec-footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 0;
        }

        .ec-footer-copy {
          font-size: 11px;
          color: #9A9490;
        }

        .ec-footer-copy :global(a) {
          color: #9A9490;
          text-decoration: none;
        }
        .ec-footer-copy :global(a:hover) { color: #C1121F; }

        .ec-footer-bottom-links {
          display: flex;
          gap: 24px;
        }

        .ec-footer-bottom-links :global(a) {
          font-size: 11px;
          color: #9A9490;
          text-decoration: none;
          transition: color 0.2s;
        }
        .ec-footer-bottom-links :global(a:hover) { color: #C1121F; }

        /* RESPONSIVE */
        @media (max-width: 1100px) {
          .ec-footer-top {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
            row-gap: 28px;
          }
        }

        @media (max-width: 768px) {
          .ec-footer-wrap { padding: 0 18px; }
          .ec-footer-top {
            grid-template-columns: 1fr;
            padding: 40px 0 32px;
          }
          .ec-footer-bottom {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
          .ec-footer-bottom-links {
            flex-wrap: wrap;
            justify-content: center;
            gap: 16px;
          }
        }
      `}</style>
    </>
  );
};

export default FooterTwo;
