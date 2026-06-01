import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import HeaderOne from "../../components/header/HeaderOne";
import FooterTwo from "../../components/footer/FooterTwo";
import Loader from "../../components/common/Loader";
import HeadMeta from "../../components/elements/HeadMeta";
import { client } from "../../client";
import WidgetNewsletter from "../../components/widget/WidgetNewsletter";
import WidgetSocialShare from "../../components/widget/WidgetSocialShare";
import Image from "next/image";

const fetchIndustryPostsByIndustry = async (industrySlug) => {
  const query = `
    *[_type == "industryPost" && industryCategory->slug.current == $industrySlug]
    {
      title,
      slug,
      altText,
      publishedAt,
      _updatedAt,
      'featureImg': mainImage.asset->url,
      description,
      'category': {
        'title': industryCategory->title,
        'slug': industryCategory->slug.current
      }
    } | order(coalesce(publishedAt, _updatedAt) desc, _updatedAt desc)
  `;

  return client.fetch(query, { industrySlug });
};

const IndustryPosts = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data, isLoading, error } = useQuery({
    queryKey: ["industryPosts", slug],
    queryFn: () => fetchIndustryPostsByIndustry(slug),
    enabled: !!slug,
  });

  const [isVisible, setIsVisible] = useState(false);
  const posts = Array.isArray(data) ? data : [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [slug]);

  const handlePostClick = (postSlug) => {
    router.push(`/industry-post/${postSlug}`);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  const categoryTitle = posts[0]?.category?.title || "Industry Vertical";

  return (
    <>
      <HeadMeta 
        metaTitle={`${categoryTitle} - Business Industry News, Profiles & Analysis | Star Prime`}
        metaDesc={`Read the latest featured articles, founder interviews, and in-depth business case studies on our ${categoryTitle} feed.`}
      />
      <HeaderOne />

      {/* ULTRA-PREMIUM EDITORIAL HERO COVER (DARK INK BLUE BLOCK) */}
      <section className="industry-hero-cover animate-fade">
        <div className="hero-cover-container">
          <div className="hero-cover-header">
            <span className="hero-eyebrow">{categoryTitle} Focus</span>
            <h1 className="hero-cover-title">{categoryTitle} Sector Focus</h1>
            <p className="hero-cover-desc">
              Explore outstanding leadership strategies, pioneering founder profiles, and in-depth business case studies in the {categoryTitle} field.
            </p>
            <div className="hero-cover-divider" />
          </div>

          {isLoading ? (
            <div className="loader-container-dark">
              <Loader />
            </div>
          ) : error ? (
            <div className="error-alert-dark">Error fetching industry articles</div>
          ) : posts.length === 0 ? (
            <p className="no-posts-dark">No publications found in this category. Please check back later.</p>
          ) : (
            <div className="hero-cover-grid">
              {/* PRIMARY HIGHLIGHT (LEFT COLUMN - 2/3) */}
              {posts[0] && (
                <div 
                  className="primary-hero-card"
                  onClick={() => handlePostClick(posts[0].slug.current)}
                >
                  <div className="primary-hero-image-wrapper">
                    <Image
                      src={posts[0].featureImg}
                      alt={posts[0].altText || posts[0].title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 760px"
                    />
                    <div className="primary-hero-overlay" />
                  </div>
                  <div className="primary-hero-content">
                    <span className="primary-hero-category">{categoryTitle} Highlight</span>
                    <h2 className="primary-hero-title">{posts[0].title}</h2>
                    {posts[0].description && (
                      <p className="primary-hero-excerpt">{posts[0].description}</p>
                    )}
                    <div className="primary-hero-meta">
                      <span className="meta-author">By Editorial Team</span>
                      <span className="meta-dot">·</span>
                      <span>{formatDate(posts[0].publishedAt || posts[0]._updatedAt)}</span>
                    </div>
                    <span className="primary-hero-cta">Read Story →</span>
                  </div>
                </div>
              )}

              {/* CURATED SIDE STACK (RIGHT COLUMN - 1/3) */}
              <div className="secondary-hero-stack">
                <span className="stack-label">Featured Inside</span>
                {posts.slice(1, 4).length > 0 ? (
                  posts.slice(1, 4).map((post, idx) => (
                    <div 
                      key={post.slug.current || idx}
                      className="secondary-hero-card"
                      onClick={() => handlePostClick(post.slug.current)}
                    >
                      <span className="secondary-hero-num">0{idx + 1}</span>
                      <div className="secondary-hero-details">
                        <span className="secondary-hero-category">{categoryTitle}</span>
                        <h4 className="secondary-hero-title">{post.title}</h4>
                        <div className="secondary-hero-meta">
                          <span>{formatDate(post.publishedAt || post._updatedAt)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-stack-posts">Stay tuned for upcoming highlights.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* THE MAIN STAR PRIME FEED (LIGHT WARM-WHITE BACKGROUND) */}
      <section className="industry-feed-section">
        <div className="feed-container">
          <div className="feed-grid-layout">
            
            {/* LEFT FEED COLUMN (2/3 width) */}
            <div className="feed-articles-column">
              <h3 className="feed-section-title">Latest Publications</h3>
              <div className="feed-articles-grid">
                {isLoading ? (
                  <div className="loader-container">
                    <Loader />
                  </div>
                ) : error ? (
                  <div className="error-alert">Error fetching latest articles</div>
                ) : posts.length <= 4 ? (
                  <p className="no-more-posts">More insights are currently being compiled by our newsroom.</p>
                ) : (
                  posts.slice(4).map((post, index) => (
                    <div 
                      key={post.slug.current || index}
                      className={`feed-article-card ${isVisible ? 'animate-in' : ''}`}
                      style={{ animationDelay: `${index * 0.08}s` }}
                      onClick={() => handlePostClick(post.slug.current)}
                    >
                      <div className="feed-card-image-wrapper">
                        <Image
                          src={post.featureImg}
                          alt={post.altText || post.title}
                          fill
                          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 380px"
                        />
                      </div>
                      <div className="feed-card-content">
                        <span className="feed-card-category">{categoryTitle}</span>
                        <h4 className="feed-card-title">{post.title}</h4>
                        {post.description && (
                          <p className="feed-card-excerpt">{post.description}</p>
                        )}
                        <div className="feed-card-meta">
                          <span>{formatDate(post.publishedAt || post._updatedAt)}</span>
                        </div>
                        <div className="card-hover-border" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* RIGHT SIDEBAR COLUMN (1/3 width) */}
            <div className="feed-sidebar-column">
              <div className="sidebar-section">
                <div className={`${isVisible ? "animate-in" : ""}`} style={{ animationDelay: "0.2s" }}>
                  <WidgetNewsletter />
                </div>
                <div className={`sidebar-widget ${isVisible ? "animate-in" : ""}`} style={{ animationDelay: "0.3s" }}>
                  <h4 className="widget-title">Social Share</h4>
                  <WidgetSocialShare />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <FooterTwo />

      <style jsx>{`
        /* ── EDITORIAL COVER STYLING ── */
        .industry-hero-cover {
          background: #0F1923;
          color: #FFFFFF;
          padding: 5rem 0 6rem 0;
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          border-bottom: 1px solid #1E2D3D;
        }

        .hero-cover-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .hero-cover-header {
          text-align: center;
          margin-bottom: 4.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-eyebrow {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: var(--cardinal, #C1121F);
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }

        .hero-cover-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: clamp(2.25rem, 4.5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.15;
          color: #FFFFFF;
          margin: 0 0 1.25rem 0;
          letter-spacing: -0.02em;
        }

        .hero-cover-desc {
          font-family: var(--font-serif-body, 'Libre Baskerville', serif);
          font-size: clamp(0.95rem, 1.8vw, 1.15rem);
          line-height: 1.7;
          color: #D0C9BF;
          max-width: 720px;
          margin: 0 auto;
        }

        .hero-cover-divider {
          width: 80px;
          height: 3px;
          background: var(--cardinal, #C1121F);
          margin-top: 1.5rem;
          border-radius: 999px;
        }

        /* Cover Layout Grid */
        .hero-cover-grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr;
          gap: 4.5rem;
          align-items: stretch;
        }

        /* Primary Cover Article */
        .primary-hero-card {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          border-right: 1px solid #2E4057;
          padding-right: 4.5rem;
        }

        .primary-hero-image-wrapper {
          position: relative;
          width: 100%;
          height: 440px;
          border-radius: 12px;
          overflow: hidden;
          background: #1E2D3D;
          border: 1px solid rgba(250, 248, 245, 0.08);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25);
          margin-bottom: 2rem;
        }

        .primary-hero-image-wrapper :global(img) {
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .primary-hero-card:hover .primary-hero-image-wrapper :global(img) {
          transform: scale(1.04);
        }

        .primary-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15, 25, 35, 0.4) 0%, transparent 100%);
          pointer-events: none;
        }

        .primary-hero-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .primary-hero-category {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--cardinal, #C1121F);
          margin-bottom: 0.75rem;
          display: block;
        }

        .primary-hero-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.2;
          margin: 0 0 1.25rem 0;
          letter-spacing: -0.01em;
        }

        .primary-hero-excerpt {
          font-family: var(--font-serif-body, 'Libre Baskerville', serif);
          font-size: 0.95rem;
          line-height: 1.7;
          color: #D0C9BF;
          margin: 0 0 1.5rem 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .primary-hero-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #9A9490;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 1.75rem;
        }

        .meta-author {
          color: #D0C9BF;
        }

        .meta-dot {
          color: #2E4057;
        }

        .primary-hero-cta {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 0.8rem;
          font-weight: 700;
          color: #FFFFFF;
          background: var(--cardinal, #C1121F);
          padding: 12px 24px;
          width: fit-content;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          transition: all 0.3s ease;
        }

        .primary-hero-card:hover .primary-hero-cta {
          background: #96010D;
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(193, 18, 31, 0.25);
        }

        /* Secondary Highlight Stack */
        .secondary-hero-stack {
          display: flex;
          flex-direction: column;
        }

        .stack-label {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--cardinal, #C1121F);
          margin-bottom: 1.75rem;
          padding-bottom: 0.65rem;
          border-bottom: 1px solid #2E4057;
        }

        .secondary-hero-card {
          display: flex;
          gap: 1.5rem;
          padding: 1.75rem 0;
          border-bottom: 1px solid #1E2D3D;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .secondary-hero-card:last-of-type {
          border-bottom: none;
        }

        .secondary-hero-num {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 2.2rem;
          font-weight: 900;
          color: rgba(250, 248, 245, 0.2);
          line-height: 1;
          transition: color 0.3s ease;
        }

        .secondary-hero-card:hover .secondary-hero-num {
          color: var(--cardinal, #C1121F);
        }

        .secondary-hero-details {
          flex: 1;
        }

        .secondary-hero-category {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--cardinal, #C1121F);
          margin-bottom: 0.45rem;
          display: block;
        }

        .secondary-hero-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 1.15rem;
          font-weight: 700;
          color: #FAF8F5;
          line-height: 1.45;
          margin: 0 0 0.5rem 0;
          transition: color 0.3s ease;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .secondary-hero-card:hover .secondary-hero-title {
          color: #D0C9BF;
        }

        .secondary-hero-meta {
          font-size: 0.7rem;
          color: #9A9490;
          font-weight: 500;
        }

        /* ── THE FEED SECTION ── */
        .industry-feed-section {
          background: #FAF8F5;
          padding: 6rem 0;
          color: #0F1923;
        }

        .feed-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .feed-grid-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 4.5rem;
        }

        .feed-section-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 2rem;
          font-weight: 800;
          color: #0F1923;
          margin-bottom: 2.5rem;
          border-bottom: 2px solid #0F1923;
          padding-bottom: 0.85rem;
          letter-spacing: -0.01em;
        }

        .feed-articles-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2.5rem 2rem;
        }

        .feed-article-card {
          background: #FFFFFF;
          border: 1px solid rgba(15, 25, 35, 0.05);
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 15px rgba(15, 25, 35, 0.02);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          position: relative;
          min-height: 460px;
        }

        .feed-article-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 35px rgba(15, 25, 35, 0.08);
          border-color: rgba(15, 25, 35, 0.12);
        }

        .feed-card-image-wrapper {
          position: relative;
          width: 100%;
          height: 220px;
          overflow: hidden;
          background: #FAF8F5;
        }

        .feed-card-image-wrapper :global(img) {
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .feed-article-card:hover .feed-card-image-wrapper :global(img) {
          transform: scale(1.04);
        }

        .feed-card-content {
          padding: 1.75rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .feed-card-category {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--cardinal, #C1121F);
          margin-bottom: 0.75rem;
          display: block;
        }

        .feed-card-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 1.25rem;
          font-weight: 700;
          color: #0F1923;
          line-height: 1.45;
          margin: 0 0 0.85rem 0;
          transition: color 0.3s ease;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .feed-article-card:hover .feed-card-title {
          color: var(--cardinal, #C1121F);
        }

        .feed-card-excerpt {
          font-family: var(--font-serif-body, 'Libre Baskerville', serif);
          font-size: 0.88rem;
          line-height: 1.65;
          color: #555555;
          margin: 0 0 1.5rem 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .feed-card-meta {
          margin-top: auto;
          font-size: 0.75rem;
          color: #777777;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .card-hover-border {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--cardinal, #C1121F);
          transform: scaleX(0);
          transition: transform 0.3s ease;
          transform-origin: left;
        }

        .feed-article-card:hover .card-hover-border {
          transform: scaleX(1);
        }

        .no-more-posts,
        .no-stack-posts,
        .no-posts-dark {
          font-family: var(--font-serif-body, 'Libre Baskerville', serif);
          font-size: 1.05rem;
          color: #777777;
          font-style: italic;
          padding: 2rem 0;
        }

        .no-posts-dark {
          color: #D0C9BF;
          text-align: center;
          width: 100%;
        }

        /* ── SIDEBAR PREMIUM CUSTOM OVERRIDES ── */
        .sidebar-section > div,
        .sidebar-widget {
          background: #FFFFFF !important;
          border: 1px solid rgba(15, 25, 35, 0.05) !important;
          box-shadow: 0 4px 15px rgba(15, 25, 35, 0.02) !important;
          padding: 1.75rem !important;
          border-radius: 8px !important;
          margin-bottom: 2.25rem !important;
          transition: all 0.3s ease !important;
        }

        .sidebar-section > div:hover,
        .sidebar-widget:hover {
          border-color: rgba(15, 25, 35, 0.1) !important;
          box-shadow: 0 10px 25px rgba(15, 25, 35, 0.05) !important;
        }

        .widget-title {
          color: #0F1923 !important;
          font-family: var(--font-serif, 'Playfair Display', serif) !important;
          font-size: 1.25rem !important;
          font-weight: 700 !important;
          border-bottom: 1px solid rgba(15, 25, 35, 0.08) !important;
          padding-bottom: 0.65rem !important;
          margin-bottom: 1.25rem !important;
          letter-spacing: normal !important;
          text-transform: none !important;
        }

        /* ── LOADING & ERROR STATES ── */
        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 250px;
          width: 100%;
        }

        .loader-container-dark {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 350px;
          width: 100%;
        }

        .error-alert,
        .error-alert-dark {
          color: #8f2d2d;
          background: rgba(220, 53, 69, 0.08);
          padding: 1.25rem;
          border-radius: 8px;
          text-align: center;
          border: 1px solid rgba(220, 53, 69, 0.2);
          font-size: 0.9rem;
          width: 100%;
        }

        .error-alert-dark {
          background: rgba(220, 53, 69, 0.12);
          border-color: rgba(220, 53, 69, 0.25);
          color: #ffa3a3;
        }

        /* ── ANIMATIONS ── */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-in {
          animation: fadeInUp 0.7s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
          opacity: 0;
        }

        .industry-hero-cover.animate-fade {
          animation: fadeInUp 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        }

        /* ── RESPONSIVE STYLING ── */
        @media (max-width: 1024px) {
          .hero-cover-container,
          .feed-container {
            padding: 0 24px;
          }

          .hero-cover-grid {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }

          .primary-hero-card {
            border-right: none;
            padding-right: 0;
          }

          .feed-grid-layout {
            grid-template-columns: 1fr;
            gap: 4rem;
          }

          .feed-sidebar-column {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .industry-hero-cover {
            padding: 3.5rem 0 4rem 0;
          }

          .hero-cover-header {
            margin-bottom: 3rem;
          }

          .primary-hero-image-wrapper {
            height: 320px;
            margin-bottom: 1.5rem;
          }

          .industry-feed-section {
            padding: 4rem 0;
          }

          .feed-section-title {
            margin-bottom: 2rem;
          }

          .feed-articles-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .feed-article-card {
            min-height: auto;
          }

          .feed-card-image-wrapper {
            height: 200px;
          }

          .feed-sidebar-column {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .hero-cover-container,
          .feed-container {
            padding: 0 16px;
          }

          .hero-cover-title {
            font-size: 1.85rem;
          }

          .primary-hero-image-wrapper {
            height: 220px;
          }

          .primary-hero-title {
            font-size: 1.5rem;
          }

          .secondary-hero-num {
            font-size: 1.85rem;
          }

          .secondary-hero-title {
            font-size: 1.05rem;
          }

          .feed-card-content {
            padding: 1.25rem;
          }
        }
      `}</style>
    </>
  );
};

export default IndustryPosts;
