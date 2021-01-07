import React from 'react'
import Img from 'gatsby-image'
import {getFluidGatsbyImage} from 'gatsby-source-sanity'
import clientConfig from '../../client-config'
import imageUrlBuilder from '@sanity/image-url'
// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(clientConfig.sanity)

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
function urlFor(source) {
  return builder.image(source)
}

export default ({node}) => {
  if (!node || !node.asset || !node.asset._id) { return null }

  const fluidProps = getFluidGatsbyImage(
    node.asset._id,
    {maxWidth: 675},
    clientConfig.sanity
  )
  return (
    <figure>
      <Img fluid={fluidProps} alt={node.alt} imgStyle={{ objectFit: 'contain', maxWidth: "none" }} />
      <figcaption>{node.caption}</figcaption>
    </figure>
  )
}
