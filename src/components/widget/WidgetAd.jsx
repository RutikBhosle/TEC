import Image from "next/image";
import Link from "next/link";

const WidgetAd = ({ img, height, width }) => {
  if (!img) return null;
  return (
    <div className="add-block-widget m-b-xs-40">
      <Link href="#">
        <Image
          src={img}
          alt="sidebar Ad"
          width={width ?? 320}
          height={height ?? 287}
          className="img-fluid"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Link>
    </div>
  );
};

export default WidgetAd;
