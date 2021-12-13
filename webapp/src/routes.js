import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home } from './home'
import { Transactions } from './transactions'
import { NavBar } from './components/nav/NavBar'

function AppRouter() {
  return (
    <Router>
      <div css={layoutStyle}>
        <NavBar />
        <div className='main-content' css={contentStyle}>
          <Route component={Home} exact path='/' />
          <Route component={Transactions} exact path='/transactions' />
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
