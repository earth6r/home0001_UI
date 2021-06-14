import React from 'react'

import Layout from "../containers/layout";
import SEO from '../components/seo'

const NotFoundPage = () => (
  <Layout>
    <SEO title='404: Not found' />
    <h1>NOT FOUND</h1>
    <p className="mt-12">You just hit a link that doesn&#39;t exist... sorry for the inconvenience.</p>
  </Layout>
)

export default NotFoundPage
