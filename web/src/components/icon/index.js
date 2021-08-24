import React from 'react'
import HamburgerIcon from './hamburger'
import HamburgerRedIcon from './hamburgerRed'
import Close from './close'

function Icon (props) {
  switch (props.symbol) {
    case 'hamburger':
      return <HamburgerIcon />
    case 'hamburgerRed':
      return <HamburgerRedIcon />
    case 'close':
      return <Close />
    default:
      return <span>Unknown icon: {props.symbol}</span>
  }
}

export default Icon
