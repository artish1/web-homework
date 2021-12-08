import React from 'react'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import { css } from '@emotion/core'
import { useMutation } from '@apollo/client'
import RemoveTransaction from '../../gql/removeTransaction.gql'
import { Link } from 'react-router-dom'

const styles = css`
  background-color: #eee;

  .header {
    font-weight: bold;
  }

  td {
    padding: 8px;
    text-align: right;
  }

  .remove-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1;

    width: 30px;
    height: 30px;

    border-radius: 100%;
    border: none;

    cursor: pointer;
    background-color: red;
    color: white;
  }
`

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

export function TxTable({ data }) {
  const [removeTransaction] = useMutation(RemoveTransaction, {
    refetchQueries: ['GetTransactions']
  })

  const handleRemove = id => {
    removeTransaction({
      variables: {
        transaction_id: id
      }
    })
  }

  return (
    <table css={styles}>
      <tbody>
        <tr className='header'>
          <td>ID</td>
          <td>User ID</td>
          <td>Description</td>
          <td>Merchant ID</td>
          <td>Debit</td>
          <td>Credit</td>
          <td>Amount</td>
        </tr>
        {data.map(tx => {
          const { id, user_id: userId, description, merchant_id: merchantId, debit, credit, amount } = tx
          return (
            <Link key={`transaction-${id}`} to={`/transaction/`}>
              <tr data-testid={`transaction-${id}`} key={`transaction-${id}`}>
                <td data-testid={makeDataTestId(id, 'id')}>{id}</td>
                <td data-testid={makeDataTestId(id, 'userId')}>{userId}</td>
                <td data-testid={makeDataTestId(id, 'description')}>{description}</td>
                <td data-testid={makeDataTestId(id, 'merchant')}>{merchantId}</td>
                <td data-testid={makeDataTestId(id, 'debit')}>{debit}</td>
                <td data-testid={makeDataTestId(id, 'credit')}>{credit}</td>
                <td data-testid={makeDataTestId(id, 'amount')}>{amount}</td>
                <td>
                  <button className='remove-btn' onClick={() => handleRemove(id)}>
                    x
                  </button>
                </td>
              </tr>
            </Link>
          )
        })}
      </tbody>
    </table>
  )
}

TxTable.propTypes = {
  data: arrayOf(
    shape({
      id: string,
      user_id: string,
      description: string,
      merchant_id: string,
      debit: bool,
      credit: bool,
      amount: number
    })
  )
}
