import React, { Fragment } from 'react'
import { css } from '@emotion/react'
import { TxTable } from '../components/transactions/TxTable'
import { useQuery } from '@apollo/client'
import GetTransactions from '../gql/transactions.gql'

export const Transactions = () => {
  const { loading, error, data = {} } = useQuery(GetTransactions)
  console.log('Data: ', data)
  if (loading) {
    return <Fragment>Loading...</Fragment>
  }

  if (error) {
    return <Fragment>¯\_(ツ)_/¯</Fragment>
  }
  return (
    <div css={containerStyles}>
      <TxTable data={data.transactions} />
    </div>
  )
}

const containerStyles = css`
  width: 100%;
  box-sizing: border-box;
`
