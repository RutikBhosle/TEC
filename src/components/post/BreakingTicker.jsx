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
        <div className="ec-ticker-tag">Breaking</div>
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

      <style jsx>{`
        .ec-ticker {
          background: #C1121F;
          overflow: hidden;
          display: flex;
          align-items: center;
          height: 44px;
        }

        .ec-ticker-tag {
          background: #0F1923;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0 24px;
          height: 100%;
          display: flex;
          align-items: center;
          flex-shrink: 0;
          white-space: nowrap;
          border-right: 2px solid rgba(193, 18, 31, 0.6);
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
          padding-left: 32px;
        }

        .ec-ticker-scroll:hover {
          animation-play-state: paused;
        }

        .ec-ticker-item {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #fff;
          letter-spacing: 0.04em;
          flex-shrink: 0;
        }

        .ec-ticker-detail {
          font-weight: 300;
          opacity: 0.88;
        }

        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </>
  );
};

export default BreakingTicker;
