# Earth - (Staging Site)

_Fully customizable blog template with a React.js front-end._

Deployed from [sanity.io/create](https://www.sanity.io/create/?template=sanity-io%2Fsanity-template-gatsby-blog).

## What you have

- A blazing fast blog with [Gatsby.js](https://gatsbyjs.org)
- Structured content using [Sanity.io](https://www.sanity.io)
- Global deployment on [Netlify](https://netlify.com)
- Frontend automated testing from [Ghostinspector](https://www.ghostinspector.com/)

## Quick start

1. Clone this repository
2. `npm install` in the project root folder on local
3. `npm run dev` to start the studio and frontend locally
   - Your studio should be running on [http://localhost:3333](http://localhost:3333)
   - Your frontend should be running on [http://localhost:8000](http://localhost:8000)
4. `npm run build` to build to production locally

## Enable real-time content preview on development

1. Go to your [project’s API settings on manage.sanity.io](https://manage.sanity.io/projects/dsk3cuzk/settings/api) and create a token with read rights.
2. Rename `.env.development.template` to `.env.development` and paste in the token: `SANITY_READ_TOKEN="yourTokenHere"`.
3. Restart the development server (`ctrl + C` and `npm run dev`).

If you want to turn off preview you can set `watchMode: false` in gatsby-config.js. If you just want to preview published changes you can set `overlayDrafts: false` in gatsby-config.js.

## High level development tips

- Make sure to copy needed environment variables from netlify
- Run `npm run config` in the studio folder to generate sanity.json file
- For adding new fields in Sanity:
  - Add the new field in sanity schema files
  - Deploy the graphql API using `npm run graphql-deploy`
  - Add the new field to the graphql queries
  - Use them in your components

## Deploy changes

Netlify automatically deploys new changes commited to master on GitHub. If you want to change deployment branch, do so in [build & deploy settings on Netlify](https://www.netlify.com/docs/continuous-deployment/#branches-deploys).

## Deploying studio changes

For deploying the graphql API, navigate to the studio folder and run `npm run graphql-deploy` and to deploy the studio
changes run `npm run deploy` afterwards.
