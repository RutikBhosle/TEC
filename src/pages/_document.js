import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Preload critical assets */}
          <link rel="preload" href="/css/fontawesome-all.min.css" as="style" />
          <link rel="preload" href="/css/iconfont.css" as="style" />

          {/* Editorial Google Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
            rel="stylesheet"
          />

          {/* Static CSS Files */}
          <link rel="stylesheet" href="/css/fontawesome-all.min.css" />
          <link rel="stylesheet" href="/css/iconfont.css" />

          {/* RSS feed */}
          <link
            rel="alternate"
            type="application/rss+xml"
            title="Star Prime Feed"
            href="/api/feed"
          />

          {/* Google AdSense */}
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4800543608007428"
            crossOrigin="anonymous"
          />

          {/* JSON-LD Script */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "Organization",
                    "@id":
                      "https://www.starprime.com/#organization",
                    name: "Star Prime",
                    url: "https://www.starprime.com/",
                    sameAs: [
                      "https://www.facebook.com/starprime",
                      "https://www.instagram.com/starprime/",
                      "https://www.linkedin.com/company/starprime/",
                    ],
                    logo: {
                      "@type": "ImageObject",
                      "@id":
                        "https://www.starprime.com/#logo",
                      inLanguage: "en-US",
                      url: "https://www.starprime.com/next/image?url=%2Fassets%2Flogoblack.jpg&w=384&q=75",
                      width: 300,
                      height: 150,
                      caption: "Star Prime",
                    },
                    image: {
                      "@id":
                        "https://www.starprime.com/#logo",
                    },
                  },
                  {
                    "@type": "WebSite",
                    "@id":
                      "https://www.starprime.com/#website",
                    url: "https://www.starprime.com/",
                    name: "Star Prime",
                    description:
                      "Star Prime is a business magazine that brings inspiring stories of entrepreneurs who have turned their dreams into reality.",
                    publisher: {
                      "@id":
                        "https://www.starprime.com/#organization",
                    },
                    potentialAction: [
                      {
                        "@type": "SearchAction",
                        target:
                          "https://www.starprime.com/?s={search_term_string}",
                        "query-input": "required name=search_term_string",
                      },
                    ],
                    inLanguage: "en-US",
                  },
                  {
                    "@type": "WebPage",
                    "@id":
                      "https://www.starprime.com/#webpage",
                    url: "https://www.starprime.com/",
                    name: "Star Prime",
                    isPartOf: {
                      "@id":
                        "https://www.starprime.com/#website",
                    },
                    about: {
                      "@id":
                        "https://www.starprime.com/#organization",
                    },
                    datePublished: "2024-06-24T20:16:53+00:00",
                    dateModified: "2024-06-28T20:33:08+00:00",
                    description:
                      "Star Prime is a business magazine that brings inspiring stories of entrepreneurs who have turned their dreams into reality.",
                    inLanguage: "en-US",
                    potentialAction: [
                      {
                        "@type": "ReadAction",
                        target: [
                          "https://www.starprime.com/",
                        ],
                      },
                    ],
                  },
                ],
              }),
            }}
          />

        </Head>
        <body>
          <Main />
          <NextScript />
          {/* Google Tag Manager Script */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
