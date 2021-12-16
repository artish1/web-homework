import { MockedProvider } from '@apollo/client/testing'
import { object } from 'prop-types'

import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { transactions } from './transactions-data'
import GetTransactions from '../src/gql/transactions.gql'

import GetUsersAndMerchants from '../src/gql/users-and-transactions.gql'
import { usersAndMerchants } from './users-and-merchants-data'

const mocks = [
  {
    request: {
      query: GetTransactions
    },
    result: {
      data: {
        transactions
      }
    }
  },
  {
    request: {
      query: GetUsersAndMerchants
    },
    result: {
      data: usersAndMerchants
    }
  }
]
export const TestProviders = ({ children }) => {
  return (
    <Router>
      <MockedProvider addTypename={false} mocks={mocks}>
        {children}
      </MockedProvider>
    </Router>
  )
}

TestProviders.propTypes = {
  children: object
}
