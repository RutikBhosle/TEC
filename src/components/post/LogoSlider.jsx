import React from "react";

import Logo8FigureFirm from "../../assest/8figurefirm_logo 6.jpg";
import LogoAlloyPersonalTraining from "../../assest/alloypersonaltraining_logo 4.jpg";
import LogoCubeSoftware from "../../assest/cube_software_logo.jpeg";
import LogoExePresence from "../../assest/exepresence_logo.jpeg";
import LogoMiyazaki from "../../assest/miyazaki_logo.jpeg";
import LogoNewWorldWind from "../../assest/newworldwind_logo.jpeg";
import LogoPickupUsa from "../../assest/pickup_usa_franchise_company_logo.jpeg";
import LogoTimePlast from "../../assest/timeplast_logo 3.jpg";
import LogoShoumo from "../../assest/Shoumo.jpg";
import LogoSurbhi from "../../assest/Surbhi.jpg";
import LogoSlendy from "../../assest/Slendy.jpg";
import LogoMagnolia from "../../assest/magnolia.jpg";
import LogoDevang from "../../assest/devang.jpg";
import LogoBen from "../../assest/ben.jpg";

const allImages = [
  { src: Logo8FigureFirm, alt: "8 Figure Firm" },
  { src: LogoAlloyPersonalTraining, alt: "Alloy Personal Training" },
  { src: LogoCubeSoftware, alt: "Cube Software" },
  { src: LogoExePresence, alt: "Exe Presence" },
  { src: LogoMiyazaki, alt: "Miyazaki" },
  { src: LogoNewWorldWind, alt: "New World Wind" },
  { src: LogoPickupUsa, alt: "Pickup USA" },
  { src: LogoTimePlast, alt: "TimePlast" },
  { src: LogoShoumo, alt: "Shoumo" },
  { src: LogoSurbhi, alt: "Surbhi" },
  { src: LogoSlendy, alt: "Slendy" },
  { src: LogoMagnolia, alt: "Magnolia" },
  { src: LogoDevang, alt: "Devang" },
  { src: LogoBen, alt: "Ben" },
];

const LogoSlider = ({ title = "Our Partner Brands", showTitle = true, wrapperClassName = "" }) => {
  const doubled = [...allImages, ...allImages];

  return (
    <>
      <section className={`ec-partners ${wrapperClassName}`.trim()}>
        {showTitle && (
          <div className="ec-partners-header">
            <span className="ec-partners-label">Trusted Partners</span>
            <h2 className="ec-partners-title">{title}</h2>
          </div>
        )}

        <div className="ec-partners-track-outer">
          <div className="ec-partners-track">
            {doubled.map((image, index) => (
              <div key={index} className="ec-partner-logo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={typeof image.src === "string" ? image.src : image.src.src}
                  alt={image.alt}
                  width={80}
                  height={80}
                  style={{ objectFit: "contain", width: "auto", height: "auto", maxWidth: "80px", maxHeight: "80px" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .ec-partners {
          background: #0F1923;
          padding: 52px 0;
          border-top: 4px solid #C1121F;
        }

        .ec-partners-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .ec-partners-label {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #C1121F;
          margin-bottom: 10px;
        }

        .ec-partners-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          margin: 0;
        }

        .ec-partners-track-outer {
          width: 100%;
          overflow: hidden;
        }

        .ec-partners-track {
          display: flex;
          align-items: center;
          animation: partnerScroll 48s linear infinite;
          width: max-content;
          gap: 0;
        }
        .ec-partners-track:hover { animation-play-state: paused; }

        .ec-partner-logo {
          padding: 20px 36px;
          border-right: 1px solid #1E2D3D;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: brightness(0) invert(0.45);
          transition: filter 0.25s;
          cursor: pointer;
          flex-shrink: 0;
          height: 100px;
        }
        .ec-partner-logo:hover { filter: brightness(0) invert(1); }

        @keyframes partnerScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </>
  );
};

export default LogoSlider;
