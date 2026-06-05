import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import SocialLink from "../../data/social/SocialLink.json";

const FooterTwo = () => {
  // State for current year to prevent hydration mismatch
  const [currentYear, setCurrentYear] = useState("");
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="page-footer bg-grey-dark-key">
      <div className="custom-fluid-container">
        <div className="footer-mid pt-0">
          <div className="row align-items-center">
            <div className="col-md">
              <div className="footer-logo-container">
                <Link href="/">
                  <Image
                    src="/assets/logoblack.png"
                    alt="footer logo"
                    className="footer-logo"
                    width={86}
                    height={100}
                    style={{ objectFit: "contain" }}
                  />
                </Link>
              </div>
              {/* End of .brand-logo-container */}
            </div>
            {/* End of .col-md-6 */}

            {/* End of .col-md-6 */}
          </div>
          {/* End of .row */}
        </div>

        {/* End of .footer-mid */}
        <div className="footer-bottom">
          <ul className="footer-bottom-links">
            <li>
              <Link href="/">Terms of Use</Link>
            </li>
            <li>
              <Link href="/">Accessibility &amp; CC</Link>
            </li>
            <li>
              <Link href="/">AdChoices</Link>
            </li>
            <li>
              <Link href="/">Modern Slavery Act Statement</Link>
            </li>
            <li>
              <Link href="/">Advertise with us</Link>
            </li>
            <li>
              <Link href="/"> Store</Link>
            </li>
            <li>
              <Link href="/">Newsletters</Link>
            </li>
            <li>
              <Link href="/">Transcripts</Link>
            </li>
            <li>
              <Link href="/">License Footage</Link>
            </li>
            <li>
              <Link href="/">Sitemap</Link>
            </li>
          </ul>
          {/* End of .footer-bottom-links */}
          <p className="axil-copyright-txt">
            © {currentYear}. All rights reserved by Your Company.
          </p>
        </div>
        {/* End of .footer-bottom */}
      </div>
      End of .container
    </footer>
  );
};

export default FooterTwo;
