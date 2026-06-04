import Image from "next/image";
import WidgetAd from "../../widget/WidgetAd";
import WidgetInstagram from "../../widget/WidgetInstagram";
import WidgetNewsletter from "../../widget/WidgetNewsletter";
import WidgetPost from "../../widget/WidgetPost";
import WidgetSocialShare from "../../widget/WidgetSocialShare";
import { RichTextComponent } from "../RichTextComponent";
import SocialShareBottom from "./elements/SocialShareBottom";
import SocialShareSide from "./elements/SocialShareSide";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

const VideoDetailLayout = ({ videoData, allVideos }) => {
  // Extract YouTube video ID from the URL
  const videoId = videoData.videoUrl.includes("watch?v=")
    ? videoData.videoUrl.split("v=")[1]
    : videoData.videoUrl.split("/").pop();

  // Construct the iframe URL using the extracted video ID
  const iframeUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <>
      <div className="video-detail-wrapper video-detail-page-wrapper p-t-xs-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <main className="site-main">
                <article className="video-details">
                  <div className="single-video-wrapper">
                    <SocialShareSide />
                    <h2 className="axil-post-title hover-line">
                      {videoData?.title}
                    </h2>
                  </div>

                  <div
                    className="embed-responsive w-100 mb-4"
                    style={{ position: "relative", paddingBottom: "56.25%" }}
                  >
                    <iframe
                      src={iframeUrl}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={videoData.title}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                    ></iframe>
                  </div>

                  <div className="rich-text-content">
                    <PortableText
                      value={videoData?.body}
                      components={RichTextComponent}
                    />
                  </div>
                </article>
                <SocialShareBottom />
                <hr className="m-t-xs-50 m-b-xs-60" />

                {/* Related Videos */}
                <div className="related-videos mb-4">
                  <h4 className="mb-3">Related Videos</h4>
                  <div className="list-group">
                    {allVideos.map((relatedVideo) => {
                      // Extract YouTube video ID from the URL
                      const relatedVideoId = relatedVideo.videoUrl.includes(
                        "watch?v="
                      )
                        ? relatedVideo.videoUrl.split("v=")[1]
                        : relatedVideo.videoUrl.split("/").pop();

                      // Construct the thumbnail URL using the extracted video ID
                      const relatedThumbnailUrl = `https://img.youtube.com/vi/${relatedVideoId}/hqdefault.jpg`;

                      return (
                        <Link
                          key={relatedVideo._id}
                          href={`/video/${relatedVideo.slug}`}
                          className="list-group-item list-group-item-action d-flex align-items-center gap-3 p-2 border-0 mb-3 related-video-item"
                        >
                          <Image
                            src={relatedThumbnailUrl}
                            alt={relatedVideo.title}
                            width={100}
                            height={95}
                            style={{ objectFit: "cover" }}
                          />
                          <span
                            className="fw-bold text-truncate"
                            style={{ maxWidth: "80%" }}
                          >
                            {relatedVideo.title}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </main>
            </div>
            <div className="col-lg-4">
              <div className="video-sidebar">
                <WidgetNewsletter />
                <WidgetSocialShare />
                <WidgetPost dataPost={allVideos} />
                {/* <WidgetInstagram /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .video-detail-page-wrapper {
          background: var(--warm-white);
          color: var(--text-body);
          font-family: var(--secondary-font);
        }

        .video-detail-page-wrapper .video-details {
          background: transparent;
          border: none;
          border-radius: 0;
          padding: 1.1rem;
        }

        .video-detail-page-wrapper .single-video-wrapper .axil-post-title {
          color: var(--ink);
          font-size: clamp(28px, 4.5vw, 42px);
          font-family: var(--primary-font);
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 1.5rem;
        }

        .video-detail-page-wrapper .single-video-wrapper .axil-post-title a {
          color: inherit;
        }

        .video-detail-page-wrapper .single-video-wrapper .axil-post-title a:hover {
          color: var(--cardinal);
        }

        .video-detail-page-wrapper .rich-text-content,
        .video-detail-page-wrapper .video-details p,
        .video-detail-page-wrapper .video-details li {
          color: var(--text-muted);
          font-size: var(--type-body);
          font-family: var(--secondary-font);
          line-height: 1.75;
          margin-bottom: 1.5rem;
        }

        .video-detail-page-wrapper .video-details strong {
          color: var(--ink);
        }

        /* Related Videos Section */
        .video-detail-page-wrapper .related-videos h4 {
          font-family: var(--primary-font);
          font-size: var(--type-h3);
          color: var(--ink);
          border-bottom: 2px solid var(--ink);
          padding-bottom: 8px;
          margin-bottom: 20px !important;
        }

        .video-detail-page-wrapper .related-video-item {
          background: var(--warm-white) !important;
          border: 1px solid var(--rule) !important;
          border-radius: 0 !important;
          transition: background-color 0.2s, border-color 0.2s;
        }

        .video-detail-page-wrapper .related-video-item:hover {
          background: var(--slate) !important;
        }

        .video-detail-page-wrapper .related-video-item span {
          font-family: var(--primary-font);
          font-size: 15px;
          color: var(--ink);
        }

        .video-detail-page-wrapper .related-video-item:hover span {
          color: var(--cardinal);
        }

        /* Sidebar Widgets Wrapper */
        .video-detail-page-wrapper .video-sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .video-detail-page-wrapper .video-sidebar > * {
          background: var(--slate);
          border: 1px solid var(--rule);
          border-radius: 0;
          padding: 24px;
        }

        .video-detail-page-wrapper .post-shares .title {
          color: var(--text-muted);
          font-size: var(--type-small);
          font-family: var(--secondary-font);
          letter-spacing: 0.06em;
        }

        .video-detail-page-wrapper .post-shares {
          margin-top: 2.4rem !important;
          margin-bottom: 0 !important;
        }

        .video-detail-page-wrapper .post-shares li a {
          border-radius: 0;
          width: 38px;
          height: 38px;
          min-width: 38px;
          padding: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .video-detail-page-wrapper .post-shares li a.bg-color-facebook {
          background: var(--ink) !important;
        }
        .video-detail-page-wrapper .post-shares li a.bg-color-facebook:hover {
          background: var(--cardinal) !important;
        }

        .video-detail-page-wrapper .post-shares li a.bg-color-linkedin {
          background: var(--ink) !important;
        }
        .video-detail-page-wrapper .post-shares li a.bg-color-linkedin:hover {
          background: var(--cardinal) !important;
        }

        .video-detail-page-wrapper .post-shares li a i {
          display: block;
          line-height: 1;
          margin: 0;
          transform: translateY(0);
          font-size: 1.7rem;
          color: #fff;
        }

        .video-detail-page-wrapper hr {
          border-color: var(--rule);
          margin-top: 1.6rem !important;
          margin-bottom: 2rem !important;
        }
      `}</style>
    </>
  );
};

export default VideoDetailLayout;
