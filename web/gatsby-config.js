// Load variables from `.env` as soon as possible
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`
});
const clientConfig = require("./client-config");
const isProd = process.env.NODE_ENV === "production";
const tailwindConfig = require("./tailwind.config.js");

module.exports = {
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [require(`tailwindcss`)(tailwindConfig)]
      }
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-sanity",
      options: {
        ...clientConfig.sanity,
        token: process.env.SANITY_READ_TOKEN,
        watchMode: !isProd,
        overlayDrafts: !isProd,
        useCdn: true
      }
    },
    {
      resolve: "gatsby-plugin-intercom-spa",
      options: {
        app_id: process.env.INTERCOM_APP_ID,
        include_in_development: true,
        delay_timeout: 1000
      }
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
        sv: process.env.HOTJAR_SNIPPET_VERSION
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /earth.*\.svg/
        }
      }
    },
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: "1778055882368765"
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `earth`,
        short_name: `earth`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`
      }
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint: process.env.MAILCHIMP_ENDPOINT, // string; add your MC list endpoint here; see instructions below
        timeout: 3500 // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      }
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-ZWMYHN30CX" // GA4
        ],
        gtagConfig: {
          // optimize_id: "OPT-MWRZP22", // Google Optimize container ID
          anonymize_ip: true,
          cookie_expires: 0
        },
        pluginConfig: {
          head: true,
          respectDNT: true
          // exclude: ["/preview/**", "/do-not-track/me/too/"],
        }
      }
    },
    {
      resolve: `gatsby-plugin-segment-js`,
      options: {
        // your segment write key for your production environment
        // when process.env.NODE_ENV === 'production'
        // required; non-empty string
        prodKey: process.env.SEGMENT_WRITE_KEY,

        // boolean (defaults to false) on whether you want
        // to include analytics.page() automatically
        // if false, see below on how to track pageviews manually
        trackPage: true,

        // number (defaults to 50); time to wait after a route update before it should
        // track the page change, to implement this, make sure your `trackPage` property is set to `true`
        trackPageDelay: 50,

        // boolean (defaults to false); whether to delay load Segment
        // ADVANCED FEATURE: only use if you leverage client-side routing (ie, Gatsby <Link>)
        // This feature will force Segment to load _after_ either a page routing change
        // or user scroll, whichever comes first. This delay time is controlled by
        // `delayLoadTime` setting. This feature is used to help improve your website's
        // TTI (for SEO, UX, etc).  See links below for more info.
        // NOTE: But if you are using server-side routing and enable this feature,
        // Segment will never load (because although client-side routing does not do
        // a full page refresh, server-side routing does, thereby preventing Segment
        // from ever loading).
        // See here for more context:
        // GIF: https://github.com/benjaminhoffman/gatsby-plugin-segment-js/pull/19#issuecomment-559569483
        // TTI: https://github.com/GoogleChrome/lighthouse/blob/master/docs/scoring.md#performance
        // Problem/solution: https://marketingexamples.com/seo/performance
        delayLoad: true,

        // number (default to 1000); time to wait after scroll or route change
        // To be used when `delayLoad` is set to `true`
        delayLoadTime: 1000,

        // Whether to completely skip calling `analytics.load({writeKey})`.
        // ADVANCED FEATURE: only use if you are calling `analytics.load({writeKey})` manually
        // elsewhere in your code or are using a library
        // like: https://github.com/segmentio/consent-manager that will call it for you.
        // Useful for only loading the tracking script once a user has opted in to being tracked, for example.
        manualLoad: false
      }
    },
    {
      resolve: "gatsby-plugin-hubspot",
      options: {
        trackingCode: "39987214",
        respectDNT: false,
        productionOnly: true
      }
    }
  ]
};
