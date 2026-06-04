import { Tab, Nav } from "react-bootstrap";
import PostVideoTwo from "../post/layout/PostVideoTwo";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";

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
    'title': "Business Bulletin",
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

  return (
    <div className="post-widget sidebar-post-widget">
      <Tab.Container id="widget-post" defaultActiveKey="recent">
        <Nav variant="pills" className="row no-gutters">
          <Nav.Item className="col">
            <Nav.Link eventKey="recent">Web Profiles</Nav.Link>
          </Nav.Item>
          <Nav.Item className="col">
            <Nav.Link eventKey="popular">Market News</Nav.Link>
          </Nav.Item>
          <Nav.Item className="col">
            <Nav.Link eventKey="comments">Business Bulletins</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="recent">
            {webProfileData && webProfileData?.length > 0 ? (
              webProfileData
                .slice(0, 4)
                .map((data, index) => (
                  <PostVideoTwo data={data} key={index} hideCategory />
                ))
            ) : (
              <p>No posts found.</p>
            )}
          </Tab.Pane>
          <Tab.Pane eventKey="popular">
            {marketNewsData && marketNewsData?.length > 0 ? (
              marketNewsData
                .slice(0, 4)
                .map((data, index) => (
                  <PostVideoTwo data={data} key={index} hideCategory />
                ))
            ) : (
              <p>No posts found.</p>
            )}
          </Tab.Pane>
          <Tab.Pane eventKey="comments">
            {businessBulletinData && businessBulletinData.length > 0 ? (
              businessBulletinData
                .slice(0, 4)
                .map((data, index) => (
                  <PostVideoTwo data={data} key={index} hideCategory />
                ))
            ) : (
              <p>No posts found.</p>
            )}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      <style jsx>{`
        :global(.sidebar-post-widget) {
          background: transparent;
          border: none;
          border-radius: 0;
          padding: 0;
          box-shadow: none;
          font-family: var(--secondary-font);
        }

        :global(.sidebar-post-widget .nav-pills) {
          border-color: var(--rule);
          margin-bottom: 1.25rem;
          gap: 8px;
        }

        :global(.sidebar-post-widget .nav-pills .nav-item a) {
          background: var(--warm-white);
          border: 1px solid var(--slate-dark);
          border-radius: 0;
          color: var(--text-muted);
          font-size: 11px;
          font-family: var(--secondary-font);
          letter-spacing: 0.05em;
          padding: 0.9rem 0.5rem;
          font-weight: 600;
          text-align: center;
        }

        :global(.sidebar-post-widget .nav-pills .nav-item a:hover),
        :global(.sidebar-post-widget .nav-pills .nav-item a.active) {
          background-color: var(--slate);
          border-color: var(--slate-dark);
          color: var(--cardinal);
        }

        :global(.sidebar-post-widget .tab-content) {
          border-top: 1px solid var(--rule);
          padding-top: 0.45rem;
        }

        :global(.sidebar-post-widget .post-block.post-block__small) {
          margin-bottom: 0.35rem;
          padding-bottom: 0.35rem;
          border-bottom: 1px solid var(--rule);
        }

        :global(.sidebar-post-widget .post-block.post-block__small:last-child) {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        :global(.sidebar-post-widget .post-block__on-dark-bg .axil-post-title a) {
          color: var(--ink);
        }

        :global(.sidebar-post-widget .post-block__on-dark-bg .axil-post-title a:hover) {
          color: var(--cardinal);
        }

        :global(.sidebar-post-widget .post-block.post-block__small .bg-color-blue-one) {
          color: var(--cardinal);
          background: transparent;
          border: none;
          padding: 0;
          font-size: 9px;
          font-family: var(--secondary-font);
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        :global(.sidebar-post-widget .post-block.post-block__small .axil-post-title) {
          font-size: var(--type-small);
          font-family: var(--primary-font);
          font-weight: 700;
          line-height: 1.45;
          margin-bottom: 0;
        }

        :global(.sidebar-post-widget .post-block.post-block__small .axil-post-title a) {
          font-family: var(--primary-font);
          color: var(--ink);
        }

        :global(.sidebar-post-widget .post-block.post-block__small .axil-post-title a:hover) {
          color: var(--cardinal);
        }

        :global(.sidebar-post-widget .post-block.post-block__small .media-body) {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        :global(.sidebar-post-widget .post-block.post-block__small .post-cat-group) {
          font-family: var(--secondary-font);
          margin-bottom: 4px;
        }

        :global(.sidebar-post-widget .tab-pane > p) {
          color: var(--text-muted);
          margin: 0.5rem 0;
          font-family: var(--secondary-font);
          font-size: var(--type-small);
        }
      `}</style>
    </div>
  );
};

export default WidgetPost;
