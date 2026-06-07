import React, { useState, useEffect } from "react";

const DataErrorPlaceholder = ({ section = "Content", refetch, height = "280px" }) => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  return (
    <div className="offline-placeholder-card" style={{ minHeight: height }}>
      <div className="placeholder-inner">
        <div className="placeholder-icon-wrapper">
          {isOnline ? (
            // Server Error Icon (Exclamation mark inside circle)
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          ) : (
            // Offline Wifi-Off Icon
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.284 16.284A3 3 0 0012 21m0 0a3 3 0 003.716-4.716m-3.716 4.716V18m-3.716-1.716A8.969 8.969 0 0112 15c2.25 0 4.296.827 5.858 2.2m-11.716-5.4A14.933 14.933 0 0112 11c3.9 0 7.47 1.488 10.158 3.9M1.5 3.75l1.5-1.5 18 18-1.5 1.5-18-18z" />
            </svg>
          )}
        </div>
        <h5 className="placeholder-title">
          {isOnline ? "Feed Temporarily Offline" : "Network Disconnected"}
        </h5>
        <p className="placeholder-text">
          {isOnline
            ? `We had trouble fetching the latest ${section}. The server might be busy or undergoing maintenance.`
            : `You are currently offline. Please reconnect to the internet to load the latest ${section}.`}
        </p>
        {refetch && (
          <button onClick={() => refetch()} className="placeholder-retry-btn">
            Retry Connection
          </button>
        )}
      </div>
      <style jsx>{`
        .offline-placeholder-card {
          width: 100%;
          background: #FAF8F5;
          border: 1px dashed #E8E3DC;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 1.5rem;
          margin-bottom: 2rem;
          font-family: var(--font-sans), system-ui, sans-serif;
          box-sizing: border-box;
        }

        .placeholder-inner {
          text-align: center;
          max-width: 420px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .placeholder-icon-wrapper {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--cardinal, #7A0F23);
          background: rgba(122, 15, 35, 0.04);
          border-radius: 50%;
          padding: 10px;
          margin-bottom: 0.5rem;
        }

        .placeholder-icon-wrapper :global(svg) {
          width: 24px;
          height: 24px;
        }

        .placeholder-title {
          font-family: var(--font-serif), serif;
          font-size: 16px;
          font-weight: 700;
          color: var(--ink, #0f1923);
          margin: 0;
          letter-spacing: -0.01em;
        }

        .placeholder-text {
          font-family: var(--font-sans), sans-serif;
          font-size: 13px;
          line-height: 1.5;
          color: #5E6876;
          margin: 0 0 0.5rem 0;
        }

        .placeholder-retry-btn {
          background: var(--ink, #0f1923);
          color: #fff;
          border: none;
          border-radius: 0;
          padding: 0.6rem 1.4rem;
          font-size: 11px;
          font-weight: 700;
          font-family: var(--font-sans), sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .placeholder-retry-btn:hover {
          background: var(--cardinal, #7A0F23);
        }
      `}</style>
    </div>
  );
};

export default DataErrorPlaceholder;
