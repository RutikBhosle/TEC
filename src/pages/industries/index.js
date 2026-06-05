import HeadMeta from "../../components/elements/HeadMeta";
import HeaderOne from "../../components/header/HeaderOne";
import FooterTwo from "../../components/footer/FooterTwo";
import ScrollToTop from "../../components/common/ScrollToTop";
import IndustryCategories from "../../components/post/IndustryCategories";

const IndustriesIndex = () => {
  return (
    <div
      suppressHydrationWarning
      style={{
        background: "#FAF8F5",
        color: "#0f1923",
        minHeight: "100vh",
        fontFamily: "var(--font-sans, 'DM Sans', sans-serif)",
      }}
    >
      <HeadMeta
        metaTitle="Pioneering Sector Focus - Core Industry Categories | Star Prime"
        metaDesc="Explore specialised sector intelligence, enterprise profiles, and market research spanning our key global industry verticals."
      />
      <HeaderOne />
      <IndustryCategories />
      <FooterTwo />
      <ScrollToTop />
    </div>
  );
};

export default IndustriesIndex;
