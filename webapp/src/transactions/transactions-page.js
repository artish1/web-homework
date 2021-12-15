import React, { Fragment } from 'react'
import { css } from '@emotion/react'
import { TxTable } from '../components/transactions/TxTable'
import { useQuery } from '@apollo/client'
import GetTransactions from '../gql/transactions.gql'
import { BasicError } from '../components/errors/BasicError'
import { Route } from 'react-router-dom'
import { EditTransaction } from '../components/transactions/edit-transaction'

export const Transactions = () => {
  const { loading, error, data = {} } = useQuery(GetTransactions)

  if (loading) {
    return <Fragment>Loading...</Fragment>
  }

  if (error) {
    return <BasicError />
  }
  return (
    <div css={containerStyles}>
      <Route component={EditTransaction} exact path='/transactions/:transactionId' />
      <TxTable data={data.transactions} />
    </div>
  )
}

const containerStyles = css`
  width: 100%;
  box-sizing: border-box;
`
