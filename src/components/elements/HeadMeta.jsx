import Head from "next/head";

const HeadMeta = ({ metaTitle, metaDesc }) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="robots" content="index, follow" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="description"
        content={
          metaDesc ||
          "Star Prime is a business magazine that brings inspiring stories of entrepreneurs who have turned their dreams into reality."
        }
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>
        {metaTitle ||
          "Star Prime: A Business Magazine for Inspiring Entrepreneur Stories"}
      </title>
      <link rel="shortcut icon" href="/assets/emblem.png?v=2" />
      <link rel="icon" type="image/png" sizes="32x32" href="/assets/emblem.png?v=2" />
      <link rel="icon" type="image/png" sizes="16x16" href="/assets/emblem.png?v=2" />
      <link rel="apple-touch-icon" href="/assets/emblem.png?v=2" />
    </Head>
  );
};

export default HeadMeta;
