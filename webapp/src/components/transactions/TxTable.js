import React, { useState, Fragment } from 'react'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import { css } from '@emotion/core'
// import { useMutation } from '@apollo/client'
// import RemoveTransaction from '../../gql/removeTransaction.gql'
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
  Button
} from '@material-ui/core'

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import AddIcon from '@material-ui/icons/Add'
import { TransactionDialog } from './transaction-dialog'

// const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

export function TxTable({ data }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  // const [removeTransaction] = useMutation(RemoveTransaction, {
  //   refetchQueries: ['GetTransactions']
  // })
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>User</TableCell>
              <TableCell>Merchant</TableCell>
              <TableCell>Amount</TableCell>
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

const Row = ({ transaction }) => {
  const [open, setOpen] = useState(false)
  const {
    amount,
    user: { firstName, lastName },
    merchant
  } = transaction
  return (
    <Fragment>
      <TableRow css={rowStyle}>
        <TableCell>
          <IconButton onClick={() => setOpen(!open)} size='small'>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{`${firstName} ${lastName}`}</TableCell>
        <TableCell>{merchant.name}</TableCell>
        <TableCell>{amount}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} css={collapsedCell}>
          <Collapse in={open}>
            <Box margin={1}>
              <h3>Merchant:</h3>
              <p>id: {merchant.id}</p>
              <p>name: {merchant.name}</p>
              <p>description: {merchant.description}</p>
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
  user: {
    firstName: string,
    lastName: string,
    dob: string,
    string
  },
  description: string,
  merchant_id: string,
  debit: bool,
  credit: bool,
  amount: number
})

Row.propTypes = {
  transaction: transactionPropType
}

TxTable.propTypes = {
  data: arrayOf(transactionPropType)
}
