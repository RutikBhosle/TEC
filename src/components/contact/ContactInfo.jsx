import SocialLink from "../../data/social/SocialLink.json";

const ContactInfo = () => {
  return (
    <div className="liaison-directory">
      <div className="directory-header">
        <span className="directory-kicker">Bureau Directory</span>
        <h2 className="directory-title">The Editorial Desks</h2>
        <p className="directory-desc">
          Reach out directly to our specialized desks for editorial submissions, partnerships, or corporate communications.
        </p>
      </div>

      <div className="desks-list">
        {/* Desk 1 */}
        <div className="desk-item">
          <div className="desk-marker" />
          <div className="desk-details">
            <span className="desk-category">Press & Submissions</span>
            <h4 className="desk-name">Editorial Desk</h4>
            <p className="desk-desc">
              Pitch your stories, founder breakthroughs, or suggest editorial coverage to our chief editors.
            </p>
            <a href="mailto:editorial@starprime.com" className="desk-email">
              editorial@starprime.com
            </a>
          </div>
        </div>

        {/* Desk 2 */}
        <div className="desk-item">
          <div className="desk-marker" />
          <div className="desk-details">
            <span className="desk-category">Advertising & Campaigns</span>
            <h4 className="desk-name">Partnerships & Brand Desk</h4>
            <p className="desk-desc">
              Inquire about campaign rates, collaborative events, and bespoke brand partnerships.
            </p>
            <a href="mailto:partnerships@starprime.com" className="desk-email">
              partnerships@starprime.com
            </a>
          </div>
        </div>

        {/* Desk 3 */}
        <div className="desk-item">
          <div className="desk-marker" />
          <div className="desk-details">
            <span className="desk-category">Corporate Office</span>
            <h4 className="desk-name">Headquarters</h4>
            <p className="desk-desc">
              Gera Imperium Rise, Wipro Circle, Hinjewadi Phase 2, Pune
            </p>
          </div>
        </div>
      </div>

      {/* Hotline Panel */}
      <div className="hotline-panel">
        <span className="hotline-kicker">Liaison Hotline</span>
        <a href="tel:+16146022959" className="hotline-number">
          +1 (614) 602-2959
        </a>
        <p className="hotline-note">Available 24/7 for urgent press & media inquiries.</p>
      </div>



      <style jsx>{`
        .liaison-directory {
          display: flex;
          flex-direction: column;
          gap: 2.75rem;
          width: 100%;
          padding: 0.5rem 0;
          color: #0f1923;
        }

        .directory-kicker {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--cardinal, #7A0F23);
          display: block;
          margin-bottom: 0.5rem;
        }

        .directory-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 2.35rem;
          font-weight: 800;
          line-height: 1.2;
          color: #0f1923;
          margin: 0 0 1rem;
          letter-spacing: -0.01em;
        }

        .directory-desc {
          font-family: var(--font-serif-body, 'Libre Baskerville', serif);
          font-size: 1.05rem;
          line-height: 1.65;
          color: #555555;
          margin: 0;
        }

        .desks-list {
          display: flex;
          flex-direction: column;
          gap: 2.25rem;
        }

        .desk-item {
          display: flex;
          gap: 1.5rem;
          position: relative;
        }

        .desk-marker {
          width: 2px;
          background: #2E4057;
          opacity: 0.2;
          align-self: stretch;
          transition: all 0.3s ease;
          position: relative;
        }

        .desk-item:hover .desk-marker {
          background: var(--cardinal, #7A0F23);
          opacity: 1;
        }

        .desk-marker::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          background: #2E4057;
          border-radius: 999px;
          opacity: 0.6;
          transition: all 0.3s ease;
        }

        .desk-item:hover .desk-marker::before {
          background: var(--cardinal, #7A0F23);
          opacity: 1;
        }

        .desk-details {
          flex: 1;
        }

        .desk-category {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--cardinal, #7A0F23);
          display: block;
          margin-bottom: 0.35rem;
        }

        .desk-name {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 1.45rem;
          font-weight: 700;
          line-height: 1.3;
          margin: 0 0 0.5rem;
          color: #0f1923;
        }

        .desk-desc {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 1.05rem;
          line-height: 1.6;
          color: #555555;
          margin: 0 0 0.65rem;
        }

        .desk-email {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f1923;
          text-decoration: none;
          transition: all 0.3s ease;
          border-bottom: 1.5px dashed rgba(15, 25, 35, 0.15);
          width: fit-content;
          display: block;
        }

        .desk-email:hover {
          color: var(--cardinal, #7A0F23);
          border-bottom-color: var(--cardinal, #7A0F23);
        }

        /* Hotline Panel */
        .hotline-panel {
          background: #0f1923;
          color: #FFFFFF;
          border-radius: 12px;
          padding: 1.75rem;
          box-shadow: 0 8px 30px rgba(15, 25, 35, 0.08);
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .hotline-panel:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(15, 25, 35, 0.15);
        }

        .hotline-kicker {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: var(--cardinal, #7A0F23);
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.5rem;
        }

        .hotline-number {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 2.2rem;
          font-weight: 900;
          color: #FFFFFF;
          text-decoration: none;
          display: block;
          margin-bottom: 0.5rem;
          transition: color 0.3s ease;
        }

        .hotline-number:hover {
          color: #D0C9BF;
        }

        .hotline-note {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 0.95rem;
          color: #9A9490;
          margin: 0;
        }



        /* Responsive spacing */
        @media (max-width: 768px) {
          .directory-title {
            font-size: 1.95rem;
          }
          .hotline-number {
            font-size: 1.85rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactInfo;
