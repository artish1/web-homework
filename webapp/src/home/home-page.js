import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'
import GetTransactions from '../gql/transactions.gql'
import { StyledCard as Card } from '../components/card/Card'
import { css } from '@emotion/react'
import { BasicError } from '../components/errors/BasicError'
import { Bar } from 'react-chartjs-2'

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const organizeChartData = transactions => {
  const trxByUsers = transactions.reduce((reducedObj, trx) => {
    if (reducedObj[trx.user.id]) {
      reducedObj[trx.user.id].transactions += 1
    } else {
      reducedObj[trx.user.id] = { transactions: 1, label: `${trx.user.firstName} ${trx.user.lastName}` }
    }
    return reducedObj
  }, {})

  const trxByMerchants = transactions.reduce((reducedObj, trx) => {
    if (reducedObj[trx.merchant.id]) {
      reducedObj[trx.merchant.id].transactions += 1
    } else {
      reducedObj[trx.merchant.id] = { transactions: 1, label: trx.merchant.name }
    }
    return reducedObj
  }, {})

  return { trxByUsers, trxByMerchants }
}

const toChartData = data => {
  const chartData = {
    labels: Object.values(data).map(entityData => entityData.label),
    datasets: [
      {
        label: 'Transactions',
        data: Object.values(data).map(entityData => entityData.transactions),
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  }

  return chartData
}

export function Home() {
  const { loading, error, data = {} } = useQuery(GetTransactions)

  if (loading) {
    return <Fragment>Loading...</Fragment>
  }

  if (error) {
    return <BasicError />
  }

  const { trxByUsers, trxByMerchants } = organizeChartData(data.transactions)

  const trxByMerchantsChartData = toChartData(trxByMerchants)
  const trxByUsersChartData = toChartData(trxByUsers)

  return (
    <div css={containerStyles}>
      <div css={cardContainer}>
        <Card>
          <Bar data={trxByUsersChartData} options={options('Transactions by Users')} />
        </Card>
      </div>
      <div css={cardContainer}>
        <Card>
          <Bar data={trxByMerchantsChartData} options={options('Transactions by Merchants')} />
        </Card>
      </div>
    </div>
  )
}

const options = title => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: title
    }
  }
})

const containerStyles = css`
  width: 100%;
  box-sizing: border-box;

  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  justify-items: center;
  align-items: center;
`

const cardContainer = css`
  width: 700px;

  @media (max-width: 720px) {
    width: 550px;
  }

  @media (max-width: 570px) {
    width: 350px;
  }
`
