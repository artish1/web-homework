import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'
import { ApolloProvider } from '@apollo/client'

import { client } from './network/apollo-client'
import { ThemeProvider } from 'emotion-theming'
import { object } from 'prop-types'

const theme = {
  colors: {
    primary: 'black'
  }
}

const AllTheProviders = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ApolloProvider>
  )
}

AllTheProviders.propTypes = {
  children: object
}

ReactDOM.render(
  <div data-app-init=''>
    <AllTheProviders>
      <AppRouter />
    </AllTheProviders>
  </div>,
  document.getElementById('react-app')
)
