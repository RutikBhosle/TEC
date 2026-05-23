import { useEffect, useState, useRef } from "react";

const AnniversaryPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    // Check if the popup has been shown in the current browser session
    const isShown = sessionStorage.getItem("tec_anniversary_popup_shown");
    if (!isShown) {
      setIsOpen(true);
      isAnimatingRef.current = true;
      
      // Wait for a short delay to fire confetti after the popup begins showing
      const timerConfetti = setTimeout(() => {
        triggerConfetti();
      }, 500);

      // Automatically close the popup after 15 seconds (animation duration)
      const timerClose = setTimeout(() => {
        handleClose();
      }, 15000);

      sessionStorage.setItem("tec_anniversary_popup_shown", "true");
      
      return () => {
        clearTimeout(timerConfetti);
        clearTimeout(timerClose);
      };
    }
  }, []);

  const triggerConfetti = async () => {
    try {
      const confetti = (await import("canvas-confetti")).default;
      var end = Date.now() + (15 * 1000);

      // go Buckeyes!
      var colors = ['#bb0000', '#ffffff'];

      (function frame() {
        // Stop animation instantly if modal is closed
        if (!isAnimatingRef.current) return;

        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
          zIndex: 100000 // Ensure confetti is on top of the backdrop and modal
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
          zIndex: 100000 // Ensure confetti is on top of the backdrop and modal
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    } catch (err) {
      console.error("Failed to load canvas-confetti:", err);
    }
  };

  const handleClose = () => {
    isAnimatingRef.current = false;
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClose}
      className="anniversary-backdrop"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(246, 243, 236, 0.7)", // Premium warm off-white backdrop
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 99999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        animation: "fadeIn 0.3s ease-out forwards",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="anniversary-modal"
        style={{
          position: "relative",
          display: "inline-block", // Shrinks modal container to match the exact rendered image size
          maxWidth: "90%",
          maxHeight: "80vh",
          backgroundColor: "transparent",
          boxShadow: "none",
          animation: "scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        {/* Content Image */}
        <img
          src="/assest/tec annivarsary post.png"
          alt="TEC Anniversary Post"
          style={{
            display: "block",
            maxWidth: "100%",
            maxHeight: "80vh",
            width: "auto",
            height: "auto",
          }}
        />

        {/* Floating Close Button directly on the image top-right edge */}
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "rgba(0, 0, 0, 0.6)",
            border: "1.5px solid rgba(255, 255, 255, 0.8)",
            borderRadius: "50%",
            width: "24px",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            cursor: "pointer",
            transition: "all 0.2s ease-in-out",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            zIndex: 100, // Ensure it is on top of the image
            padding: 0,
          }}
          className="anniversary-close-btn"
          aria-label="Close"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Embedded styles for keyframe animations and hover effects */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .anniversary-close-btn:hover {
          background: rgba(0, 0, 0, 0.8) !important;
          transform: scale(1.1);
        }
        .anniversary-close-btn:active {
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
};

export default AnniversaryPopup;
