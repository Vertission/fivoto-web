import NextHead from "next/head";
import { DefaultSeo } from "next-seo";

import FAVICON from "../../../public/favicon.ico";

const config = {
  title: "FIVOTO | Buy Anything, Sell Anywhere",
  description: "Fivoto Sri Lanka - lk.fivoto.com",
  canonical: "https://lk.fivoto.com",
  openGraph: {
    type: "website",
    locale: "en_IE",
    site_name: "Fivoto",
    images: [
      {
        url:
          "https://fivoto-srilanka.s3.ap-south-1.amazonaws.com/assets/logo/1.png",
        alt: "FIVOTO | Buy Anything, Sell Anywhere",
      },
    ],
  },
  twitter: {
    handle: "@fivoto",
    site: "@fivoto",
    cardType: "summary_large_image",
  },
};

const Head = () => {
  return (
    <>
      <DefaultSeo {...config} />
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href={FAVICON} type="image/x-icon" />
      </NextHead>
    </>
  );
};

export default Head;
