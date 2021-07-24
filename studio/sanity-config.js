const fs = require('fs');

module.exports = {
  sanity: {
    "root": true,
    "api": {
      "projectId": "m8l686jf",
      "dataset": process.env.GATSBY_SANITY_DATASET //decided it would be better to throw build errors than connect to the wrong dataset
    },
    "project": {
      "name": "Earth"
    },
    "plugins": [
      "@sanity/base",
      "@sanity/components",
      "@sanity/default-layout",
      "@sanity/default-login",
      "@sanity/dashboard",
      "@sanity/desk-tool",
      "dashboard-widget-structure-menu",
      "dashboard-widget-document-list",
      "dashboard-widget-netlify",
      "@sanity/studio-hints",
      "media",
      "tabs",
      "@ssfbank/sanity-plugin-byo-table",
      "@sanity/production-preview"
    ],
    "parts": [
      {
        "name": "part:@sanity/base/schema",
        "path": "./schemas/schema.js"
      },
      {
        "implements": "part:@sanity/base/theme/variables/override-style",
        "path": "./src/styles/variables.css"
      },
      {
        "name": "part:@sanity/desk-tool/structure",
        "path": "./src/structure/deskStructure.js"
      },
      {
        "implements": "part:@sanity/dashboard/config",
        "path": "./src/dashboardConfig.js"
      },
      {
        "implements": "part:@sanity/default-layout/studio-hints-config",
        "path": "./src/studioHintsConfig.js"
      },
      {
        "implements": "part:@sanity/production-preview/resolve-production-url",
        "path": "./src/resolveProductionUrl.js"
      }
    ]
  }
};

const config = require("./sanity-config.js").sanity;
const jsonConfig = JSON.stringify(config, null, 4);

fs.writeFile('sanity.json', jsonConfig, (err) => {
  if (err) {
      throw err;
  }
  console.log("JSON data is saved.");
});