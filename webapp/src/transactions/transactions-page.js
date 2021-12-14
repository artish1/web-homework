import React, { Fragment } from 'react'
import { css } from '@emotion/react'
import { TxTable } from '../components/transactions/TxTable'
import { useQuery } from '@apollo/client'
import GetTransactions from '../gql/transactions.gql'
import { BasicError } from '../components/errors/BasicError'

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
      <TxTable data={data.transactions} />
    </div>
  )
}

const containerStyles = css`
  width: 100%;
  box-sizing: border-box;
`
