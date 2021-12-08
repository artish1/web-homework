import React from 'react'
import { Link } from 'react-router-dom'
import { css } from '@emotion/core'

export function NavBar() {
  return (
    <nav css={navStyle}>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/another'>Another route</Link>
        </li>
      </ul>
    </nav>
  )
}

const navStyle = theme => css`
  grid-row: 1;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  background-color: ${theme.colors.primary};
  & > ul {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    list-style-type: none;
  }

  & ul li a {
    color: #eee;
    text-decoration: none;
  }

  & > ul > li:not(:first-of-type) {
    margin-left: 16px;
  }
`
