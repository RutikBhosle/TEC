import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import FooterTwo from "../../components/footer/FooterTwo";
import DataErrorPlaceholder from "../../components/common/DataErrorPlaceholder";
import HeaderOne from "../../components/header/HeaderOne";
import HeadMeta from "../../components/elements/HeadMeta";
import WidgetAd from "../../components/widget/WidgetAd";
import WidgetSocialShare from "../../components/widget/WidgetSocialShare";
import WidgetPost from "../../components/widget/WidgetPost";
import WidgetCategory from "../../components/widget/WidgetCategory";
import { client } from "../../client";
import Loader from "../../components/common/Loader";
import { useState, useEffect } from "react";

const POSTS_PER_PAGE = 6;

const fetchPostsByCategory = async (category, page) => {
  const query = `*[_type == "post" && categories[0]._ref == *[_type == "category" && slug.current == "${category}"][0]._id] {
    title,
    slug,
    altText,
    'featureImg': mainImage.asset->url,
    publishedAt,
    _updatedAt,
    _createdAt,
    description,
    'category': {
      'title': categories[0]->title,
      'slug': categories[0]->slug.current
    }
  } | order(publishedAt desc)[${page * POSTS_PER_PAGE}...${(page + 1) * POSTS_PER_PAGE}]`;

  const posts = await client.fetch(query);
  return posts;
};

const fetchTotalPostsCount = async (category) => {
  const query = `count(*[_type == "post" && categories[0]._ref == *[_type == "category" && slug.current == "${category}"][0]._id])`;
  const count = await client.fetch(query);
  return count;
};

