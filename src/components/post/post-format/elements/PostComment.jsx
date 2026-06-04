import FormGroup from "../../../contact/FormGroup";

const PostComment = () => {

  return (
    <div className="post-comment-area">
      <style jsx global>{`
        .post-comment-area .comment-box h2 {
          color: var(--ink) !important;
          font-size: clamp(var(--type-h3), 3vw, var(--type-h2));
          font-family: var(--primary-font);
          margin-bottom: 0.5rem;
        }

        .post-comment-area .comment-box p {
          color: var(--text-muted) !important;
          font-size: var(--type-body);
          font-family: var(--secondary-font);
          line-height: 2.4rem;
        }

        .comment-form input[type="text"],
        .comment-form input[type="email"],
        .comment-form textarea {
          color: var(--text-body) !important;
          background: var(--warm-white) !important;
          border-color: var(--slate-dark) !important;
          border-width: 1px !important;
          border-radius: 0 !important;
        }
        .comment-form input[type="text"]::placeholder,
        .comment-form input[type="email"]::placeholder,
        .comment-form textarea::placeholder {
          color: var(--text-light) !important;
          opacity: 1 !important;
        }
        .comment-form input[type="text"]:focus,
        .comment-form input[type="email"]:focus,
        .comment-form textarea:focus {
          color: var(--text-body) !important;
          background: var(--warm-white) !important;
          border-color: var(--ink) !important;
          box-shadow: none !important;
        }
        .comment-form .form-group label {
          color: var(--text-muted) !important;
          background: transparent !important;
        }
        .comment-form .form-group:not(.focused) label {
          opacity: 0 !important;
          pointer-events: none !important;
          z-index: -1 !important;
        }
        .comment-form .form-group.focused label {
          background: var(--warm-white) !important;
          color: var(--ink) !important;
          opacity: 1 !important;
          z-index: 10 !important;
        }
        .comment-form .form-group.focused input::placeholder,
        .comment-form .form-group.focused textarea::placeholder {
          opacity: 0 !important;
          color: transparent !important;
        }

        .post-comment-area .comment-form .btn.btn-primary {
          background: var(--cardinal) !important;
          border-color: var(--cardinal) !important;
          color: #fff !important;
          font-family: var(--secondary-font) !important;
          font-weight: 700 !important;
          font-size: 11px !important;
          letter-spacing: 0.15em !important;
          text-transform: uppercase !important;
          border-radius: 0 !important;
          min-width: 170px;
          transition: background-color 0.2s, border-color 0.2s !important;
        }

        .post-comment-area .comment-form .btn.btn-primary:hover {
          background: var(--cardinal-dark) !important;
          border-color: var(--cardinal-dark) !important;
          color: #fff !important;
        }
      `}</style>
      <div className="comment-box">
        <h2>Leave A Reply</h2>
        <p>
          Your email address will not be published.
          <span className="primary-color">*</span>
        </p>
      </div>
      {/* End of .comment-box */}
      <form action="#" className="comment-form row m-b-xs-60">
        <div className="col-12">
          <FormGroup pClass="comment-message-field" label="Comment" type="textarea" name="comment-message" rows={6} placeholder="Enter comment" />
        </div>
        <div className="col-md-4">
			<FormGroup type="text" name="name" label="Name" placeholder="Enter name" />
        </div>
        <div className="col-md-4">
			<FormGroup type="text" name="email" label="Email" placeholder="Enter email" />
        </div>
        <div className="col-md-4">
		<FormGroup type="text" name="website" label="Website" placeholder="Enter website" />
        </div>
        <div className="col-12">
          <button className="btn btn-primary">POST COMMENT</button>
        </div>
      </form>
    </div>
  );
};

export default PostComment;
