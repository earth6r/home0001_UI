// Load variables from `.env` as soon as possible
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});
const clientConfig = require("./client-config");
const isProd = process.env.NODE_ENV === "production";
const tailwindConfig = require("./tailwind.config.js");

module.exports = {
  plugins: [
     {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-190900607-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: true,
        anonymize: true,
      },
    },
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
    resolve: 'gatsby-plugin-intercom-spa',
      options: {
        app_id: process.env.INTERCOM_APP_ID,
        include_in_development: true,
        delay_timeout: 1000
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
    {
    resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: "1778055882368765",
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
    {
    resolve: 'gatsby-plugin-mixpanel',
    options: {
        apiToken: process.env.MIXPANEL_TOKEN, // required
      },
    },
  ],
};
