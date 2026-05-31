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
  description,
  'category': {
    'title': categories[0]->title,
    'slug': categories[0]->slug.current
  }
} | order(coalesce(publishedAt, _updatedAt) desc, _updatedAt desc)[0...7]
`;

  const { data, isLoading, error } = useQuery({
    queryKey: ["market-news-home-v5"],
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

  const mainPost = data[0];
  const middlePosts = data.slice(1, 4);
  const rightPosts = data.slice(4, 7);

  // ─── Inline style objects ────────────────────────────────────────────────────
  const S = {
    section: {
      background: "#F5F2EE",
      padding: "64px 0 56px",
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
      borderBottom: "2px solid #0F1923",
    },
    label: {
      display: "block",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "10px",
      fontWeight: 700,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: "#C1121F",
      marginBottom: "6px",
    },
    sectionTitle: {
      fontFamily: "'Playfair Display', serif",
      fontSize: "22px",
      fontWeight: 700,
      color: "#0F1923",
      letterSpacing: "-0.01em",
      margin: 0,
    },
    viewAll: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: "#C1121F",
      textDecoration: "none",
      borderBottom: "1px solid #C1121F",
      paddingBottom: "1px",
      whiteSpace: "nowrap",
    },
    // GRID
    grid: {
      display: "grid",
      gridTemplateColumns: "1.6fr 1fr 1fr",
      border: "1px solid #E2DDD7",
      background: "#fff",
    },
    // MAIN LEFT COLUMN
    mainLink: {
      display: "flex",
      flexDirection: "column",
      textDecoration: "none",
      color: "inherit",
      background: "#fff",
      borderRight: "1px solid #E2DDD7",
      cursor: "pointer",
    },
    mainImgWrapper: {
      width: "100%",
      height: "260px",
      overflow: "hidden",
      background: "#1A2535",
      flexShrink: 0,
    },
    mainImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    },
    mainBody: {
      padding: "22px 24px 24px 24px",
      flex: 1,
    },
    mainTag: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "9px",
      fontWeight: 700,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "#C1121F",
      marginBottom: "10px",
      display: "block",
    },
    mainTitle: {
      fontFamily: "'Playfair Display', serif",
      fontSize: "24px",
      fontWeight: 900,
      color: "#0F1923",
      lineHeight: 1.25,
      margin: "0 0 14px",
    },
    mainExcerpt: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "13.5px",
      color: "#6B6560",
      lineHeight: 1.7,
      margin: "0 0 18px",
      display: "-webkit-box",
      WebkitLineClamp: 4,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    },
    mainMeta: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "11px",
      color: "#9A9490",
    },
    // SECONDARY COLUMNS
    listCol: {
      display: "flex",
      flexDirection: "column",
      background: "#fff",
      borderRight: "1px solid #E2DDD7",
    },
    listColLast: {
      display: "flex",
      flexDirection: "column",
      background: "#fff",
    },
    // ROW ITEMS
    rowItem: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      alignItems: "flex-start",
      gap: "12px",
      padding: "12px 16px",
      borderBottom: "1px solid #E2DDD7",
      textDecoration: "none",
      color: "inherit",
      background: "#fff",
      cursor: "pointer",
      flex: 1,
      minHeight: 0,
    },
    rowItemLast: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      alignItems: "flex-start",
      gap: "12px",
      padding: "12px 16px",
      textDecoration: "none",
      color: "inherit",
      background: "#fff",
      cursor: "pointer",
      flex: 1,
      minHeight: 0,
    },
    thumb: {
      width: "68px",
      height: "56px",
      background: "#1A2535",
      flexShrink: 0,
      overflow: "hidden",
      marginTop: "2px",
    },
    thumbImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
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
      color: "#C1121F",
      marginBottom: "5px",
      display: "block",
    },
    rowTitle: {
      fontFamily: "'Libre Baskerville', serif",
      fontSize: "13.5px",
      fontWeight: 400,
      color: "#0F1923",
      lineHeight: 1.45,
      marginBottom: "8px",
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
      style={isLast ? S.rowItemLast : S.rowItem}
    >
      <div style={S.thumb}>
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
    <section style={S.section}>
      <div style={S.container}>
        {/* HEADER */}
        <div style={S.header}>
          <div>
            <span style={S.label}>Global Business Intelligence</span>
            <h2 style={S.sectionTitle}>Market News</h2>
          </div>
          <Link
            href={`/category/${data[0]?.category?.slug || "market-news"}`}
            style={S.viewAll}
          >
            All Market News
          </Link>
        </div>

        {/* GRID */}
        <div style={S.grid}>
          {/* COLUMN 1 — MAIN FEATURE */}
          {mainPost && (
            <Link href={`/post/${mainPost.slug?.current}`} style={S.mainLink}>
              <div style={S.mainImgWrapper}>
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
                {mainPost.description && (
                  <p style={S.mainExcerpt}>{mainPost.description}</p>
                )}
                <div style={S.mainMeta}>{formatDate(mainPost)} · 4 min read</div>
              </div>
            </Link>
          )}

          {/* COLUMN 2 — MIDDLE ROWS */}
          <div style={S.listCol}>
            {middlePosts.map((post, i) =>
              renderRowItem(post, i, i === middlePosts.length - 1)
            )}
          </div>

          {/* COLUMN 3 — RIGHT ROWS */}
          <div style={S.listColLast}>
            {rightPosts.map((post, i) =>
              renderRowItem(post, i, i === rightPosts.length - 1)
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketNews;
