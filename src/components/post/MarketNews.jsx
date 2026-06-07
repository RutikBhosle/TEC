import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";

const MarketNews = () => {
  const query = `
*[
  _type == "post" &&
  "market-news" in categories[]->slug.current
]
{
  title,
  slug,
  altText,
  'featureImg': mainImage.asset->url,
  publishedAt,
  _updatedAt,
  body,
  description,
  'category': {
    'title': categories[0]->title,
    'slug': categories[0]->slug.current
  }
} | order(publishedAt desc, _createdAt desc)[0...7]
`;

  const { data, isLoading, error } = useQuery({
    queryKey: ["market-news-home-v6"],
    queryFn: async () => client.fetch(query),
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <Loader />;
  if (error) return null;
  if (!data || data.length === 0) return null;

  const formatDate = (post) => {
    const d = post.publishedAt || post._updatedAt;
    if (!d) return "";
    try {
      return new Date(d).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  const toPlainText = (blocks = []) => {
    if (!blocks || !Array.isArray(blocks)) return "";
    return blocks
      .map(block => {
        if (block._type !== 'block' || !block.children) {
          return '';
        }
        return block.children.map(child => child.text).join('');
      })
      .filter(Boolean)
      .join('\n\n');
  };

  const mainPost = data[0];
  const middlePosts = data.slice(1, 4);
  const rightPosts = data.slice(4, 7);

  const mainPostContent = mainPost && mainPost.body && mainPost.body.length > 0
    ? toPlainText(mainPost.body)
    : (mainPost ? mainPost.description : "");

  // ─── Inline style objects ────────────────────────────────────────────────────
  const S = {
    section: {
      background: "#FAF8F5", // Changed to warm white to match the screenshot backdrop
      padding: "24px 0 16px",
    },
    container: {
      maxWidth: "1240px",
      margin: "0 auto",
      padding: "0 32px",
    },
    header: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      marginBottom: "28px",
      paddingBottom: "12px",
      borderBottom: "2px solid #0f1923",
    },
    label: {
      display: "block",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "10px",
      fontWeight: 700,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: "#7A0F23",
      marginBottom: "6px",
    },
    sectionTitle: {
      fontFamily: "'Playfair Display', serif",
      fontSize: "22px",
      fontWeight: 700,
      color: "#0f1923",
      letterSpacing: "-0.01em",
      margin: 0,
    },
    viewAll: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: "#7A0F23",
      textDecoration: "none",
      borderBottom: "1px solid #7A0F23",
      paddingBottom: "1px",
      whiteSpace: "nowrap",
    },
    // GRID
    grid: {
      display: "grid",
      gridTemplateColumns: "3fr 1fr 1fr",
      border: "1px solid #E2DDD7",
      background: "#FAF8F5",
    },
    // MAIN LEFT COLUMN
    mainLink: {
      display: "flex",
      flexDirection: "column",
      textDecoration: "none",
      color: "inherit",
      background: "#FAF8F5",
      cursor: "pointer",
      transition: "background 0.2s ease",
      borderRight: "1px solid #E2DDD7",
    },
    mainImgWrapper: {
      width: "100%",
      aspectRatio: "16 / 10",
      overflow: "hidden",
      background: "#1A2535",
      flexShrink: 0,
    },
    mainImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      transition: "transform 0.5s ease",
    },
    mainBody: {
      padding: "28px",
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    mainTag: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "9px",
      fontWeight: 700,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "#7A0F23",
      marginBottom: "10px",
      display: "block",
    },
    mainTitle: {
      fontFamily: "'Playfair Display', serif",
      fontSize: "24px",
      fontWeight: 700,
      color: "#0f1923",
      lineHeight: 1.25,
      margin: "0 0 12px",
    },
    mainExcerpt: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "13.5px",
      color: "#6B6560",
      lineHeight: 1.65,
      margin: "0 0 24px",
      display: "-webkit-box",
      WebkitLineClamp: 5,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    },
    mainFooter: {
      marginTop: "auto", // Anchors the entire footer block at the absolute bottom of the card
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: "16px",
      borderTop: "1px solid rgba(15, 25, 35, 0.08)", // Softer border line
    },
    mainMeta: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "11px",
      color: "#9A9490",
    },
    mainCta: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "11px",
      fontWeight: 700,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: "#7A0F23",
      transition: "color 0.2s ease",
    },
    // SECONDARY COLUMNS
    listCol: {
      display: "flex",
      flexDirection: "column",
      background: "#FAF8F5",
      borderRight: "1px solid #E2DDD7",
    },
    listColLast: {
      display: "flex",
      flexDirection: "column",
      background: "#FAF8F5",
    },
    // STACKED CARD ITEMS
    rowItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      gap: "8px",
      padding: "12px 18px",
      textDecoration: "none",
      color: "inherit",
      background: "#FAF8F5",
      cursor: "pointer",
      flex: 1,
      minHeight: 0,
      transition: "background 0.2s ease",
    },
    thumb: {
      width: "100%",
      aspectRatio: "16 / 9",
      background: "#1A2535",
      flexShrink: 0,
      overflow: "hidden",
    },
    thumbImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      transition: "transform 0.5s ease",
    },
    rowContent: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minWidth: 0,
    },
    rowTag: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "8.5px",
      fontWeight: 700,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "#7A0F23",
      marginBottom: "3px",
      display: "block",
    },
    rowTitle: {
      fontFamily: "'Libre Baskerville', serif",
      fontSize: "12px",
      fontWeight: 400,
      color: "#0f1923",
      lineHeight: 1.35,
      marginBottom: "4px",
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    },
    rowDate: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "10px",
      color: "#9A9490",
      marginTop: "auto",
    },
  };

  const renderRowItem = (post, i, isLast) => (
    <Link
      key={post.slug?.current || i}
      href={`/post/${post.slug?.current}`}
      style={{
        ...S.rowItem,
        borderBottom: isLast ? "none" : "1px solid #E2DDD7",
      }}
      className="ec-market-card"
    >
      <div style={S.thumb} className="ec-market-card-img">
        {post.featureImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.featureImg} alt={post.altText || post.title} style={S.thumbImg} />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "#1A2535" }} />
        )}
      </div>
      <div style={S.rowContent}>
        <span style={S.rowTag}>{post.category?.title || "Market News"}</span>
        <div style={S.rowTitle}>{post.title}</div>
        <div style={S.rowDate}>{formatDate(post)}</div>
      </div>
    </Link>
  );

  return (
    <>
      <section style={S.section}>
        <div style={S.container}>
          {/* HEADER */}
          <div style={S.header}>
            <div>
              <span style={S.label}>Global Business Intelligence</span>
              <h2 style={S.sectionTitle}>Market News</h2>
            </div>
          </div>

          {/* GRID */}
          <div style={S.grid} className="ec-market-grid">
            {/* COLUMN 1 — MAIN FEATURE */}
            {mainPost && (
              <Link href={`/post/${mainPost.slug?.current}`} style={S.mainLink} className="ec-market-main-card">
                <div style={S.mainImgWrapper} className="ec-market-main-img">
                  {mainPost.featureImg ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={mainPost.featureImg}
                      alt={mainPost.altText || mainPost.title}
                      style={S.mainImg}
                    />
                  ) : (
                    <div style={{ width: "100%", height: "100%", background: "#1A2535" }} />
                  )}
                </div>
                <div style={S.mainBody}>
                  <span style={S.mainTag}>{mainPost.category?.title || "Market News"}</span>
                  <h3 style={S.mainTitle}>{mainPost.title}</h3>
                  {mainPostContent && (
                    <p style={S.mainExcerpt}>{mainPostContent}</p>
                  )}
                  <div style={S.mainFooter}>
                    <div style={S.mainMeta}>{formatDate(mainPost)} · 4 min read</div>
                    <span style={S.mainCta} className="ec-market-main-cta">View More →</span>
                  </div>
                </div>
              </Link>
            )}
            {/* COLUMN 2 — MIDDLE ROWS */}
            <div style={S.listCol} className="ec-market-col-middle">
              {middlePosts.map((post, i) =>
                renderRowItem(post, i, i === middlePosts.length - 1)
              )}
            </div>

            {/* COLUMN 3 — RIGHT ROWS */}
            <div style={S.listColLast} className="ec-market-col-last">
              {rightPosts.map((post, i) =>
                renderRowItem(post, i, i === rightPosts.length - 1)
              )}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
            <Link
              href={`/category/${data[0]?.category?.slug || "market-news"}`}
              style={S.viewAll}
            >
              All Market News
            </Link>
          </div>
        </div>
      </section>

      <style jsx global>{`
        /* ─── Premium Market News Hover Micro-animations ─── */
        :global(.ec-market-main-card:hover) {
          background: #F5F2EE !important;
        }
        :global(.ec-market-main-card:hover .ec-market-main-img img) {
          transform: scale(1.04);
        }
        :global(.ec-market-main-card:hover .ec-market-main-cta) {
          color: #96010D !important;
          text-decoration: underline;
        }
        :global(.ec-market-card:hover) {
          background: #F5F2EE !important;
        }
        :global(.ec-market-card:hover .ec-market-card-img img) {
          transform: scale(1.04);
        }

        /* ─── Responsive Media Queries ─── */
        @media (max-width: 1024px) {
          :global(.ec-market-grid) {
            grid-template-columns: 1.2fr 1fr 1fr !important;
          }
        }
        @media (max-width: 768px) {
          :global(.ec-market-grid) {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            background: transparent !important;
            border: none !important;
          }
          :global(.ec-market-main-card) {
            border: 1px solid #E2DDD7 !important;
            border-right: 1px solid #E2DDD7 !important;
            margin-bottom: 8px;
          }
          :global(.ec-market-card) {
            border: 1px solid #E2DDD7 !important;
            border-bottom: 1px solid #E2DDD7 !important;
            margin-bottom: 8px;
          }
          :global(.ec-market-col-middle), :global(.ec-market-col-last) {
            border-right: none !important;
            background: transparent !important;
          }
        }
      `}</style>
    </>
  );
};

export default MarketNews;
