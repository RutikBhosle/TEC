import { useState } from "react";

const WidgetNewsletter = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!emailAddress) {
      setSubmitMessage("Please enter a valid email.");
      setTimeout(() => setSubmitMessage(""), 5000);
      return;
    }

    try {
      setLoading(true);
      setSubmitMessage("");

      const response = await fetch(
        "http://localhost:5000/api/newsletter/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email: emailAddress })
        }
      );

      const data = await response.json();

      setSubmitMessage(data.message || "Subscribed");
      setEmailAddress("");

      setTimeout(() => setSubmitMessage(""), 5000);
    } catch (error) {
      setSubmitMessage("Something went wrong. Try again.");
      setTimeout(() => setSubmitMessage(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newsletter-widget-card">
      <div className="newsletter-label">Newsletter</div>
      <h3 className="newsletter-title">Stay ahead of the story.</h3>
      <p className="newsletter-text">
        The EC Chronicles digest — curated business intelligence, fresh profiles, and market insight, weekly.
      </p>

      <form onSubmit={handleSubmit} className="newsletter-form-wrapper">
        <div className="newsletter-input-wrap">
          <input
            type="email"
            placeholder="Your email address"
            required
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className="newsletter-input"
          />
          <button type="submit" disabled={loading} className="newsletter-btn">
            {loading ? "..." : "Join"}
          </button>
        </div>
        {submitMessage && (
          <div
            role="status"
            aria-live="polite"
            style={{
              marginTop: "0.75rem",
              color:
                submitMessage.toLowerCase().includes("success") ||
                submitMessage.toLowerCase().includes("subscribed")
                  ? "#2e7d32"
                  : "#b42318",
              fontWeight: 600,
              fontSize: "12px",
              fontFamily: "var(--secondary-font)"
            }}
          >
            {submitMessage}
          </div>
        )}
      </form>
      <style jsx>{`
        .newsletter-widget-card {
          font-family: var(--secondary-font);
        }
        .newsletter-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--cardinal);
          margin-bottom: 10px;
        }
        .newsletter-title {
          font-family: var(--primary-font);
          font-size: 18px;
          font-weight: 700;
          color: var(--ink);
          line-height: 1.3;
          margin-bottom: 8px;
        }
        .newsletter-text {
          font-size: 12.5px;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 18px;
        }
        .newsletter-input-wrap {
          display: flex;
        }
        .newsletter-input {
          flex: 1;
          border: 1px solid var(--slate-dark);
          border-right: none;
          padding: 10px 14px;
          font-size: 13px;
          font-family: var(--secondary-font);
          background: var(--warm-white);
          color: var(--text-body);
          outline: none;
          height: 42px;
        }
        .newsletter-input::placeholder {
          color: var(--text-light);
        }
        .newsletter-btn {
          background: var(--cardinal);
          color: #fff;
          border: none;
          padding: 10px 18px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s;
          height: 42px;
          line-height: 1;
        }
        .newsletter-btn:hover {
          background: var(--cardinal-dark);
        }
      `}</style>
    </div>
  );
};

export default WidgetNewsletter;
