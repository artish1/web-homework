import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { css } from '@emotion/core'
import { NavBar } from './components/nav/NavBar'
import navData from './data/navigation'

function AppRouter() {
  return (
    <Router>
      <div css={layoutStyle}>
        <NavBar />
        <div className='main-content' css={contentStyle}>
          {navData.map((navItem, index) => (
            <Route component={navItem.component} exact={navItem.exact} key={index} path={navItem.route} />
          ))}
        </div>
      </div>
    </Router>
  )
}

export default AppRouter

const layoutStyle = css`
  display: grid;
  grid-row-gap: 24px;
  justify-items: center;
`

const contentStyle = css`
  grid-row: 2;
  max-width: 1100px;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
`
