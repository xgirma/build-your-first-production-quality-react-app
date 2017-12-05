import React from 'react'
import { Link } from '../router/index'

export const Footer = () => {
  return (
    <div className="Footer">
      <Link to='/'>All</Link>
      <Link to='/active'>Active</Link>
      <Link to='/complete'>Complete</Link>
    </div>
  )
}