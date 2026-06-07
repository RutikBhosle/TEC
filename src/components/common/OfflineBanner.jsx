import React, { useState, useEffect } from "react";

const OfflineBanner = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);
      setShouldShow(!navigator.onLine);

      const handleOnline = () => {
        setIsOnline(true);
        // Keep showing the banner in success state for 3 seconds before hiding
        const timer = setTimeout(() => {
          setShouldShow(false);
        }, 3000);
        return () => clearTimeout(timer);
      };

      const handleOffline = () => {
        setIsOnline(false);
        setShouldShow(true);
      };

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  if (!shouldShow) return null;

  return (
    <div className={`offline-status-banner ${isOnline ? "status-online" : "status-offline"}`}>
      <div className="banner-content">
        <span className="banner-icon-dot"></span>
        <span className="banner-message">
          {isOnline
            ? "Connection restored. Updates are live."
            : "No Internet Connection. Running in offline mode."}
        </span>
      </div>
      <style jsx>{`
        .offline-status-banner {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          font-family: var(--font-sans), system-ui, sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          color: #fff;
          border-radius: 0;
          box-shadow: 0 10px 30px rgba(15, 25, 35, 0.25);
          letter-spacing: 0.02em;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .status-offline {
          background: #7A0F23;
          border: 1px solid #9C142E;
        }

        .status-online {
          background: #1b5e20;
          border: 1px solid #2e7d32;
        }

        .banner-content {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .banner-icon-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #fff;
          display: inline-block;
          animation: pulse 1.5s infinite;
        }

        .status-online .banner-icon-dot {
          animation: none;
        }

        @keyframes pulse {
          0% {
            transform: scale(0.9);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.15);
            opacity: 1;
          }
          100% {
            transform: scale(0.9);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
};

export default OfflineBanner;
