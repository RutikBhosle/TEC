const ContactInfo = () => {
  const desks = [
    {
      name: "Admin",
      email: "admin@thestarprime.com",
      desc: "Billing, corporate operations, and business inquiries."
    },
    {
      name: "Contact",
      email: "contact@thestarprime.com",
      desc: "General support, reader feedback, and general questions."
    },
    {
      name: "HR",
      email: "hr@thestarprime.com",
      desc: "Career opportunities, recruitment, and freelance applications."
    },
    {
      name: "Editorial",
      email: "editorial@thestarprime.com",
      desc: "Story pitches, press releases, and editorial submissions."
    },
    {
      name: "Support",
      email: "support@thestarprime.com",
      desc: "Digital subscriptions, account assistance, and technical help."
    },
    {
      name: "Partnership",
      email: "partnership@thestarprime.com",
      desc: "Sponsorships, custom media campaigns, and brand partnerships."
    }
  ];

  return (
    <div className="liaison-directory">
      <div className="directory-header">
        <span className="directory-kicker">Bureau Directory</span>
        <h2 className="directory-title">Direct Liaison Desks</h2>
        <p className="directory-desc">
          Reach out directly to our departments for swift responses. Select the appropriate desk below.
        </p>
      </div>

      <div className="desks-list">
        {desks.map((desk, i) => (
          <div key={i} className="desk-item">
            <div className="desk-marker" />
            <div className="desk-details">
              <span className="desk-category">Department</span>
              <h4 className="desk-name">{desk.name}</h4>
              <p className="desk-desc">{desk.desc}</p>
              <a href={`mailto:${desk.email}`} className="desk-email">
                {desk.email}
              </a>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .liaison-directory {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          width: 100%;
          height: 100%;
          padding: 0.5rem 0 0 0;
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
          gap: 1.5rem;
        }

        .desk-item {
          display: flex;
          gap: 1.25rem;
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
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--cardinal, #7A0F23);
          display: block;
          margin-bottom: 0.25rem;
        }

        .desk-name {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.3;
          margin: 0 0 0.25rem;
          color: #0f1923;
        }

        .desk-desc {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 0.95rem;
          line-height: 1.5;
          color: #555555;
          margin: 0 0 0.5rem;
        }

        .desk-email {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 0.95rem;
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

        @media (max-width: 768px) {
          .directory-title {
            font-size: 1.95rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactInfo;
