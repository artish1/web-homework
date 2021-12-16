import React, { useState, Fragment } from 'react'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import { css } from '@emotion/core'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import RemoveTransaction from '../../gql/removeTransaction.gql'
import {
  Paper,
  Box,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  IconButton,
  TableContainer,
  Collapse,
  Button,
  Chip
} from '@material-ui/core'

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import { TransactionDialog } from './transaction-dialog'
import { RemoveDialog } from './remove-dialog'

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

export function TxTable({ data }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const handleDialogClose = () => {
    setDialogOpen(false)
  }
  return (
    <Fragment>
      <TransactionDialog handleClose={handleDialogClose} open={dialogOpen} />
      <div css={controlsContainer}>
        <Button onClick={() => setDialogOpen(true)} startIcon={<AddIcon />}>
          Create Transaction
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table data-testid='txtable'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>User</TableCell>
              <TableCell>Merchant</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(trx => (
              <Row key={trx.id + '-row'} transaction={trx} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  )
  // return (
  //   <table css={styles}>
  //     <tbody>
  //       <tr className='header'>
  //         <td>ID</td>
  //         <td>User ID</td>
  //         <td>Description</td>
  //         <td>Merchant ID</td>
  //         <td>Debit</td>
  //         <td>Credit</td>
  //         <td>Amount</td>
  //       </tr>
  //       {data.map(tx => {
  //         const { id, user_id: userId, description, merchant_id: merchantId, debit, credit, amount } = tx
  //         return (
  //           <tr data-testid={`transaction-${id}`} key={`transaction-${id}`}>
  //             <td data-testid={makeDataTestId(id, 'id')}>{id}</td>
  //             <td data-testid={makeDataTestId(id, 'userId')}>{userId}</td>
  //             <td data-testid={makeDataTestId(id, 'description')}>{description}</td>
  //             <td data-testid={makeDataTestId(id, 'merchant')}>{merchantId}</td>
  //             <td data-testid={makeDataTestId(id, 'debit')}>{debit}</td>
  //             <td data-testid={makeDataTestId(id, 'credit')}>{credit}</td>
  //             <td data-testid={makeDataTestId(id, 'amount')}>{amount}</td>
  //             <td>
  //               <button className='remove-btn' onClick={() => handleRemove(id)}>
  //                 x
  //               </button>
  //             </td>
  //           </tr>
  //         )
  //       })}
  //     </tbody>
  //   </table>
  // )
}

export const RowCells = ({ transaction }) => {
  const {
    user: { firstName, lastName },
    merchant,
    amount
  } = transaction
  return (
    <Fragment>
      <TableCell data-testid={makeDataTestId(transaction.id, 'name')}>{`${firstName} ${lastName}`}</TableCell>
      <TableCell data-testid={makeDataTestId(transaction.id, 'merchant-name')}>{merchant.name}</TableCell>
      <TableCell data-testid={makeDataTestId(transaction.id, 'amount')}>{amount}</TableCell>
    </Fragment>
  )
}

const Row = ({ transaction }) => {
  const [removeTransaction] = useMutation(RemoveTransaction, {
    refetchQueries: ['GetTransactions']
  })
  const [open, setOpen] = useState(false)
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false)
  const history = useHistory()

  const handleRemove = () => {
    removeTransaction({
      variables: {
        transaction_id: transaction.id
      }
    })
  }

  const {
    user: { firstName, lastName, dob },
    merchant
  } = transaction
  return (
    <Fragment>
      <RemoveDialog
        handleCancel={() => setRemoveDialogOpen(false)}
        handleConfirm={handleRemove}
        open={removeDialogOpen}
      />
      <TableRow css={rowStyle}>
        <TableCell>
          <IconButton onClick={() => setOpen(!open)} size='small'>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <RowCells transaction={transaction} />
        <TableCell align='right'>
          <IconButton css={editButton} onClick={() => history.push(`/transactions/${transaction.id}`)} size='small'>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => setRemoveDialogOpen(true)} size='small'>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} css={collapsedCell}>
          <Collapse in={open}>
            <Box css={infoContainer} padding={2}>
              <Box css={flexContainer}>
                <Box css={rowCard}>
                  <h3>{merchant.name}</h3>
                  <Chip css={chipCss} label='Merchant' />
                  <p data-testid={makeDataTestId(transaction.id, 'merchant-description')}>{merchant.description}</p>
                </Box>
                <Box css={rowCard}>
                  <h3>{`${firstName} ${lastName}`}</h3>
                  <Chip css={chipCss} label='User' />
                  <p>{dob}</p>
                </Box>
              </Box>
              <Box css={rowCard}>
                <h3>Transaction</h3>
                <div>
                  {transaction.debit && (
                    <Chip
                      color='primary'
                      css={chipCss}
                      data-testid={makeDataTestId(transaction.id, 'chip-debit')}
                      label='Debit'
                      variant='outlined'
                    />
                  )}
                  {transaction.credit && (
                    <Chip
                      color='primary'
                      css={chipCss}
                      data-testid={makeDataTestId(transaction.id, 'chip-credit')}
                      label='Credit'
                      variant='outlined'
                    />
                  )}
                </div>
                <p className='transaction-amount'>${transaction.amount}</p>
                <p
                  className='transaction-description'
                  data-testid={makeDataTestId(transaction.id, 'transaction-description')}
                >
                  {transaction.description}
                </p>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

const rowStyle = css`
  border-bottom: unset;
  td {
    border-bottom: unset;
  }
`
const chipCss = css`
  margin: 0px 8px 8px 8px;
`

const editButton = css`
  margin-right: 8px !important;
`

const flexContainer = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`
const rowCard = css`
  border-radius: 4px;
  border: 1px solid black;
  padding: 8px;
  box-sizing: border-box;
  text-align: center;
  width: 100%;
  margin-bottom: 16px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .transaction-description {
    font-size: 17px;
  }

  .transaction-amount {
    font-weight: bold;
    font-size: 36px;
  }

  .name {
    font-size: 32px;
  }
`

const infoContainer = css`
  p {
    margin: 0px 0px 6px 0px;
    padding: 0;
    color: #777;
  }

  h3 {
    font-size: 24px;
    color: #4f4f4f;
    padding: 0;
    margin: 0;
  }
`

const collapsedCell = css`
  padding-top: 0px !important;
  padding-bottom: 0px !important;

  background-color: #f3f3f3;
`

const controlsContainer = css`
  display: flex;
  justify-content: right;
  align-items: center;

  padding: 16px 0px;
`
const transactionPropType = shape({
  id: string,
  user_id: string,
  user: shape({
    firstName: string,
    lastName: string,
    dob: string,
    string
  }),
  description: string,
  merchant_id: string,
  merchant: shape({
    id: string,
    name: string,
    description: string
  }),
  debit: bool,
  credit: bool,
  amount: number
})

Row.propTypes = {
  transaction: transactionPropType
}

RowCells.propTypes = {
  transaction: transactionPropType
}

TxTable.propTypes = {
  data: arrayOf(transactionPropType)
}
