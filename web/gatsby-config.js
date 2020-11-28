// Load variables from `.env` as soon as possible
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});
const clientConfig = require("./client-config");
const isProd = process.env.NODE_ENV === "production";
const tailwindConfig = require("./tailwind.config.js");

module.exports = {
  plugins: [
    `gatsby-plugin-netlify`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [require(`tailwindcss`)(tailwindConfig)],
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-sanity",
      options: {
        ...clientConfig.sanity,
        token: process.env.SANITY_READ_TOKEN,
        watchMode: !isProd,
        overlayDrafts: !isProd,
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        custom: {
          families: ["GP", "Earth"],
          urls: ["/fonts/fonts.css"],
        },
        usePreload: true,
      },
      usePreload: true,
      useMinify: true,
    },
    // {
    //   resolve: `gatsby-source-stripe`,
    //   options: {
    //     objects: ["Price"],
    //     secretKey: process.env.STRIPE_SECRET_KEY,
    //     downloadFiles: false,
    //   },
    // },
    {
      resolve: `gatsby-plugin-hotjar`,
      options: {
        id: process.env.HOTJAR_ID,
        sv: process.env.HOTJAR_SNIPPET_VERSION,
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `earth`,
        short_name: `earth`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/images/favicon.jpg`,
      },
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint: process.env.MAILCHIMP_ENDPOINT, // string; add your MC list endpoint here; see instructions below
        timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    },
  ],
};
