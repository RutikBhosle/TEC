import React from "react";

const tickerItems = [
  { headline: "Bitcoin Breaks Record", detail: "Surges Past $98,000 Amid Trump's Pro-Crypto Stance" },
  { headline: "Microsoft CEO", detail: "Receives 63% Pay Increase Despite Reporting a Business Loss" },
  { headline: "TikTok Founder", detail: "Zhang Yiming Rises to Become China's Richest Person" },
  { headline: "GE Aerospace", detail: "Announces $1 Billion Investment to Expand U.S. Manufacturing" },
  { headline: "JD.com Launches", detail: "JoyBuy in Europe to Compete Against Amazon" },
  { headline: "Nokia Expands", detail: "Network Partnerships with TDM Brazil and Deutsche Telekom" },
  { headline: "Bitcoin Breaks Record", detail: "Surges Past $98,000 Amid Trump's Pro-Crypto Stance" },
  { headline: "Microsoft CEO", detail: "Receives 63% Pay Increase Despite Reporting a Business Loss" },
  { headline: "TikTok Founder", detail: "Zhang Yiming Rises to Become China's Richest Person" },
  { headline: "GE Aerospace", detail: "Announces $1 Billion Investment to Expand U.S. Manufacturing" },
  { headline: "JD.com Launches", detail: "JoyBuy in Europe to Compete Against Amazon" },
  { headline: "Nokia Expands", detail: "Network Partnerships with TDM Brazil and Deutsche Telekom" },
];

const BreakingTicker = () => {
  return (
    <>
      <div className="ec-ticker">
        <div className="ec-ticker-container">
          <div className="ec-ticker-inner">
            <div className="ec-ticker-tag">LATEST</div>
            <div className="ec-ticker-track-wrapper">
              <div className="ec-ticker-scroll">
                {tickerItems.map((item, i) => (
                  <span key={i} className="ec-ticker-item">
                    <strong>{item.headline}</strong>
                    <span className="ec-ticker-detail"> — {item.detail}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ec-ticker {
          background: #E8E3DC;
          border-top: 1px solid #D0C9BF;
          border-bottom: 1px solid #D0C9BF;
          overflow: hidden;
          height: 48px;
          display: flex;
          align-items: center;
        }

        .ec-ticker-container {
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .ec-ticker-inner {
          display: flex;
          align-items: center;
          width: 100%;
        }

        .ec-ticker-tag {
          background: #C1121F;
          color: #fff;
          font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          padding: 4px 16px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          white-space: nowrap;
          margin-right: 24px;
          border-radius: 2px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        }

        .ec-ticker-track-wrapper {
          flex: 1;
          overflow: hidden;
        }

        .ec-ticker-scroll {
          display: flex;
          align-items: center;
          animation: tickerScroll 40s linear infinite;
          white-space: nowrap;
          gap: 72px;
        }

        .ec-ticker-scroll:hover {
          animation-play-state: paused;
        }

        .ec-ticker-item {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 12px;
          font-weight: 700;
          color: #0F1923;
          letter-spacing: 0.02em;
          flex-shrink: 0;
        }

        .ec-ticker-detail {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          color: #5A544F;
          opacity: 0.9;
          margin-left: 6px;
        }

        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .ec-ticker-container {
            padding: 0 18px;
          }
          .ec-ticker-tag {
            padding: 4px 12px;
            margin-right: 16px;
          }
          .ec-ticker-item {
            font-size: 11px;
          }
        }
      `}</style>
    </>
  );
};

export default BreakingTicker;
