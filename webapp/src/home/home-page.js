import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'
import GetTransactions from '../gql/transactions.gql'
import { StyledCard as Card } from '../components/card/Card'
import { css } from '@emotion/react'
import { BasicError } from '../components/errors/BasicError'

export function Home() {
  const { loading, error, data = {} } = useQuery(GetTransactions)
  console.log(data)
  if (loading) {
    return <Fragment>Loading...</Fragment>
  }

  if (error) {
    return <BasicError />
  }

  return (
    <div css={containerStyles}>
      <Card style={{ marginBottom: 16 }}>Transactions by User</Card>
      <Card>Transactions by Merchant</Card>
    </div>
  )
}

const containerStyles = css`
  width: 100%;
  box-sizing: border-box;
`
