import React from 'react'
import PropTypes from 'prop-types'

const ImageRenderer = props => (
  <img src={props.asset.url} style={{width:"100"}}/>
)

ImageRenderer.propTypes = {
  children: PropTypes.node.isRequired
}

export default ImageRenderer