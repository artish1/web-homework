import React, { useState, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { css } from '@emotion/core'

import navData from '../../data/navigation'

export function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const history = useHistory()

  const handleNavigate = route => e => {
    history.push(route)
    setDrawerOpen(false)
  }
  return (
    <Fragment>
      <AppBar position='static'>
        <Toolbar css={toolbarCss}>
          <div css={flexContainer}>
            <IconButton aria-label='menu' color='inherit' edge='start' onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
            <h2 css={title}>Divvy</h2>
          </div>
          <Typography css={author}>MARK ARTISHUK</Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor='left' onClose={() => setDrawerOpen(false)} open={drawerOpen}>
        <List css={listContainer}>
          {navData.map((navItem, index) => (
            <ListItem button key={navItem + index} onClick={handleNavigate(navItem.route)}>
              <ListItemIcon>
                <navItem.icon />
              </ListItemIcon>
              <ListItemText primary={navItem.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Fragment>
  )
  // return (
  //   <nav css={navStyle}>
  //     <ul>
  //       <li>
  //         <Link to='/'>Home</Link>
  //       </li>
  //       <li>
  //         <Link to='/transactions'>Transactions</Link>
  //       </li>
  //     </ul>
  //   </nav>
  // )
}

const flexContainer = css`
  display: flex;
`

const listContainer = css`
  width: 250px;
`

const author = css`
  font-size: 14px !important;
  letter-spacing: 3px !important;
`

const title = css`
  margin-left: 8px;
  font-size: 24px;
`

const toolbarCss = css`
  display: flex;
  justify-content: space-between;
`
// const navStyle = theme => css`
//   grid-row: 1;
//   width: 100%;
//   padding: 16px;
//   box-sizing: border-box;
//   background-color: ${theme.colors.primary};
//   & > ul {
//     display: flex;
//     flex-direction: row;
//     justify-content: flex-end;
//     list-style-type: none;
//   }

//   & ul li a {
//     color: #eee;
//     text-decoration: none;
//   }

//   & > ul > li:not(:first-of-type) {
//     margin-left: 16px;
//   }
// `
