import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../../client";
// import WidgetAd from "../../widget/WidgetAd";
import SharedSidebarWidgets from "../../widget/SharedSidebarWidgets";
import { RichTextComponent } from "../RichTextComponent";
import PostComment from "./elements/PostComment";
import SocialShareBottom from "./elements/SocialShareBottom";
import SocialShareSide from "./elements/SocialShareSide";
import { PortableText } from "@portabletext/react";

const toPlainText = (blocks = []) => {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return "";
      }
      return block.children.map((child) => child.text).join("");
    })
    .filter(Boolean)
    .join("\n\n");
};

const RelatedSidebarPosts = ({ postData }) => {
  const currentId = postData?._id;
  const type = postData?._type || "post";
  
  const categoryId = type === "post"
    ? postData?.categories?.[0]?._id
    : postData?.industryCategory?._id;

  const categoryName = type === "post"
    ? postData?.categories?.[0]?.title
    : postData?.industryCategory?.title;

  let query = "";
  let params = { currentId };

  if (type === "industryPost") {
    if (categoryId) {
      query = `*[_type == "industryPost" && industryCategory._ref == $categoryId && _id != $currentId] | order(coalesce(publishedAt, _createdAt) desc) {
        _id,
        title,
        slug,
        'featureImg': mainImage.asset->url,
        publishedAt,
        _createdAt,
        description,
        body,
        'category': industryCategory->{title, slug}
      }`;
      params.categoryId = categoryId;
    } else {
      query = `*[_type == "industryPost" && _id != $currentId] | order(coalesce(publishedAt, _createdAt) desc) {
        _id,
        title,
        slug,
        'featureImg': mainImage.asset->url,
        publishedAt,
        _createdAt,
        description,
        body
      }`;
    }
  } else {
    if (categoryId) {
      query = `*[_type == "post" && references($categoryId) && _id != $currentId] | order(coalesce(publishedAt, _createdAt) desc) {
        _id,
        title,
        slug,
        'featureImg': mainImage.asset->url,
        publishedAt,
        _createdAt,
        description,
        body,
        'category': categories[0]->{title, slug}
      }`;
      params.categoryId = categoryId;
    } else {
      query = `*[_type == "post" && _id != $currentId] | order(coalesce(publishedAt, _createdAt) desc) {
        _id,
        title,
        slug,
        'featureImg': mainImage.asset->url,
        publishedAt,
        _createdAt,
        description,
        body
      }`;
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: ["related-sidebar-posts", currentId, categoryId],
    queryFn: async () => {
      if (!query) return [];
      return await client.fetch(query, params);
    },
    enabled: !!currentId,
  });

  const [maxCount, setMaxCount] = useState(1);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const calculateCount = () => {
      if (typeof window !== "undefined" && window.innerWidth < 992) {
        setMaxCount(3);
        return;
      }

      const articleEl = document.querySelector('.post-details');
      const widgetsEl = document.querySelector('.shared-sidebar-panel');
      const containerEl = document.querySelector('.related-cards-stack');
      const firstCard = containerEl?.querySelector('.related-sidebar-card');
      const commentBtn = document.querySelector('.post-comment-area button');
      
      if (articleEl && widgetsEl) {
        let limitBottom = articleEl.getBoundingClientRect().bottom + window.scrollY;
        if (commentBtn) {
          limitBottom = commentBtn.getBoundingClientRect().bottom + window.scrollY;
        } else {
          const commentArea = document.querySelector('.post-comment-area');
          if (commentArea) {
            limitBottom = commentArea.getBoundingClientRect().bottom + window.scrollY;
          }
        }

        // 24px margin top / gap
        const containerTop = widgetsEl.getBoundingClientRect().bottom + window.scrollY + 24;
        const availableHeight = limitBottom - containerTop;
        
        const gap = 24;
        let cardHeight = 360; // default/fallback estimate
        if (firstCard) {
          const rect = firstCard.getBoundingClientRect();
          if (rect.height > 100) {
            cardHeight = rect.height;
          }
        }

        const calculated = Math.floor((availableHeight + gap) / (cardHeight + gap));
        setMaxCount(Math.max(0, calculated));
      }
    };

    calculateCount();
    
    // Set timeouts to account for layout shifts and lazy loaded images
    const timer = setTimeout(calculateCount, 600);
    const timerLong = setTimeout(calculateCount, 1500);

    window.addEventListener('resize', calculateCount);
    return () => {
      clearTimeout(timer);
      clearTimeout(timerLong);
      window.removeEventListener('resize', calculateCount);
    };
  }, [data]);

  if (isLoading) return <div className="text-center py-3" style={{ fontSize: "12px", color: "var(--text-muted)" }}>Loading...</div>;
  if (!data || data.length === 0 || maxCount <= 0) return null;

  return (
    <div className="related-sidebar-posts">
      <h4 className="section-title" style={{ fontSize: "14px", fontWeight: "700", borderBottom: "2px solid var(--ink, #0f1923)", paddingBottom: "8px", marginBottom: "16px", color: "var(--ink)" }}>
        Related {categoryName || "Stories"}
      </h4>
      <div className="related-cards-stack" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {data.slice(0, maxCount).map((post) => {
          const dateStr = post.publishedAt || post._createdAt;
          let formattedDate = "";
          if (dateStr) {
            try {
              formattedDate = new Date(dateStr)
                .toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                .toUpperCase();
            } catch (e) {
              formattedDate = "";
            }
          }

          let excerpt = post.description || "";
          if (!excerpt && post.body) {
            excerpt = toPlainText(post.body);
          }
          if (excerpt) {
            excerpt = excerpt.length > 120 ? excerpt.substring(0, 120) + "..." : excerpt;
          }

          const categoryTitle = post.category?.title || (type === "industryPost" ? "Industry" : "Market Pulse");

          return (
            <Link
              key={post._id}
              href={type === "industryPost" ? `/industry-post/${post.slug?.current}` : `/post/${post.slug?.current}`}
              className="related-sidebar-card"
            >
              <div className="related-card-img-wrapper" style={{ width: "100%", aspectRatio: "16 / 9", overflow: "hidden", background: "#1A2535" }}>
                {post.featureImg ? (
                  <img
                    src={post.featureImg}
                    alt={post.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease" }}
                    className="related-card-img"
                  />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: "#1A2535" }} />
                )}
              </div>
              <div className="related-card-body" style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <span className="related-card-tag" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: "700", letterSpacing: "0.15em", textTransform: "uppercase", color: "#b38a58" }}>
                  {categoryTitle}
                </span>
                <div className="related-sidebar-title" style={{ fontSize: "15px", lineHeight: "1.35", fontWeight: "700", fontFamily: "'Playfair Display', serif", color: "var(--ink)", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {post.title}
                </div>
                {excerpt && (
                  <p className="related-card-excerpt" style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: "12.5px", lineHeight: "1.6", color: "#5A544F", margin: 0 }}>
                    {excerpt}
                  </p>
                )}
                {formattedDate && (
                  <div className="related-card-date" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: "700", color: "#9A9490", marginTop: "4px" }}>
                    {formattedDate}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const PostFormatText = ({ postData, allData }) => {
  return (
    <>
      <div className="post-single-wrapper p-t-xs-60 post-detail-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <main className="site-main">
                <article className="post-details">
                  <div className="single-blog-wrapper">
                    <SocialShareSide />
                    <h2 className="axil-post-title hover-line">
                      {postData?.title}
                    </h2>
                    {postData?.description && (
                      <p className="axil-post-subtitle">
                        {postData.description}
                      </p>
                    )}
                  </div>

                  <Image
                    className="mb-4 w-full h-auto object-cover"
                    src={postData?.featureImg || "/images/placeholder.png"}
                    alt={postData?.altText || postData?.title}
                    width={500}
                    height={300}
                    sizes="(max-width: 768px) 100vw, 700px"
                    style={{ width: "100%", height: "auto" }}
                  />

                  <div className="rich-text-content">
                    <PortableText
                      value={postData?.body}
                      components={RichTextComponent}
                    />
                  </div>
                </article>
                <SocialShareBottom />
                <hr className="m-t-xs-50 m-b-xs-60" />

                <PostComment />
              </main>
            </div>
            <div className="col-lg-3">
              <SharedSidebarWidgets className="post-sidebar" />
              <div className="post-sidebar related-posts-widget mt-4">
                <RelatedSidebarPosts postData={postData} />
              </div>
            </div>
          </div>
        </div>
        <style jsx global>{`
          .post-detail-page {
            background: var(--warm-white);
            color: var(--text-body);
            font-family: var(--secondary-font);
          }

          .post-detail-page > .container {
            max-width: 1400px;
            padding-left: 16px !important;
            padding-right: 16px !important;
          }

          .post-detail-page > .container > .row {
            margin-left: -8px;
            margin-right: -8px;
          }

          .post-detail-page > .container > .row > [class*="col-"] {
            padding-left: 8px;
            padding-right: 8px;
          }

          .post-detail-page .post-details {
            background: transparent;
            border: none;
            border-radius: 0;
            padding: 1.1rem;
          }

          .post-detail-page .single-blog-wrapper {
            max-width: 100%;
            margin: 0 0 2.5rem 0;
            position: relative;
          }

          .post-detail-page .single-blog-wrapper .axil-post-title {
            color: var(--ink);
            font-size: clamp(30px, 4.5vw, 40px);
            font-family: var(--primary-font);
            font-weight: 800;
            line-height: 1.15;
            letter-spacing: -0.025em;
            margin-bottom: 1.25rem;
          }

          .post-detail-page .single-blog-wrapper .axil-post-title a {
            color: inherit;
          }

          .post-detail-page .single-blog-wrapper .axil-post-title a:hover {
            color: var(--cardinal);
          }

          .post-detail-page .single-blog-wrapper .axil-post-subtitle {
            font-family: var(--secondary-font);
            font-size: clamp(15px, 1.6vw, 18px);
            line-height: 1.6;
            color: var(--text-muted);
            margin-bottom: 0;
            font-weight: 400;
          }

          .post-detail-page .post-details img,
          .post-detail-page .post-details > span img,
          .post-detail-page .post-details img.mb-4 {
            border-radius: 0 !important;
            margin-bottom: 3rem !important;
          }

          .post-detail-page .rich-text-content {
            max-width: 100%;
            margin: 2.5rem 0 0 0;
          }

          .post-detail-page .rich-text-content p,
          .post-detail-page .rich-text-content li {
            color: #2C2C2C;
            font-size: 16px;
            font-family: var(--tertiary-font), Georgia, serif;
            line-height: 1.8;
            margin-bottom: 1.5rem;
          }

          /* Editorial drop cap and lead paragraph */
          .post-detail-page .rich-text-content > p:first-of-type {
            font-size: 16px;
            line-height: 1.8;
            color: #2C2C2C;
            font-family: var(--tertiary-font), Georgia, serif;
            margin-bottom: 1.5rem;
            display: flow-root;
          }

          .post-detail-page .rich-text-content > p:first-of-type::first-letter {
            font-size: 3.2em;
            line-height: 0.85;
            margin-right: 0.05em;
            font-weight: 800;
            color: var(--cardinal, #7A0F23);
            font-family: var(--primary-font), serif;
            display: inline-block;
            vertical-align: baseline;
          }

          /* Fallback general post details paragraphs */
          .post-detail-page .post-details p,
          .post-detail-page .post-details li {
            color: #2C2C2C;
            font-size: 16px;
            font-family: var(--tertiary-font), Georgia, serif;
            line-height: 1.75;
            margin-bottom: 1.25rem;
          }

          .post-detail-page .rich-text-content blockquote {
            background: #F8F6F2;
            border-left: 4px solid var(--cardinal);
            border-radius: 0;
            padding: 2rem 2.5rem;
            margin: 2.5rem 0;
          }

          .post-detail-page .rich-text-content blockquote p {
            font-family: var(--tertiary-font);
            font-style: italic;
            font-size: 1.2rem;
            color: var(--ink);
            line-height: 1.7;
            margin-bottom: 0;
          }

          /* List blocks styling overrides */
          .post-detail-page .rich-text-content ul,
          .post-detail-page .rich-text-content ol {
            margin-bottom: 1.75rem !important;
            padding-left: 2rem !important;
            display: block !important;
          }

          .post-detail-page .rich-text-content li {
            margin-bottom: 0.6rem !important;
            line-height: 1.75 !important;
            list-style: inherit !important;
            display: list-item !important;
          }

          .post-detail-page .post-details a:not(.btn) {
            color: var(--cardinal);
            text-decoration: underline;
          }

          .post-detail-page .post-details a:not(.btn):hover {
            color: var(--cardinal-dark);
          }

          .post-detail-page .post-details strong {
            color: var(--ink);
          }

          .post-detail-page .post-shares .title {
            color: var(--text-muted);
            font-size: var(--type-small);
            font-family: var(--secondary-font);
            letter-spacing: 0.06em;
          }

          .post-detail-page .post-shares {
            margin-top: 2.4rem !important;
            margin-bottom: 0 !important;
          }

          .post-detail-page .post-shares li a {
            border-radius: 0;
            width: 38px;
            height: 38px;
            min-width: 38px;
            padding: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .post-detail-page .post-shares li a.bg-color-facebook {
            background: var(--ink) !important;
          }
          .post-detail-page .post-shares li a.bg-color-facebook:hover {
            background: var(--cardinal) !important;
          }

          .post-detail-page .post-shares li a.bg-color-linkedin {
            background: var(--ink) !important;
          }
          .post-detail-page .post-shares li a.bg-color-linkedin:hover {
            background: var(--cardinal) !important;
          }

          .post-detail-page .post-shares li a i {
            display: block;
            line-height: 1;
            margin: 0;
            transform: translateY(0);
            font-size: 1.7rem;
            color: #fff;
          }

          .post-detail-page hr {
            border-color: var(--rule);
            margin-top: 1.6rem !important;
            margin-bottom: 2rem !important;
          }

          .post-detail-page .post-sidebar > * {
            background: var(--slate);
            border: 1px solid var(--rule);
            border-radius: 0;
            padding: 24px;
          }

          .post-detail-page .related-posts-widget.post-sidebar > * {
            background: transparent;
            border: none;
            padding: 0;
          }

          .post-detail-page .related-sidebar-card {
            background: #fff;
            border: 1px solid #E8E3DC;
            display: flex;
            flex-direction: column;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            border-radius: 0;
            overflow: hidden;
          }

          .post-detail-page .related-sidebar-card:hover {
            border-color: #7A0F23;
            box-shadow: 0 8px 16px rgba(122, 15, 35, 0.06);
            color: inherit !important;
          }

          .post-detail-page .related-sidebar-card:hover .related-sidebar-title {
            color: var(--cardinal, #7A0F23) !important;
          }

          .post-detail-page .related-sidebar-card:hover .related-card-img {
            transform: scale(1.04);
          }

          .post-detail-page .post-sidebar .shared-sidebar-panel {
            gap: 0.7rem;
          }

          .post-detail-page .post-sidebar .section-title {
            font-size: var(--type-small) !important;
            line-height: 1.35 !important;
            margin-bottom: 0.8rem !important;
          }

          .post-detail-page .post-sidebar .post-widget .media.post-block {
            padding: 0 !important;
          }

          .post-detail-page .post-sidebar .post-widget .axil-post-title {
            font-size: 13px !important;
            line-height: 1.45 !important;
          }

          .post-detail-page .post-sidebar .post-widget img {
            max-width: 8.2rem !important;
          }

          .post-detail-page .post-sidebar .sidebar-post-widget .nav-pills {
            gap: 6px !important;
            margin-bottom: 0.9rem !important;
          }

          .post-detail-page .post-sidebar .sidebar-post-widget .nav-pills .nav-item a {
            font-size: 10px !important;
            padding: 0.65rem 0.35rem !important;
            border-radius: 0 !important;
          }

          .post-detail-page .post-sidebar .sidebar-post-widget .tab-content {
            padding-top: 0.35rem !important;
          }

          .post-detail-page .post-sidebar .sidebar-post-widget .post-block.post-block__small {
            margin-bottom: 0.2rem !important;
            padding-bottom: 0.2rem !important;
          }

          .post-detail-page .post-sidebar .sidebar-post-widget .post-block.post-block__small > a,
          .post-detail-page .post-sidebar .sidebar-post-widget .post-block.post-block__small figure > a {
            margin-right: 1rem !important;
          }

          .post-detail-page .post-sidebar .sidebar-post-widget .post-block.post-block__small .media-body {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
          }

          .post-detail-page .post-sidebar .category-widget .category-title {
            font-size: var(--type-small) !important;
            line-height: 4 !important;
            color: var(--ink) !important;
            font-family: var(--primary-font) !important;
            margin-bottom: 0 !important;
          }

          .post-detail-page .post-sidebar .newsletter-widget .axil-title,
          .post-detail-page .post-sidebar .newsletter-widget h3 {
            font-size: var(--type-small) !important;
            line-height: 1.35 !important;
          }

          .post-detail-page .post-sidebar .newsletter-widget p,
          .post-detail-page .post-sidebar .newsletter-widget input,
          .post-detail-page .post-sidebar .newsletter-widget button,
          .post-detail-page .post-sidebar .category-widget li,
          .post-detail-page .post-sidebar .widget-social-share a {
            font-size: 12px !important;
          }

          .post-detail-page .post-sidebar .category-widget .single-cat {
            padding: 8px !important;
          }

          .post-detail-page .post-sidebar .category-widget .single-cat .inner {
            padding: 8px !important;
          }

          .post-detail-page .post-sidebar .category-widget .cat-content {
            padding: 8px 10px !important;
          }

          .post-detail-page .post-sidebar .category-widget .cat-content .cat-title,
          .post-detail-page .post-sidebar .category-widget .cat-content h4,
          .post-detail-page .post-sidebar .category-widget .cat-content a {
            font-size: 12px !important;
            line-height: 1.35 !important;
          }



          @media (max-width: 991px) {
            .post-detail-page > .container {
              padding-left: 12px !important;
              padding-right: 12px !important;
            }

            .post-detail-page > .container > .row {
              margin-left: -6px;
              margin-right: -6px;
            }

            .post-detail-page > .container > .row > [class*="col-"] {
              padding-left: 6px;
              padding-right: 6px;
            }

            .post-detail-page .post-details {
              padding: 0.9rem;
            }

            .post-detail-page .post-details p,
            .post-detail-page .post-details li,
            .post-detail-page .rich-text-content p,
            .post-detail-page .rich-text-content li {
              font-size: 15px;
              line-height: 1.7;
            }

            .post-detail-page .rich-text-content > p:first-of-type {
              font-size: 15px;
              line-height: 1.7;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default PostFormatText;
