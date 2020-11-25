// ButtonRenderer.js
import React from 'react'
import PropTypes from 'prop-types'
import { FaExternalLinkAlt } from 'react-icons/fa'

const ButtonRenderer = props => (
  <button className="box">
    {props.children} 
  </button>
)

ButtonRenderer.propTypes = {
  children: PropTypes.node.isRequired
}

export default ButtonRenderer