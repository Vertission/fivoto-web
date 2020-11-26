import NextHead from "next/head";
import { DefaultSeo } from "next-seo";

const config = {
  title: "ACME Storefront | Powered by Next.js Commerce",
  titleTemplate: "%s - ACME Storefront",
  description: "Next.js Commerce -> https://www.nextjs.org/commerce",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://nextjs.org/commerce",
    site_name: "Next.js Commerce",
  },
  twitter: {
    handle: "@nextjs",
    site: "@nextjs",
    cardType: "summary_large_image",
  },
};

const Head = () => {
  return (
    <>
      <DefaultSeo {...config} />
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
      </NextHead>
    </>
  );
};

export default Head;
