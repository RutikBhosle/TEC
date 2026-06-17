import Link from "next/link";
import React from "react";
import { client } from "../../client";
import { useQuery } from "@tanstack/react-query";
import Loader from "../common/Loader";

const getCategorySvg = (slug) => {
  const cleanSlug = slug?.toLowerCase() || "";
  if (cleanSlug.includes("news") || cleanSlug.includes("bulletin")) {
    return (
      <svg className="cat-grid-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
      </svg>
    );
  }
  if (cleanSlug.includes("magazine")) {
    return (
      <svg className="cat-grid-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    );
  }
  if (cleanSlug.includes("interview") || cleanSlug.includes("talk") || cleanSlug.includes("video")) {
    return (
      <svg className="cat-grid-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    );
  }
  if (cleanSlug.includes("strateg") || cleanSlug.includes("idea") || cleanSlug.includes("insight")) {
    return (
      <svg className="cat-grid-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
      </svg>
    );
  }
  if (cleanSlug.includes("case") || cleanSlug.includes("stud")) {
    return (
      <svg className="cat-grid-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    );
  }
  if (cleanSlug.includes("profile") || cleanSlug.includes("founder") || cleanSlug.includes("people") || cleanSlug.includes("author")) {
    return (
      <svg className="cat-grid-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    );
  }
  if (cleanSlug.includes("trend") || cleanSlug.includes("market") || cleanSlug.includes("growth")) {
    return (
      <svg className="cat-grid-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    );
  }
  if (cleanSlug.includes("blog") || cleanSlug.includes("article") || cleanSlug.includes("post")) {
    return (
      <svg className="cat-grid-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
      </svg>
    );
  }
  // Default general grid placeholder (newspaper style)
  return (
    <svg className="cat-grid-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
    </svg>
  );
};

const getCategoryDisplayName = (title, slug) => {
  const cleanSlug = slug?.toLowerCase() || "";
  const cleanTitle = title?.toLowerCase() || "";
  if (cleanSlug === "web-profiles" || cleanTitle === "web profiles") return "Featured Articles";
  if (cleanSlug === "market-news") return "Market Pulse";
  if (cleanSlug === "business-bulletin") return "The Briefing";
  if (cleanSlug === "master-talks") return "Executive Perspectives";
  if (cleanSlug === "magazines") return "Premium Editions";
  return title;
};

const WidgetCategory = ({ showTitle = true }) => {
  const {
    isLoading,
    isError,
    data: categoryData,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const fetchResult = await client.fetch(`*[_type == "category"]`);
      return fetchResult;
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <div className="category-error">An error occurred...</div>;

  return (
    <div className="category-widget mb-4">
      {showTitle && (
        <h4 className="section-title mb-3 category-title">Categories</h4>
      )}
      <div className="category-grid-wrapper">
        {categoryData?.map((data) => {
          if (data.slug?.current === "trusted-brands") return null;
          return (
            <Link
              key={data.slug?.current}
              className="cat-grid-item"
              href={
                data.slug?.current === "magazines"
                  ? "/magazines"
                  : `/category/${data.slug?.current}`
              }
            >
              <div className="cat-grid-thumb">
                <div className="cat-grid-placeholder">
                  {getCategorySvg(data.slug?.current)}
                </div>
              </div>
              <span className="cat-grid-name">
                {getCategoryDisplayName(data.title, data.slug?.current || data.slug)}
              </span>
            </Link>
          );
        })}
      </div>
      <style jsx>{`
        .category-widget {
          font-family: var(--secondary-font);
        }

        .category-title {
          color: var(--ink);
          font-family: var(--primary-font);
          font-size: var(--type-small);
          line-height: 1.35;
          margin-bottom: 1.25rem !important;
        }

        .category-grid-wrapper {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          row-gap: 2rem;
          column-gap: 1rem;
        }

        .cat-grid-item {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: var(--ink);
          transition: all 0.25s ease;
        }

        .cat-grid-thumb {
          position: relative;
          width: 100%;
          height: 75px;
          overflow: hidden;
          background: var(--warm-white);
          border: 1px solid var(--rule);
          margin-bottom: 0.5rem;
        }

        .cat-grid-placeholder {
          width: 100%;
          height: 100%;
          background: var(--slate-mid);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.25s ease;
        }

        .cat-grid-item:hover .cat-grid-placeholder {
          background-color: var(--cardinal);
        }

        :global(.cat-grid-svg) {
          width: 24px;
          height: 24px;
          color: var(--ink);
          transition: all 0.25s ease;
        }

        .cat-grid-item:hover :global(.cat-grid-svg) {
          color: #FFFFFF;
          transform: scale(1.1);
        }

        .cat-grid-name {
          font-family: var(--primary-font);
          font-size: 12px;
          font-weight: 700;
          line-height: 1.35;
          color: var(--ink);
          transition: color 0.25s ease;
          display: block;
          text-align: center;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cat-grid-item:hover .cat-grid-name {
          color: var(--cardinal);
        }

        .category-error {
          font-family: var(--secondary-font);
          font-size: 13px;
          color: var(--cardinal);
        }
      `}</style>
    </div>
  );
};

export default WidgetCategory;
