import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import HeadMeta from "../components/elements/HeadMeta";
import HeaderOne from "../components/header/HeaderOne";
import FooterTwo from "../components/footer/FooterTwo";
import { useEffect } from "react";
import { useRouter } from "next/router";

const ContactPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.asPath.includes("#")) return;

    const hash = router.asPath.split("#")[1];
    const timer = setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [router.asPath]);

  return (
    <div className="contact-page">
      <HeadMeta
        metaTitle="Connect and Share Your Story with Star Prime Magazine"
        metaDesc="Share your entrepreneurial journey and inspire others with Star Prime Magazine. Connect with a global community of business leaders, innovators, and changemakers by contributing your unique story and insights."
      />

      <HeaderOne />

      {/* ULTRA-PREMIUM IMMERSIVE SPLIT DARK HERO COVER */}
      <section className="contact-hero animate-fade">
        <div className="contact-hero-shell">
          <div className="contact-hero-grid">
            
            {/* LEFT COLUMN: HERO COPY */}
            <div className="contact-hero__left">
              <span className="contact-hero__eyebrow">Get In Touch</span>
              <h1 className="contact-hero__title">Connect With Star Prime</h1>
              <p className="contact-hero__desc">
                Welcome to Star Prime, where we spotlight trailblazers
                shaping the global business landscape. Whether you have a visionary story to share, 
                a collaborative proposal, or an advertising inquiry, our editors want to hear from you.
              </p>
              <div className="contact-hero__divider" />
              <div className="contact-hero__actions">
                <a href="#contact-form-section" className="btn btn-primary">
                  Send Message
                </a>
                <a href="#headquarters" className="btn btn-secondary">
                  View Location
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN: PREMIUM EDITORIAL MASTHEAD BADGES */}
            <div className="contact-hero__right">
              <div className="masthead-card">
                <div className="masthead-seal">T.E.C</div>
                <div className="masthead-info">
                  <div className="masthead-badge">
                    <span className="badge-kicker">Established</span>
                    <span className="badge-value">2026 Edition</span>
                  </div>
                  <div className="masthead-badge">
                    <span className="badge-kicker">Frequency</span>
                    <span className="badge-value">Weekly Prime</span>
                  </div>
                  <div className="masthead-badge">
                    <span className="badge-kicker">Circulation</span>
                    <span className="badge-value">Global Bureau</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACT FORM & INFO SECTION (WARM WHEAT BACKGROUND) */}
      <section id="contact-form-section" className="contact-form-section">
        <div className="container contact-shell">
          <div className="row align-items-stretch">
            <div className="col-lg-7 d-flex align-items-stretch">
              <ContactForm />
            </div>
            <div className="col-lg-5 d-flex align-items-stretch">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      {/* HEADQUARTERS MAP LOCATION (WARM BACKGROUND) */}
      <section id="headquarters" className="our-location-section">
        <div className="container contact-shell location-section-wrap">
          <header className="location-header">
            <span className="location-eyebrow">Our Headquarters</span>
            <h2 className="location-title">Corporate Presence</h2>
            <div className="location-divider" />
          </header>
          
          <div className="location-grid location-grid--single">
            <div id="germany-map" className="location-map-item">
              <div className="location-map-wrapper">
                <iframe
                  src="https://www.google.com/maps?q=6605+Longshore+St,+Dublin,+OH+43017,+USA&output=embed"
                  width="100%"
                  height={380}
                  style={{ border: 0, width: "100%", display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="6605 Longshore St, Dublin, OH 43017, USA"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterTwo />

      <style jsx>{`
        .contact-page {
          background: #FAF8F5;
          color: #0F1923;
          min-height: 100vh;
          font-family: var(--font-sans, 'DM Sans', sans-serif);
        }

        .contact-shell {
          max-width: 1240px !important;
          width: 100% !important;
          margin: 0 auto;
          padding-left: 32px !important;
          padding-right: 32px !important;
        }

        /* Immersive Dark Hero Cover with Asymmetric Split */
        .contact-hero {
          background: #0F1923;
          color: #FFFFFF;
          padding: 6.5rem 0;
          position: relative;
          border-bottom: 1px solid #1E2D3D;
        }

        .contact-hero-shell {
          max-width: 1240px !important;
          width: 100% !important;
          margin: 0 auto;
          padding-left: 32px !important;
          padding-right: 32px !important;
        }

        .contact-hero-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 4.5rem;
          align-items: center;
        }

        .contact-hero__left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .contact-hero__eyebrow {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: var(--cardinal, #C1121F);
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }

        .contact-hero__title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: clamp(2.25rem, 4.5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.15;
          color: #FFFFFF;
          margin: 0 0 1.25rem;
          letter-spacing: -0.02em;
        }

        .contact-hero__desc {
          font-family: var(--font-serif-body, 'Libre Baskerville', serif);
          font-size: clamp(0.95rem, 1.8vw, 1.15rem);
          line-height: 1.75;
          color: #D0C9BF;
          margin: 0 0 1.5rem;
        }

        .contact-hero__divider {
          width: 80px;
          height: 3px;
          background: var(--cardinal, #C1121F);
          margin-bottom: 2.25rem;
          border-radius: 999px;
        }

        .contact-hero__actions {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        .contact-hero__actions :global(.btn) {
          border-radius: 999px !important;
          padding: 15px 36px !important;
          font-family: var(--font-sans, 'DM Sans', sans-serif) !important;
          font-size: 0.85rem !important;
          font-weight: 700 !important;
          letter-spacing: 0.12em !important;
          text-transform: uppercase !important;
          transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) !important;
          cursor: pointer !important;
        }

        .contact-hero__actions :global(.btn-primary) {
          background-color: var(--cardinal, #C1121F) !important;
          border: none !important;
          color: #FFFFFF !important;
          box-shadow: 0 4px 15px rgba(193, 18, 31, 0.25) !important;
        }

        .contact-hero__actions :global(.btn-primary:hover) {
          background-color: #FFFFFF !important;
          color: var(--ink, #0F1923) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2) !important;
        }

        .contact-hero__actions :global(.btn-secondary) {
          background: rgba(255, 255, 255, 0.08) !important;
          border: 1.5px solid rgba(255, 255, 255, 0.3) !important;
          color: #FFFFFF !important;
        }

        .contact-hero__actions :global(.btn-secondary:hover) {
          background: #FFFFFF !important;
          border-color: #FFFFFF !important;
          color: var(--ink, #0F1923) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2) !important;
        }

        /* Right Column: Premium Masthead Card */
        .contact-hero__right {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .masthead-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1.5px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 2.5rem;
          width: 100%;
          max-width: 380px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .masthead-card:hover {
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-3px);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.25);
        }

        .masthead-seal {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 5.5rem;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.03);
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

        .masthead-badge {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          border-bottom: 1.5px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 0.75rem;
        }

        .masthead-badge:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .badge-kicker {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: var(--cardinal, #C1121F);
          text-transform: uppercase;
        }

        .badge-value {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 1.35rem;
          font-weight: 700;
          color: #FFFFFF;
        }

        /* Form section */
        .contact-form-section {
          background: #FAF8F5;
          padding: 6rem 0;
        }

        /* Locations section */
        .our-location-section {
          background: #FAF8F5;
          padding: 0 0 6rem 0;
        }

        .location-header {
          text-align: center;
          margin-bottom: 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .location-eyebrow {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: var(--cardinal, #C1121F);
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }

        .location-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 2rem;
          font-weight: 800;
          color: #0F1923;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .location-divider {
          width: 50px;
          height: 2px;
          background: var(--cardinal, #C1121F);
          margin-top: 1rem;
        }

        .location-grid {
          display: grid;
          gap: 1.5rem;
        }

        .location-grid--single {
          grid-template-columns: minmax(0, 1fr);
          align-items: stretch;
        }

        .location-map-item {
          width: 100%;
        }

        .location-map-wrapper {
          width: 100%;
          border: 1px solid rgba(15, 25, 35, 0.08);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(15, 25, 35, 0.04);
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
        @media (max-width: 1240px) {
          .contact-shell {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
        }

        @media (max-width: 1024px) {
          .contact-hero-grid {
            grid-template-columns: 1.2fr 1fr;
            gap: 3rem;
          }
        }

        @media (max-width: 991px) {
          .contact-form-section {
            padding: 4rem 0;
          }
          .our-location-section {
            padding-bottom: 4rem;
          }
          .contact-hero-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          .contact-hero__right {
            justify-content: center;
          }
          .masthead-card {
            max-width: 100%;
          }
        }

        @media (max-width: 768px) {
          .contact-hero {
            padding: 4.5rem 0;
          }
          .contact-hero__left {
            align-items: center;
            text-align: center;
          }
          .contact-hero__divider {
            margin-left: auto;
            margin-right: auto;
          }
          .contact-hero__actions {
            justify-content: center;
          }
          .location-map-wrapper :global(iframe) {
            height: 280px !important;
          }
        }

        @media (max-width: 480px) {
          .contact-shell {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .contact-hero {
            padding: 3.5rem 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
