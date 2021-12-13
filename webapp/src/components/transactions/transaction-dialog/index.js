import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  CircularProgress,
  DialogContentText,
  FormControlLabel,
  Checkbox,
  TextField
} from '@material-ui/core'
import { func, bool } from 'prop-types'
import { useMutation, useQuery } from '@apollo/client'
import GetUsersAndMerchants from '../../../gql/users-and-transactions.gql'
import AddTransaction from '../../../gql/add-transaction.gql'
import { css } from '@emotion/react'

export const TransactionDialog = ({ handleClose, open }) => {
  const { data, loading, error } = useQuery(GetUsersAndMerchants)
  const [addTransaction] = useMutation(AddTransaction, {
    awaitRefetchQueries: ['GetTransactions']
  })
  const [user, setUser] = useState('')
  const [merchant, setMerchant] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState(0)
  const [debit, setDebit] = useState(false)
  const [credit, setCredit] = useState(false)

  const handleChange = (setState, isChecked = false) => event => {
    if (isChecked) setState(event.target.checked)
    else setState(event.target.value)
  }

  const handleCheckbox = setState => event => {
    setState(event.target.checked)
  }
  if (loading) {
    return (
      <Dialog fullWidth open={open}>
        <CircularProgress />
      </Dialog>
    )
  }
  if (!data || error) {
    return (
      <Dialog fullWidth open={open}>
        <DialogContentText>
          <DialogContentText>{error ? `There was an error` : 'No data '}</DialogContentText>
        </DialogContentText>
      </Dialog>
    )
  }

  const handleSubmit = async e => {
    console.log('amount: ', amount)
    await addTransaction({
      variables: {
        user_id: user,
        merchant_id: merchant,
        description,
        amount: parseInt(amount),
        debit,
        credit
      }
    })
    handleClose()
  }

  const { users, merchants } = data

  return (
    <Dialog fullWidth open={open}>
      <DialogTitle css={titleCss}>Create New Transaction</DialogTitle>
      <DialogContent>
        <form css={formContainer}>
          <FormControl css={formControlCss}>
            <InputLabel id='user-select-label'>User</InputLabel>
            <Select id='user-select' labelId='user-select-label' onChange={handleChange(setUser)} value={user}>
              {users.map(user => (
                <MenuItem
                  key={`users-select-${user.id}`}
                  value={user.id}
                >{`${user.firstName} ${user.lastName}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl css={formControlCss}>
            <InputLabel id='merchant-select-label'>Merchant</InputLabel>
            <Select
              id='merchant-select'
              labelId='merchant-select-label'
              onChange={handleChange(setMerchant)}
              value={merchant}
            >
              {merchants.map(merchant => (
                <MenuItem key={`merchants-select-${merchant.id}`} value={merchant.id}>{`${merchant.name}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl css={formControlCss}>
            <TextField
              id='amount-field'
              label='Amount'
              onChange={handleChange(setAmount)}
              type='number'
              value={amount}
            />
          </FormControl>
          <div css={flexContainer}>
            <FormControl css={formControlCss}>
              <FormControlLabel
                control={
                  <Checkbox checked={debit} color='primary' name='debit-checked' onChange={handleCheckbox(setDebit)} />
                }
                label='Debit'
              />
            </FormControl>
            <FormControl css={formControlCss}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={credit}
                    color='primary'
                    name='credit-checked'
                    onChange={handleCheckbox(setCredit)}
                  />
                }
                label='Credit'
              />
            </FormControl>
          </div>
          <FormControl css={formControlCss}>
            <TextField
              id='description-input'
              label='Description'
              multiline
              onChange={handleChange(setDescription)}
              value={description}
            />
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button color='secondary' onClick={handleClose}>
          Cancel
        </Button>
        <Button color='primary' onClick={handleSubmit}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}

TransactionDialog.propTypes = {
  handleClose: func,
  open: bool
}

const formContainer = css`
  display: flex;
  flex-direction: column;
`

const flexContainer = css`
  display: flex;
`

const titleCss = css`
  text-align: center;
`

const formControlCss = css`
  min-width: 200px !important;
  width: 100%;
  margin-bottom: 16px !important;
`
