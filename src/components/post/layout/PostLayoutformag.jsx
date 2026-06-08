import Image from "next/image";
import Link from "next/link";

const PostLayoutformag = ({ data }) => {
  const publishDate = data.publishedAt || data._createdAt
    ? new Date(data.publishedAt || data._createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
    : null;

  return (
    <div className="post-container">
      <Link href={`/magazine/${data.slug.current}`}>
        <div className="image-container">
          <Image
            src={data.featureImg || "/images/placeholder.png"}
            alt={data?.altText || data.title}
            width={750}
            height={900}
            className="img-fluid"
          />
        </div>
      </Link>
      <div className="title-container">
        {publishDate && <span className="issue-date">{publishDate}</span>}
        <h4 className="magazine-title">
          <Link href={`/magazine/${data.slug.current}`}>
            {data.title}
          </Link>
        </h4>
        <div className="accent-line" />
      </div>

      <style jsx>{`
        .post-container {
          width: 100%;
          max-width: 340px;
          margin: 30px auto 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .image-container {
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          background: #FAF8F5;
          border: 1px solid rgba(15, 25, 35, 0.08);
          box-shadow: 0 4px 20px rgba(15, 25, 35, 0.06);
          cursor: pointer;
        }

        .image-container:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(15, 25, 35, 0.15);
        }

        .title-container {
          width: 100%;
          text-align: center;
          margin-top: 1.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .issue-date {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--cardinal, #7A0F23);
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .magazine-title {
          font-size: 1.25rem;
          font-family: var(--font-serif, 'Playfair Display', serif);
          line-height: 1.4;
          font-weight: 700;
          color: var(--ink, #0f1923);
          margin: 0 0 0.75rem;
          transition: color 0.3s ease;
        }

        .magazine-title :global(a) {
          color: var(--ink, #0f1923);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .magazine-title :global(a:hover) {
          color: var(--cardinal, #7A0F23);
        }

        .accent-line {
          width: 40px;
          height: 2px;
          background-color: var(--ink, #0f1923);
          margin-top: 0.25rem;
          transition: width 0.3s ease;
        }

        .post-container:hover .accent-line {
          width: 80px;
        }

        /* Layout styling for 4 per row */
        :global(.magazine-grid) {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          justify-items: center;
          width: 100%;
        }

        @media (max-width: 991px) {
          :global(.magazine-grid) {
            grid-template-columns: repeat(2, 1fr);
          }
          .post-container {
            max-width: 280px;
          }
        }

        @media (max-width: 575px) {
          :global(.magazine-grid) {
            grid-template-columns: repeat(1, 1fr);
          }
          .post-container {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default PostLayoutformag;
