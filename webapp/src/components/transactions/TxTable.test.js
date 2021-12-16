import React from 'react'
import { render } from '@testing-library/react'
import { RowCells } from './TxTable'
import { transactions } from '../../../mocks/transactions-data'
import { Transactions } from '../../transactions/index'
import { TestProviders } from '../../../mocks/testProviders'

const getDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

describe('Transactions Table', () => {
  it('should display in transactions page and filled with data from apollo', async () => {
    const { getByTestId } = render(<Transactions />, { wrapper: TestProviders })
    const testTransaction = transactions[0]

    // Wait for mockedprovider to populate data from request via next tick of event loop
    await new Promise(resolve => setTimeout(resolve, 0))
    expect(getByTestId(getDataTestId(testTransaction.id, 'amount'))).toBeInTheDocument()
  })

  it('should show user "Mark Artishuk" with amount "150" in a RowCells component', () => {
    const transaction = transactions[0]
    const { getByTestId } = render(
      <table>
        <tbody>
          <tr>
            <RowCells transaction={transaction} />
          </tr>
        </tbody>
      </table>
    )

    const nameElem = getByTestId(getDataTestId(transaction.id, 'name'))
    expect(nameElem).toBeInTheDocument()
    expect(nameElem.innerHTML).toBe(`${transaction.user.firstName} ${transaction.user.lastName}`)

    const amountElem = getByTestId(getDataTestId(transaction.id, 'amount'))
    expect(amountElem).toBeInTheDocument()
    expect(parseInt(amountElem.innerHTML)).toEqual(transaction.amount)
  })
})
