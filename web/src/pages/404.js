import React from 'react'

import Layout from "../containers/layout";
import SEO from '../components/seo'

const NotFoundPage = () => (
  <Layout rnd>
    <SEO title='404: Not found' />
    <p className="mt-24">You just hit a link that doesn&#39;t exist... sorry for the inconvenience.</p>
  </Layout>
)

export default NotFoundPage
