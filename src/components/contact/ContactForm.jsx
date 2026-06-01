import emailjs from "@emailjs/browser";
import Alert from "react-bootstrap/Alert";
import { useEffect, useRef, useState } from "react";

const Result = () => {
  return (
    <div className="success-msg-container">
      <Alert variant="success" className="success-msg">
        Your message has been successfully sent.
      </Alert>
      <style jsx global>{`
        .success-msg {
          font-family: var(--font-sans, 'DM Sans', sans-serif) !important;
          font-size: 1.05rem !important;
          border-radius: 8px !important;
          margin: 0 !important;
        }
      `}</style>
    </div>
  );
};

const ContactForm = () => {
  const form = useRef();
  const [result, showResult] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_8tg2gsa",
        "template_zmxkd45",
        form.current,
        "QYncFYwURx7oPBVab"
      )
      .then(
        () => showResult(true),
        () => showResult(false)
      );

    form.current.reset();
  };

  useEffect(() => {
    if (!result) return;
    const timer = setTimeout(() => showResult(false), 3000);
    return () => clearTimeout(timer);
  }, [result]);

  return (
    <div className="correspondence-card animate-fade">
      <div className="correspondence-header">
        <span className="correspondence-kicker">Digital Letter Desk</span>
        <h2 className="correspondence-title">Reader Correspondence</h2>
        <p className="correspondence-subtitle">
          Send a direct message to our offices. Your details will be routed to the appropriate desk.
        </p>
      </div>

      <form className="correspondence-form" ref={form} onSubmit={sendEmail}>
        <div className="letter-input-group">
          <span className="letter-label">Your Full Name</span>
          <input 
            type="text" 
            name="contact-name" 
            placeholder="E.g. Alexander Hamilton" 
            required 
            autoComplete="name"
          />
          <div className="input-focus-line" />
        </div>

        <div className="letter-input-group">
          <span className="letter-label">Your Phone Number</span>
          <input 
            type="tel" 
            name="contact-phone" 
            placeholder="E.g. +1 (614) 602-2959" 
            required 
            autoComplete="tel"
          />
          <div className="input-focus-line" />
        </div>

        <div className="letter-input-group">
          <span className="letter-label">Your Email Address</span>
          <input 
            type="email" 
            name="contact-email" 
            placeholder="E.g. alexander@example.com" 
            required 
            autoComplete="email"
          />
          <div className="input-focus-line" />
        </div>

        <div className="letter-input-group message-group">
          <span className="letter-label">Your Message</span>
          <textarea 
            name="contact-message" 
            rows={5} 
            placeholder="Type your correspondence here..." 
            required 
          />
          <div className="notebook-lines">
            <div className="notebook-line" />
            <div className="notebook-line" />
            <div className="notebook-line" />
            <div className="notebook-line" />
            <div className="notebook-line" />
          </div>
          <div className="input-focus-line" />
        </div>

        <button className="btn btn-submit-correspondence" type="submit">
          Send Correspondence
        </button>

        {result && <Result />}
      </form>

      <style jsx>{`
        .correspondence-card {
          background: #FFFFFF;
          border: 1px solid rgba(15, 25, 35, 0.06);
          border-radius: 16px;
          padding: 3.5rem;
          box-shadow: 0 12px 40px rgba(15, 25, 35, 0.04);
          width: 100%;
          position: relative;
          color: #0F1923;
        }

        .correspondence-header {
          margin-bottom: 2.5rem;
        }

        .correspondence-kicker {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: var(--cardinal, #C1121F);
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.5rem;
        }

        .correspondence-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: clamp(1.85rem, 4vw, 2.35rem);
          font-weight: 800;
          line-height: 1.3;
          margin: 0 0 0.75rem 0;
          color: #0F1923;
          letter-spacing: -0.01em;
        }

        .correspondence-subtitle {
          font-family: var(--font-serif-body, 'Libre Baskerville', serif);
          font-size: 1.05rem;
          color: #555555;
          line-height: 1.65;
          margin: 0;
        }

        .correspondence-form {
          display: flex;
          flex-direction: column;
          gap: 2.25rem;
        }

        .letter-input-group {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .letter-label {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #718096;
          transition: color 0.3s ease;
        }

        .letter-input-group input {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          background: transparent !important;
          border: none !important;
          border-bottom: 1.5px solid rgba(15, 25, 35, 0.08) !important;
          padding: 10px 0 !important;
          font-size: 1.15rem;
          color: #0F1923 !important;
          outline: none !important;
          transition: all 0.3s ease !important;
          border-radius: 0 !important;
        }

        .letter-input-group input::placeholder {
          color: rgba(160, 174, 192, 0.6);
        }

        .input-focus-line {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1.5px;
          background: var(--cardinal, #C1121F);
          transform: scaleX(0);
          transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
          transform-origin: left;
        }

        .letter-input-group input:focus ~ .input-focus-line,
        .letter-input-group textarea:focus ~ .input-focus-line {
          transform: scaleX(1);
        }

        .letter-input-group input:focus ~ .letter-label,
        .letter-input-group textarea:focus ~ .letter-label {
          color: var(--cardinal, #C1121F);
        }

        /* Message area designed like a notebook page */
        .message-group {
          position: relative;
        }

        .letter-input-group textarea {
          font-family: var(--font-serif-body, 'Libre Baskerville', serif) !important;
          background: transparent !important;
          border: none !important;
          border-bottom: 1.5px solid rgba(15, 25, 35, 0.08) !important;
          padding: 8px 0 !important;
          font-size: 1.15rem;
          line-height: 2.2 !important;
          color: #0F1923 !important;
          outline: none !important;
          resize: none;
          z-index: 2;
          position: relative;
          border-radius: 0 !important;
        }

        .letter-input-group textarea::placeholder {
          color: rgba(160, 174, 192, 0.6);
        }

        /* Notebook line backgrounds under textarea text */
        .notebook-lines {
          position: absolute;
          top: 28px;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          pointer-events: none;
          z-index: 1;
        }

        .notebook-line {
          height: calc(1.15rem * 2.2);
          border-bottom: 1px dashed rgba(15, 25, 35, 0.06);
        }

        /* Submit Button */
        .btn-submit-correspondence {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          background: var(--cardinal, #C1121F) !important;
          color: #FFFFFF !important;
          font-size: 1rem !important;
          font-weight: 700 !important;
          letter-spacing: 0.12em !important;
          text-transform: uppercase !important;
          border: none !important;
          border-radius: 999px !important;
          padding: 16px 40px !important;
          transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) !important;
          cursor: pointer !important;
          box-shadow: 0 4px 15px rgba(193, 18, 31, 0.2) !important;
          width: fit-content;
          align-self: flex-start;
          margin-top: 1rem;
        }

        .btn-submit-correspondence:hover {
          background: #0F1923 !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(15, 25, 35, 0.15) !important;
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade {
          animation: fadeInUp 0.7s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        }

        /* Responsiveness */
        @media (max-width: 768px) {
          .correspondence-card {
            padding: 2.5rem;
          }
          .correspondence-title {
            font-size: 1.75rem;
          }
        }

        @media (max-width: 480px) {
          .correspondence-card {
            padding: 1.75rem;
          }
          .correspondence-title {
            font-size: 1.45rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactForm;
