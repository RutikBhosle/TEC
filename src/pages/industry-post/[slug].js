import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import HeaderOne from "../../components/header/HeaderOne";
import FooterTwo from "../../components/footer/FooterTwo";
import Loader from "../../components/common/Loader";
import HeadMetaDynamic from "../../components/elements/HeadMetaDynamic";
import DataErrorPlaceholder from "../../components/common/DataErrorPlaceholder";
import PostFormatText from "../../components/post/post-format/PostFormatText";
import { client } from "../../client";

const fetchIndustryPost = async (slug) => {
  const query = `*[_type == "industryPost" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    altText,
    keywords,
    slug,
    "featureImg": mainImage.asset->url,
    body,
    description,
    "industryCategory": industryCategory->{_id, title, slug}
  }`;
  return client.fetch(query, { slug });
};

const IndustryPostDetails = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["industryPost", slug],
    queryFn: () => fetchIndustryPost(slug),
    enabled: !!slug,
  });

  if (isLoading) return <Loader />;
  if (error) {
    return (
      <div>
        <HeaderOne />
        <div className="container py-5" style={{ background: "#FAF8F5", minHeight: "50vh", display: "flex", alignItems: "center" }}>
          <DataErrorPlaceholder section="Industry Post Details" refetch={refetch} />
        </div>
        <FooterTwo />
      </div>
    );
  }
  if (!data) return <div>No data found</div>;

  return (
    <>
      <HeadMetaDynamic metaData={data} />
      <HeaderOne />
      <PostFormatText postData={data} />
      <FooterTwo />
    </>
  );
};

export default IndustryPostDetails;
