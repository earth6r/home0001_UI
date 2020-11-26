// CircleRenderer.js
import React from 'react'
import PropTypes from 'prop-types'

const CircleRenderer = props => (
  <button style={{background:"white"}} className="box">
    {props.children} 
  </button>
)

CircleRenderer.propTypes = {
  children: PropTypes.node.isRequired
}

export default CircleRenderer