const PostCategory = ({ initialCategory, initialAllPosts }) => {
  const [page, setPage] = useState(0);

  const {
    data: postData,
    isLoading,
    error,
    refetch,
    isPreviousData,
  } = useQuery({
    queryKey: ["postData", initialCategory, page],
    queryFn: () => fetchPostsByCategory(initialCategory, page),
    keepPreviousData: true,
  });

  const { data: allPosts } = useQuery({
    queryKey: ["allPosts"],
    queryFn: () => fetchPostsByCategory(initialCategory, 0),
    initialData: initialAllPosts,
  });

  const { data: totalPosts } = useQuery({
    queryKey: ["totalPosts", initialCategory],
    queryFn: () => fetchTotalPostsCount(initialCategory),
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const totalPages = totalPosts ? Math.ceil(totalPosts / POSTS_PER_PAGE) : 1;

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const getCategoryTitleFallback = (slug) => {
    if (!slug) return "Category";
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatDate = (post) => {
    const d = post.publishedAt || post._updatedAt || post._createdAt;
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

  if (error) {
    return (
      <div>
        <HeadMeta metaTitle="Error" />
        <HeaderOne />
        <div className="container py-5" style={{ background: "#FAF8F5", minHeight: "50vh", display: "flex", alignItems: "center" }}>
          <DataErrorPlaceholder section="Category Posts" refetch={refetch} />
        </div>
        <FooterTwo />
      </div>
    );
  }

  if (isLoading || !postData) {
    return <Loader />;
  }

  const cateContent = postData[0];
  const categoryTitle = cateContent?.category?.title || getCategoryTitleFallback(initialCategory);

  return (
    <div style={{ background: "#FAF8F5", color: "#0f1923", minHeight: "100vh" }}>
      <HeadMeta metaTitle={categoryTitle} />
      <HeaderOne />

      <main className="ec-category-section">
        <div className="ec-category-container">
          
          {/* Section Header */}
          <div className="ec-section-header">
            <div>
              <div className="ec-section-label">Category Archive</div>
              <h1 className="ec-section-title">{categoryTitle}</h1>
            </div>
          </div>

          <div className="row">
            {/* Left side: list of posts */}
            <div className="col-lg-8">
              <div className="ec-cat-posts-list">
                {postData.length > 0 ? (
                  postData.map((data, index) => (
                    <Link
                      key={data.slug?.current || index}
                      href={`/post/${data.slug?.current}`}
                      className="ec-cat-card"
                    >
                      <div className="ec-cat-card-img-wrapper">
                        {data.featureImg ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={data.featureImg}
                            alt={data.altText || data.title}
                            className="ec-cat-card-img"
                          />
                        ) : (
                          <div className="ec-cat-card-placeholder" />
                        )}
                      </div>
                      <div className="ec-cat-card-content">
                        <span className="ec-cat-card-tag">{data.category?.title || categoryTitle}</span>
                        <h3 className="ec-cat-card-title">{data.title}</h3>
                        {data.description && (
                          <p className="ec-cat-card-excerpt">
                            {data.description.length > 160
                              ? `${data.description.slice(0, 157).trimEnd()}...`
                              : data.description}
                          </p>
                        )}
                        <div className="ec-cat-card-date">{formatDate(data)}</div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="py-5 text-center" style={{ fontFamily: "var(--secondary-font)", color: "var(--text-muted)" }}>
                    No articles found in this category.
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="ec-pagination">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageClick(pageNumber - 1)}
                      disabled={isPreviousData && page === pageNumber - 1}
                      className={`ec-pagination-btn ${page === pageNumber - 1 ? "active" : ""}`}
                    >
                      <span>{pageNumber}</span>
                      <span className="ec-pagination-underline"></span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right side: Sidebar */}
            <div className="col-lg-4">
              <div className="post-sidebar">
                <WidgetAd />
                <WidgetSocialShare />
                <WidgetCategory />
                <WidgetPost dataPost={allPosts} />
                <WidgetAd
                  img="/images/clientbanner/clientbanner3.jpg"
                  height={492}
                  width={320}
                />
              </div>
            </div>
          </div>

        </div>
      </main>
      
      <FooterTwo />

      <style jsx global>{`
        /* Hide default breadcrumb on category pages */
        .breadcrumb {
          display: none !important;
        }

        .ec-category-section {
          background: #FAF8F5;
          padding: 36px 0 64px;
        }

        .ec-category-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .ec-section-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 36px;
          padding-bottom: 12px;
          border-bottom: 2px solid #0f1923;
        }

        .ec-section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #7A0F23;
          margin-bottom: 6px;
        }

        .ec-section-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #0f1923;
          letter-spacing: -0.01em;
          margin: 0;
        }

        /* POST CARDS */
        .ec-cat-posts-list {
          display: flex;
          flex-direction: column;
        }

        .ec-cat-card {
          display: flex;
          gap: 28px;
          padding: 28px 0;
          border-bottom: 1px solid #E2DDD7;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .ec-cat-card:first-child {
          padding-top: 0;
        }

        .ec-cat-card:last-child {
          border-bottom: none;
        }

        .ec-cat-card:hover {
          background-color: #FAF8F5;
          padding-left: 12px;
          padding-right: 12px;
          margin-left: -12px;
          margin-right: -12px;
        }

        .ec-cat-card-img-wrapper {
          width: 240px;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #1A2535;
          flex-shrink: 0;
          border-radius: 4px;
        }

        .ec-cat-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ec-cat-card:hover .ec-cat-card-img {
          transform: scale(1.04);
        }

        .ec-cat-card-placeholder {
          width: 100%;
          height: 100%;
          background: #1A2535;
        }

        .ec-cat-card-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .ec-cat-card-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 8.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #7A0F23;
          margin-bottom: 8px;
          display: block;
        }

        .ec-cat-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          color: #0f1923;
          line-height: 1.35;
          margin: 0 0 10px;
          transition: color 0.25s ease;
        }

        .ec-cat-card:hover .ec-cat-card-title {
          color: #7A0F23;
        }

        .ec-cat-card-excerpt {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #6B6560;
          line-height: 1.6;
          margin: 0 0 12px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .ec-cat-card-date {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: #9A9490;
          margin-top: auto;
        }

        /* PAGINATION */
        .ec-pagination {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 48px;
          align-items: center;
        }

        .ec-pagination-btn {
          background: transparent;
          border: none;
          padding: 8px 12px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #5E6876;
          position: relative;
          transition: color 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .ec-pagination-btn:hover {
          color: #7A0F23;
        }

        .ec-pagination-btn.active {
          color: #0f1923;
          font-weight: 700;
        }

        .ec-pagination-underline {
          display: block;
          margin-top: 6px;
          width: 0;
          height: 3px;
          background-color: #7A0F23;
          transition: width 0.25s ease;
        }

        .ec-pagination-btn:hover .ec-pagination-underline {
          width: 16px;
        }

        .ec-pagination-btn.active .ec-pagination-underline {
          width: 24px;
          background-color: #0f1923;
        }

        /* SIDEBAR SPACING */
        .post-sidebar {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .ec-category-container {
            padding: 0 24px;
          }
        }

        @media (max-width: 768px) {
          .ec-category-section {
            padding: 24px 0 48px;
          }
          .ec-category-container {
            padding: 0 18px;
          }
          .ec-cat-card {
            flex-direction: column;
            gap: 16px;
            padding: 24px 0;
          }
          .ec-cat-card:hover {
            padding-left: 0;
            padding-right: 0;
            margin-left: 0;
            margin-right: 0;
            background-color: transparent;
          }
          .ec-cat-card-img-wrapper {
            width: 100%;
            aspect-ratio: 16 / 9;
          }
        }
      `}</style>
    </div>
  );
};

export default PostCategory;

export const getStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();
  const category = params.slug;

  await queryClient.prefetchQuery({
    queryKey: ["postData", category, 0],
    queryFn: () => fetchPostsByCategory(category, 0),
  });
  await queryClient.prefetchQuery({
    queryKey: ["allPosts"],
    queryFn: () => fetchPostsByCategory(category, 0),
  });

  return {
    props: {
      initialCategory: category,
      initialAllPosts: dehydrate(queryClient),
    },
  };
};

export const getStaticPaths = async () => {
  const query = `*[_type == "category"]`;
  const categories = await client.fetch(query);

  const paths = (categories || [])
    .map((category) => category?.slug?.current)
    .filter(Boolean)
    .map((slug) => ({ params: { slug } }));

  return { paths, fallback: "blocking" };
};
