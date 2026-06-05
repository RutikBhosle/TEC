import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";

const IndustryCategories = () => {
  const query = `*[_type == "industryCategory"]{
    title,
    slug,
    altText,
    description,
    "imageUrl": image.asset->url
  } | order(title asc)`;

  const { data, isLoading, error } = useQuery({
    queryKey: ["industry-categories"],
    queryFn: async () => {
      const response = await client.fetch(query);
      return response;
    },
  });

  if (isLoading) return <Loader />;
  if (error) return <div className="industry-state">Error fetching industry verticals. Please try again.</div>;
  if (!data) return null;

  return (
    <div className="industries-page-wrap">
      <div className="industries-page-shell">

        {/* Editorial Hero Header */}
        <header className="editorial-hero">
          <span className="hero-eyebrow">Industry Focus</span>
          <h1 className="hero-title">Pioneering Sector Focus</h1>
          <p className="hero-desc">
            Delve into specialised sector research, visionary enterprise profiles, and market intelligence spanning core global industries.
          </p>
          <div className="hero-divider" />
        </header>

        <div className="row justify-content-center">
          {data.map((item) => (
            <div className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex align-items-stretch" key={item.slug?.current || item.title}>
              <Link
                href={`/industries/${item.slug?.current}`}
                className="industry-card-link w-100"
              >
                <div className="industry-card">
                  <div className="industry-card-image-wrap">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.altText || item.title}
                        fill
                        sizes="(max-width: 575px) 100vw, (max-width: 991px) 50vw, 25vw"
                        style={{ objectFit: "cover" }}
                        className="industry-img"
                      />
                    ) : (
                      <div className="industry-img-placeholder" />
                    )}
                  </div>
                  <div className="industry-card-body">
                    <h3 className="industry-card-title">{item.title}</h3>
                    <div className="accent-line" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .industries-page-wrap {
          background: #FAF8F5;
          color: #0f1923;
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          padding-bottom: 5rem;
        }

        .industries-page-shell {
          max-width: 1240px !important;
          width: 100% !important;
          margin: 0 auto !important;
          padding-left: 32px !important;
          padding-right: 32px !important;
        }

        /* Editorial Hero Header */
        .editorial-hero {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          padding: 5rem 1.5rem 3.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-eyebrow {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: var(--cardinal, #7A0F23);
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }

        .hero-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: clamp(2.5rem, 5vw, 3.75rem);
          font-weight: 800;
          line-height: 1.15;
          color: #0f1923;
          margin: 0 0 1.25rem;
          letter-spacing: -0.02em;
        }

        .hero-desc {
          font-family: var(--font-serif-body, 'Libre Baskerville', serif);
          font-size: clamp(1rem, 2vw, 1.2rem);
          line-height: 1.7;
          color: #4a5568;
          max-width: 720px;
          margin: 0 auto;
        }

        .hero-divider {
          width: 80px;
          height: 3px;
          background: var(--cardinal, #7A0F23);
          margin-top: 1.5rem;
          border-radius: 999px;
        }

        .industry-card-link {
          text-decoration: none;
          display: block;
          margin-bottom: 2rem;
        }

        .industry-card {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(15, 25, 35, 0.06);
          background: #FFFFFF;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          box-shadow: 0 4px 20px rgba(15, 25, 35, 0.03);
          height: 100%;
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .industry-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 35px rgba(15, 25, 35, 0.1);
          border-color: rgba(15, 25, 35, 0.12);
        }

        .industry-card-image-wrap {
          position: relative;
          width: 100%;
          height: 160px;
          overflow: hidden;
          background: #FAF8F5;
        }

        .industry-card-image-wrap :global(.industry-img) {
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) !important;
        }

        .industry-card:hover .industry-card-image-wrap :global(.industry-img) {
          transform: scale(1.04);
        }

        .industry-img-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #FAF8F5 0%, #E9E6E2 100%);
        }

        .industry-card-body {
          padding: 1.75rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          flex: 1;
        }

        .industry-card-title {
          color: #0f1923;
          font-weight: 700;
          font-size: 1.2rem;
          line-height: 1.35;
          font-family: var(--font-serif, 'Playfair Display', serif);
          margin: 0 0 1rem 0;
          transition: color 0.3s ease;
        }

        .industry-card:hover .industry-card-title {
          color: var(--cardinal, #7A0F23);
        }

        .accent-line {
          width: 30px;
          height: 2px;
          background-color: #0f1923;
          margin-top: auto;
          transition: all 0.3s ease;
        }

        .industry-card:hover .accent-line {
          width: 60px;
          background-color: var(--cardinal, #7A0F23);
        }

        .industry-state {
          background: #FAF8F5;
          color: #8f2d2d;
          padding: 3rem 1rem;
          font-size: 0.95rem;
          text-align: center;
          font-family: var(--font-serif-body, 'Libre Baskerville', serif);
        }

        /* Responsive spacing */
        @media (max-width: 1024px) {
          .industries-page-shell {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
        }

        @media (max-width: 768px) {
          .editorial-hero {
            padding: 4rem 1.5rem 2.5rem;
          }
          .industries-page-shell {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          .industry-card-image-wrap {
            height: 140px;
          }
          .industry-card-body {
            padding: 1.25rem;
          }
          .industry-card-title {
            font-size: 1.05rem;
          }
        }

        @media (max-width: 480px) {
          .industries-page-shell {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .editorial-hero {
            padding: 3rem 1rem 2rem;
          }
          .hero-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default IndustryCategories;
