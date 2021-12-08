import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'
import { ApolloProvider } from '@apollo/client'
import { client } from './network/apollo-client'
import { ThemeProvider } from 'emotion-theming'

const theme = {
  colors: {
    primary: 'black'
  }
}

ReactDOM.render(
  <div data-app-init=''>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </ApolloProvider>
  </div>,
  document.getElementById('react-app')
)
