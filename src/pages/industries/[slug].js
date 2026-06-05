import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import HeaderOne from "../../components/header/HeaderOne";
import FooterTwo from "../../components/footer/FooterTwo";
import Loader from "../../components/common/Loader";
import HeadMeta from "../../components/elements/HeadMeta";
import { client } from "../../client";
import Image from "next/image";
import Link from "next/link";

const getCategorySvg = (slug) => {
  const cleanSlug = slug?.toLowerCase() || "";
  if (cleanSlug.includes("finance")) {
    return (
      <svg className="cat-grid-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12h-15M9 21h6M3 9v12m18-12v12" />
      </svg>
    );
  }
  if (cleanSlug.includes("health")) {
    return (
      <svg className="cat-grid-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    );
  }
  if (cleanSlug.includes("legal")) {
    return (
      <svg className="cat-grid-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 8.25h18M3 8.25c0 3.75 4.5 4.5 4.5 4.5S12 12 12 8.25M21 8.25c0 3.75-4.5 4.5-4.5 4.5S12 12 12 8.25M6.75 12.75v5.25a2.25 2.25 0 004.5 0v-5.25m6 0v5.25a2.25 2.25 0 004.5 0v-5.25" />
      </svg>
    );
  }
  if (cleanSlug.includes("manufactur")) {
    return (
      <svg className="cat-grid-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0a7.5 7.5 0 00-1.5-4.5m1.5 4.5a7.5 7.5 0 01-1.5 4.5M3 12h1.5M12 3v1.5m0 15V21m-6-1.5l1.061-1.061M16.939 5.061L18 4m-12 0l1.061 1.061M16.939 18.939L18 20" />
      </svg>
    );
  }
  if (cleanSlug.includes("tech") || cleanSlug.includes("ai")) {
    return (
      <svg className="cat-grid-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-10.5-3.75h10.5a2.25 2.25 0 002.25-2.25V7.5a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 7.5v8.25a2.25 2.25 0 002.25 2.25zM9 9h6v6H9V9z" />
      </svg>
    );
  }
  if (cleanSlug.includes("transport")) {
    return (
      <svg className="cat-grid-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124l-.317-5.072a2.25 2.25 0 00-2.247-2.11H14.25M6.5 10.5H3.375c-.621 0-1.125.504-1.125 1.125v2.25m6.5-3.375v3.375m0-3.375h3.75a1.125 1.125 0 011.125 1.125v3.375m0-3.375h1.5a1.125 1.125 0 011.125 1.125v3.375m-9.75 3.375h14.25M12 10.5V6m0 0L9.75 8.25M12 6l2.25 2.25" />
      </svg>
    );
  }
  if (cleanSlug.includes("stock") || cleanSlug.includes("market")) {
    return (
      <svg className="cat-grid-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    );
  }
  if (cleanSlug.includes("polit")) {
    return (
      <svg className="cat-grid-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21V9.75M3.284 14.253A8.966 8.966 0 0112 11.25c2.29 0 4.414.858 6.03 2.288M3.284 14.253a8.973 8.973 0 003.541 4.793M18.716 14.253a8.973 8.973 0 01-3.541 4.793m0 0A8.961 8.961 0 0112 21m0-21C6.477 0 2 4.477 2 10c0 1.637.443 3.17 1.216 4.5M12 0c5.523 0 10 4.477 10 10 0 1.637-.443 3.17-1.216 4.5M12 0v3" />
      </svg>
    );
  }
  // Default general industry card (newspaper style)
  return (
    <svg className="cat-grid-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
    </svg>
  );
};

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

  const { data: categoriesData } = useQuery({
    queryKey: ["allIndustryCategories"],
    queryFn: async () => {
      return await client.fetch(`
        *[_type == "industryCategory"]{
          title,
          slug,
          "imageUrl": image.asset->url
        } | order(title asc)
      `);
    },
  });

  const [isVisible, setIsVisible] = useState(false);
  const posts = Array.isArray(data) ? data : [];
  const categoriesList = Array.isArray(categoriesData) ? categoriesData : [];
  const displayCategories = categoriesList.slice(0, 6);

  const feedPosts = posts.slice(7);
  const gridItems = [];

  if (feedPosts.length > 0) {
    // Row 1 (all blogs)
    if (feedPosts[0]) gridItems.push({ type: "post", data: feedPosts[0] });
    if (feedPosts[1]) gridItems.push({ type: "post", data: feedPosts[1] });
    if (feedPosts[2]) gridItems.push({ type: "post", data: feedPosts[2] });
    if (feedPosts[3]) gridItems.push({ type: "post", data: feedPosts[3] });

    // Row 2 (newsletter, 2 blogs, categories)
    gridItems.push({ type: "newsletter" });
    if (feedPosts[4]) gridItems.push({ type: "post", data: feedPosts[4] });
    if (feedPosts[5]) gridItems.push({ type: "post", data: feedPosts[5] });
    gridItems.push({ type: "categories" });

    // Remaining rows
    for (let i = 6; i < feedPosts.length; i++) {
      gridItems.push({ type: "post", data: feedPosts[i] });
    }
  }

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

  const renderTitle = (title) => {
    if (!title) return "";
    const match = title.match(/\s*(—|–|:)\s*/);
    if (match) {
      const separator = match[1];
      const index = title.indexOf(separator);
      const mainName = title.substring(0, index).trim();
      const description = title.substring(index + separator.length).trim();
      return (
        <>
          {mainName} {separator} <em style={{ color: "#6B6560", fontStyle: "italic", fontWeight: 400 }}>{description}</em>
        </>
      );
    }
    return title;
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
                    <h2 className="primary-hero-title">{renderTitle(posts[0].title)}</h2>
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
                {posts.slice(1, 7).length > 0 ? (
                  posts.slice(1, 7).map((post, idx) => (
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
                      {post.featureImg && (
                        <div className="secondary-hero-img-wrapper">
                          <Image
                            src={post.featureImg}
                            alt={post.altText || post.title}
                            width={90}
                            height={60}
                            style={{ objectFit: "cover" }}
                            className="secondary-hero-img"
                          />
                        </div>
                      )}
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

            {/* LEFT FEED COLUMN (2/3 width -> stretches to full width) */}
            <div className="feed-articles-column">
              <h3 className="feed-section-title">Latest Publications</h3>
              <div className="feed-articles-grid">
                {isLoading ? (
                  <div className="loader-container">
                    <Loader />
                  </div>
                ) : error ? (
                  <div className="error-alert">Error fetching latest articles</div>
                ) : posts.length <= 7 ? (
                  <p className="no-more-posts">More insights are currently being compiled by our newsroom.</p>
                ) : (
                  gridItems.map((item, index) => {
                    if (item.type === "newsletter") {
                      return (
                        <div key="newsletter-grid-card" className="feed-newsletter-card">
                          <div className="newsletter-stamp-wrapper">
                            <svg className="newsletter-stamp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                            </svg>
                            <span className="ec-newsletter-label">Newsletter</span>
                          </div>
                          <h3 className="ec-newsletter-title">Stay ahead of the story.</h3>
                          <p className="ec-newsletter-text">
                            The Star Prime digest — curated business intelligence, fresh profiles, and market insights, delivered weekly.
                          </p>

                          <ul className="newsletter-features">
                            <li>
                              <span className="feature-dot">✦</span>
                              <span className="feature-text">In-depth founder profiles</span>
                            </li>
                            <li>
                              <span className="feature-dot">✦</span>
                              <span className="feature-text">Exclusive market sector trends</span>
                            </li>
                            <li>
                              <span className="feature-dot">✦</span>
                              <span className="feature-text">Weekly curated business digests</span>
                            </li>
                          </ul>

                          <div className="ec-newsletter-form">
                            <input
                              type="email"
                              className="ec-newsletter-input"
                              placeholder="Your email address"
                              aria-label="Email address"
                            />
                            <button className="ec-newsletter-btn" type="button">
                              Join
                            </button>
                          </div>

                          <span className="newsletter-footer-note">
                            Join 45,000+ industry decision makers. Zero spam.
                          </span>
                        </div>
                      );
                    }

                    if (item.type === "categories") {
                      return (
                        <div key="categories-grid-card" className="feed-categories-card">
                          <h4 className="categories-card-title">Browse Industries</h4>
                          <div className="categories-grid">
                            {displayCategories.map((cat) => (
                              <Link
                                key={cat.slug?.current}
                                href={`/industries/${cat.slug?.current}`}
                                className="cat-grid-item"
                              >
                                <div className="cat-grid-thumb">
                                  <div className="cat-grid-placeholder">
                                    {getCategorySvg(cat.slug?.current)}
                                  </div>
                                </div>
                                <span className="cat-grid-name">
                                  {cat.title}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    const post = item.data;
                    return (
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
                    );
                  })
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      <FooterTwo />

      <style jsx>{`
        /* ── EDITORIAL COVER STYLING ── */
        .industry-hero-cover {
          background: #FAF8F5;
          color: #0f1923;
          padding: 5rem 0 6rem 0;
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          border-bottom: 1px solid #E8E3DC;
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
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: #7A0F23;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }

        .hero-cover-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: clamp(2.25rem, 4.5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.15;
          color: #0f1923;
          margin: 0 0 1.25rem 0;
          letter-spacing: -0.02em;
        }

        .hero-cover-desc {
          font-family: var(--font-serif-body, 'Libre Baskerville', serif);
          font-size: clamp(0.95rem, 1.8vw, 1.15rem);
          line-height: 1.7;
          color: #5A544F;
          max-width: 720px;
          margin: 0 auto;
        }

        .hero-cover-divider {
          width: 80px;
          height: 3px;
          background: #7A0F23;
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
          border-right: 1px solid #E8E3DC;
          padding-right: 4.5rem;
        }

        .primary-hero-image-wrapper {
          position: relative;
          width: 100%;
          height: 440px;
          border-radius: 0;
          overflow: hidden;
          background: #E8E3DC;
          border: 1px solid #D0C9BF;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.1);
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
          background: linear-gradient(to top, rgba(15, 25, 35, 0.1) 0%, transparent 100%);
          pointer-events: none;
        }

        .primary-hero-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .primary-hero-category {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #7A0F23;
          margin-bottom: 0.75rem;
          display: block;
        }

        .primary-hero-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: clamp(24px, 2.2vw, 30px) !important;
          font-weight: 700;
          color: #0f1923;
          line-height: 1.25;
          margin: 0 0 1.25rem 0;
          letter-spacing: -0.01em;
        }

        .primary-hero-excerpt {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 15px;
          line-height: 1.75;
          color: #5A544F;
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
          font-size: 11px;
          font-weight: 600;
          color: #9A9490;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 1.75rem;
        }

        .meta-author {
          color: #0f1923;
        }

        .meta-dot {
          color: #E8E3DC;
        }

        .primary-hero-cta {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 11px;
          font-weight: 600;
          color: #FFFFFF;
          background: var(--cardinal, #7A0F23);
          padding: 10px 24px;
          width: fit-content;
          text-transform: uppercase;
          letter-spacing: 0.18em;
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
          color: #7A0F23;
          margin-bottom: 1.75rem;
          padding-bottom: 0.65rem;
          border-bottom: 1px solid #E8E3DC;
        }

        .secondary-hero-card {
          display: flex;
          gap: 1.5rem;
          padding: 1.15rem 0;
          border-bottom: 1px solid #E8E3DC;
          cursor: pointer;
          transition: all 0.3s ease;
          align-items: flex-start;
        }

        .secondary-hero-img-wrapper {
          width: 90px;
          height: 60px;
          flex-shrink: 0;
          overflow: hidden;
          background: #E8E3DC;
          border: 1px solid #D0C9BF;
        }

        .secondary-hero-img-wrapper :global(.secondary-hero-img) {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          transition: transform 0.4s ease !important;
        }

        .secondary-hero-card:hover .secondary-hero-img-wrapper :global(.secondary-hero-img) {
          transform: scale(1.05);
        }

        .secondary-hero-card:last-of-type {
          border-bottom: none;
        }

        .secondary-hero-num {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 26px;
          font-weight: 900;
          color: rgba(15, 25, 35, 0.15);
          line-height: 1;
          transition: color 0.3s ease;
        }

        .secondary-hero-card:hover .secondary-hero-num {
          color: #7A0F23;
        }

        .secondary-hero-details {
          flex: 1;
        }

        .secondary-hero-category {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #7A0F23;
          margin-bottom: 0.45rem;
          display: block;
        }

        .secondary-hero-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 13px;
          font-weight: 700;
          color: #0f1923;
          line-height: 1.45;
          margin: 0 0 0.5rem 0;
          transition: all 0.3s ease;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .secondary-hero-card:hover .secondary-hero-title {
          color: #7A0F23;
        }

        .secondary-hero-meta {
          font-size: 10px;
          color: #6B6560;
          font-weight: 500;
        }

        /* ── THE FEED SECTION ── */
        .industry-feed-section {
          background: #FAF8F5;
          padding: 6rem 0;
          color: #0f1923;
        }

        .feed-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .feed-grid-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }

        .feed-section-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 2rem;
          font-weight: 800;
          color: #0f1923;
          margin-bottom: 2.5rem;
          border-bottom: 2px solid #0f1923;
          padding-bottom: 0.85rem;
          letter-spacing: -0.01em;
        }

        .feed-articles-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2.5rem 2rem;
        }

        /* ── GRID NEWSLETTER CARD ── */
        .feed-newsletter-card {
          background: #0f1923;
          border: 1px solid #1E2D3D;
          border-radius: 0;
          padding: 2.25rem 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 460px;
        }

        .newsletter-stamp-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 0.75rem;
          color: #dfc167;
        }

        .newsletter-stamp-icon {
          width: 28px;
          height: 28px;
          opacity: 0.95;
        }

        .feed-newsletter-card .ec-newsletter-label {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #dfc167;
          margin-bottom: 0;
          line-height: 1;
        }

        .feed-newsletter-card .ec-newsletter-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 20px;
          font-weight: 700;
          color: #FAF8F5;
          line-height: 1.3;
          margin: 0 0 0.5rem;
        }

        .feed-newsletter-card .ec-newsletter-text {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 12.5px;
          color: #D0C9BF;
          line-height: 1.55;
          margin: 0 0 1rem;
        }

        .newsletter-features {
          list-style: none;
          padding: 0;
          margin: 0 0 1.25rem 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .newsletter-features li {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .feature-dot {
          color: #dfc167;
          font-size: 11px;
        }

        .feature-text {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 12px;
          color: #D0C9BF;
          font-weight: 500;
        }

        .feed-newsletter-card .ec-newsletter-form {
          display: flex;
          width: 100%;
          margin-bottom: 0.5rem;
        }

        .feed-newsletter-card .ec-newsletter-input {
          flex: 1;
          border: 1px solid #2E4057;
          border-right: none;
          padding: 12px 16px;
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 13px;
          background: #111B24;
          color: #FAF8F5;
          outline: none;
          transition: border-color 0.25s ease;
        }

        .feed-newsletter-card .ec-newsletter-input:focus {
          border-color: #dfc167;
        }

        .feed-newsletter-card .ec-newsletter-input::placeholder {
          color: #9A9490;
        }

        .feed-newsletter-card .ec-newsletter-btn {
          background: #dfc167;
          color: #0f1923;
          border: none;
          padding: 12px 20px;
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.25s ease;
        }

        .feed-newsletter-card .ec-newsletter-btn:hover {
          background: #f5d57b;
        }

        .newsletter-footer-note {
          font-family: var(--font-sans, 'DM Sans', sans-serif);
          font-size: 10px;
          color: #9A9490;
          font-weight: 500;
          display: block;
        }

        /* ── GRID CATEGORIES CARD ── */
        .feed-categories-card {
          background: #FFFFFF;
          border: 1px solid #E2DDD7;
          border-radius: 0;
          padding: 2.25rem 2rem;
          display: flex;
          flex-direction: column;
          min-height: 460px;
        }

        .categories-card-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 16px;
          font-weight: 700;
          color: #0f1923;
          margin: 0 0 1.15rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid #0f1923;
          letter-spacing: -0.01em;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem 0.75rem;
          flex: 1;
        }

        .cat-grid-item {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: #0f1923;
          transition: all 0.25s ease;
        }

        .cat-grid-thumb {
          position: relative;
          width: 100%;
          height: 75px;
          overflow: hidden;
          background: #FAF8F5;
          border: 1px solid #E2DDD7;
          margin-bottom: 0.4rem;
        }

        .cat-grid-thumb :global(img) {
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .cat-grid-placeholder {
          width: 100%;
          height: 100%;
          background: #E8E3DC;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.25s ease;
        }

        :global(.cat-grid-svg) {
          width: 28px;
          height: 28px;
          color: #5A544F;
          transition: all 0.3s ease;
        }

        .cat-grid-item:hover :global(.cat-grid-svg) {
          color: #8C6D3B;
          transform: scale(1.1);
        }

        .cat-grid-item:hover .cat-grid-placeholder {
          background-color: #DFD9D0;
        }

        .cat-grid-name {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 11px;
          font-weight: 700;
          line-height: 1.35;
          color: #0f1923;
          transition: color 0.25s ease;
          display: block;
          text-align: center;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cat-grid-item:hover .cat-grid-thumb :global(img) {
          transform: scale(1.08);
        }

        .cat-grid-item:hover .cat-grid-name {
          color: #8C6D3B;
        }

        /* ── ORIGINAL ARTICLE CARD ── */
        .feed-article-card {
          background: #FFFFFF;
          border: 1px solid #E2DDD7;
          border-radius: 0;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          box-shadow: none;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          position: relative;
          min-height: 460px;
        }

        .feed-article-card:hover {
          background: #FAF8F5;
          border-color: #C5A059;
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
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #8C6D3B;
          margin-bottom: 0.75rem;
          display: block;
        }

        .feed-card-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 15px;
          font-weight: 700;
          color: #0f1923;
          line-height: 1.45;
          margin: 0 0 0.85rem 0;
          transition: color 0.3s ease;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .feed-article-card:hover .feed-card-title {
          color: #8C6D3B;
        }

        .feed-card-excerpt {
          font-family: var(--font-serif-body, 'Libre Baskerville', serif);
          font-size: 12px;
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
          font-size: 11px;
          color: #777777;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .card-hover-border {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #8C6D3B;
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
            gap: 0;
          }

          .feed-articles-grid {
            grid-template-columns: repeat(2, 1fr);
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

          .feed-article-card,
          .feed-newsletter-card,
          .feed-categories-card {
            min-height: auto;
          }

          .feed-card-image-wrapper {
            height: 200px;
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
