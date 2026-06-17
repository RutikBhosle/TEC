import { Tab, Nav } from "react-bootstrap";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";

const WidgetPost = () => {
  const queryWebProfiles = `
*[_type == "post" && categories[0]._ref == *[_type == "category" && slug.current == "web-profiles"][0]._id] 
 {
    title,
    slug,
    'featureImg': mainImage.asset->url,
     'category': {
    'title': categories[0]->title,
    altText,
    'slug': categories[0]->slug.current,
    },
    publishedAt

} | order(publishedAt desc)[0...5] 
`;
  const { data: webProfileData } = useQuery({
    queryKey: ["web-profile"],
    queryFn: async () => {
      const response = await client.fetch(queryWebProfiles);
      return response;
    },
  });

  const queryMarketNews = `
*[
  _type == "post" &&
  "market-news" in categories[]->slug.current
]
 {
    title,
    slug,
    'featureImg': mainImage.asset->url,
     'category': {
    'title': categories[0]->title,
    altText,
    'slug': categories[0]->slug.current,
    },
    publishedAt,
    _updatedAt

} | order(coalesce(publishedAt, _updatedAt) desc, _updatedAt desc)[0...5]
`;
  const { data: marketNewsData } = useQuery({
    queryKey: ["market-news-widget"],
    queryFn: async () => {
      const response = await client.fetch(queryMarketNews);
      return response;
    },
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });

  const queryBusinessBulletins = `
*[
  _type == "post" &&
  "business-bulletin" in categories[]->slug.current
]
 {
    title,
    slug,
    'featureImg': mainImage.asset->url,
     'category': {
    'title': "The Briefing",
    altText,
    'slug': "business-bulletin",
    },
    publishedAt,
    _updatedAt

} | order(coalesce(publishedAt, _updatedAt) desc, _updatedAt desc)[0...5]
`;
  const { data: businessBulletinData } = useQuery({
    queryKey: ["business-bulletin-widget"],
    queryFn: async () => {
      const response = await client.fetch(queryBusinessBulletins);
      return response;
    },
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  const renderPostList = (posts, defaultCategory) => {
    if (!posts || posts.length === 0) {
      return <p className="widget-no-posts">No posts found.</p>;
    }
    return (
      <div className="widget-pane-content">
        {posts.slice(0, 4).map((data, index) => {
          const categoryName = data.category?.title || defaultCategory;
          const postSlug = data.slug?.current || data.slug;
          return (
            <Link
              key={postSlug || index}
              href={`/post/${postSlug}`}
              className="widget-post-row"
            >
              <div className="widget-post-thumb">
                {data.featureImg ? (
                  <img
                    src={data.featureImg}
                    alt={data.title}
                    className="widget-post-img"
                  />
                ) : (
                  <div className="widget-post-placeholder" />
                )}
              </div>
              <div className="widget-post-body">
                <span className="widget-post-category">{categoryName}</span>
                <h4 className="widget-post-title">{data.title}</h4>
                <span className="widget-post-date">{formatDate(data.publishedAt)}</span>
              </div>
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <div className="post-widget sidebar-post-widget">
      <Tab.Container id="widget-post" defaultActiveKey="recent">
        <Nav variant="pills" className="row no-gutters">
          <Nav.Item className="col">
            <Nav.Link eventKey="recent">Featured Articles</Nav.Link>
          </Nav.Item>
          <Nav.Item className="col">
            <Nav.Link eventKey="popular">Market Pulse</Nav.Link>
          </Nav.Item>
          <Nav.Item className="col">
            <Nav.Link eventKey="comments">The Briefing</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="recent">
            {renderPostList(webProfileData, "Featured Articles")}
          </Tab.Pane>
          <Tab.Pane eventKey="popular">
            {renderPostList(marketNewsData, "Market Pulse")}
          </Tab.Pane>
          <Tab.Pane eventKey="comments">
            {renderPostList(businessBulletinData, "The Briefing")}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      <style jsx>{`
        .sidebar-post-widget {
          background: #FAF8F5;
          border: 1px solid #E8E3DC;
          padding: 1.5rem;
          margin-bottom: 2rem;
          font-family: var(--secondary-font);
        }

        :global(.sidebar-post-widget .nav-pills) {
          display: flex;
          border-bottom: 1.5px solid #E8E3DC;
          margin-bottom: 1.5rem;
          padding-bottom: 0;
          gap: 0;
          justify-content: space-between;
          border-radius: 0;
        }

        :global(.sidebar-post-widget .nav-pills .nav-item) {
          flex: 1;
          text-align: center;
          margin: 0;
        }

        :global(.sidebar-post-widget .nav-pills .nav-item .nav-link) {
          display: block;
          font-family: var(--secondary-font);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(15, 25, 35, 0.45) !important;
          padding: 0.75rem 0.25rem !important;
          border-bottom: 2px solid transparent !important;
          margin-bottom: -1.5px;
          transition: all 0.25s ease;
          text-decoration: none;
          cursor: pointer;
          background: transparent !important;
          border-radius: 0 !important;
          border-top: none !important;
          border-left: none !important;
          border-right: none !important;
        }

        :global(.sidebar-post-widget .nav-pills .nav-item .nav-link:hover) {
          color: var(--cardinal) !important;
        }

        :global(.sidebar-post-widget .nav-pills .nav-item .nav-link.active) {
          color: var(--cardinal) !important;
          border-bottom-color: var(--cardinal) !important;
        }

        :global(.sidebar-post-widget .widget-pane-content) {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        :global(.sidebar-post-widget a.widget-post-row) {
          display: flex;
          align-items: flex-start;
          gap: 1.15rem;
          text-decoration: none !important;
          color: inherit;
          padding-bottom: 1.15rem;
          border-bottom: 1px solid rgba(15, 25, 35, 0.05);
          transition: all 0.2s ease;
        }

        :global(.sidebar-post-widget a.widget-post-row:last-child) {
          border-bottom: none;
          padding-bottom: 0;
          margin-bottom: 0;
        }

        :global(.sidebar-post-widget .widget-post-thumb) {
          position: relative;
          width: 90px;
          height: 60px;
          flex-shrink: 0;
          overflow: hidden;
          background: var(--warm-white);
          border: 1px solid rgba(15, 25, 35, 0.08);
          transition: all 0.25s ease;
        }

        :global(.sidebar-post-widget .widget-post-img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        :global(.sidebar-post-widget .widget-post-placeholder) {
          width: 100%;
          height: 100%;
          background: var(--slate-mid);
        }

        :global(.sidebar-post-widget .widget-post-body) {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        :global(.sidebar-post-widget .widget-post-category) {
          font-family: var(--secondary-font);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--cardinal);
          margin-bottom: 0.35rem;
          line-height: 1;
          display: block;
        }

        :global(.sidebar-post-widget .widget-post-title) {
          font-family: var(--primary-font);
          font-size: 13px;
          font-weight: 700;
          line-height: 1.4;
          color: var(--ink);
          margin: 0 0 0.4rem 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.2s ease;
        }

        :global(.sidebar-post-widget .widget-post-date) {
          font-family: var(--secondary-font);
          font-size: 10px;
          color: rgba(15, 25, 35, 0.45);
          line-height: 1;
          display: block;
        }

        :global(.sidebar-post-widget a.widget-post-row:hover) {
          text-decoration: none !important;
        }

        :global(.sidebar-post-widget a.widget-post-row:hover .widget-post-img) {
          transform: scale(1.08);
        }

        :global(.sidebar-post-widget a.widget-post-row:hover .widget-post-title) {
          color: var(--cardinal);
        }

        :global(.sidebar-post-widget a.widget-post-row:hover .widget-post-thumb) {
          border-color: rgba(122, 15, 35, 0.3);
        }

        :global(.sidebar-post-widget .tab-pane) {
          animation: widgetFadeIn 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        @keyframes widgetFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        :global(.sidebar-post-widget .widget-no-posts) {
          color: rgba(15, 25, 35, 0.5);
          font-size: 12px;
          text-align: center;
          padding: 1.5rem 0;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default WidgetPost;
