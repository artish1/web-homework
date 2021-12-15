import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button
} from '@material-ui/core'
import { object } from 'prop-types'
import React, { useState } from 'react'
import { css } from '@emotion/react'
import EditTransactionMutation from '../../../gql/editTransaction.gql'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

export const EditForm = ({ data }) => {
  const [amount, setAmount] = useState(data.transaction.amount)
  const [merchant, setMerchant] = useState(data.transaction.merchant.id)
  const [user, setUser] = useState(data.transaction.user.id)
  const [description, setDescription] = useState(data.transaction.description)
  const [debit, setDebit] = useState(data.transaction.debit)
  const [credit, setCredit] = useState(data.transaction.credit)

  const [editTransaction, { loading }] = useMutation(EditTransactionMutation, {
    refetchQueries: ['GetTransactions']
  })

  const history = useHistory()

  const handleChange = setState => e => {
    setState(e.target.value)
  }

  const handleCheckbox = setState => event => {
    setState(event.target.checked)
  }

  const handleUpdateClick = async () => {
    await editTransaction({
      variables: {
        transaction_id: data.transaction.id,
        values: {
          amount: parseInt(amount),
          merchant_id: merchant,
          user_id: user,
          description,
          debit,
          credit
        }
      }
    })
    history.goBack()
  }

  return (
    <div>
      <FormControl css={formControlCss}>
        <TextField fullWidth label='Amount' onChange={handleChange(setAmount)} type='number' value={amount} />
      </FormControl>
      <FormControl css={formControlCss}>
        <InputLabel id='merchant-select-label'>Merchant</InputLabel>
        <Select
          id='merchant-select'
          labelId='merchant-select-label'
          onChange={handleChange(setMerchant)}
          value={merchant}
        >
          {data.merchants.map(merchant => (
            <MenuItem key={`merchants-select-${merchant.id}`} value={merchant.id}>{`${merchant.name}`}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl css={formControlCss}>
        <InputLabel id='user-select-label'>User</InputLabel>
        <Select id='user-select' labelId='user-select-label' onChange={handleChange(setUser)} value={user}>
          {data.users.map(user => (
            <MenuItem key={`user-select-${user.id}`} value={user.id}>{`${user.firstName} ${user.lastName}`}</MenuItem>
          ))}
        </Select>
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
              <Checkbox checked={credit} color='primary' name='credit-checked' onChange={handleCheckbox(setCredit)} />
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
      <Button
        color='primary'
        css={buttonCss}
        disabled={loading}
        fullWidth
        onClick={handleUpdateClick}
        variant='contained'
      >
        Update
      </Button>
    </div>
  )
}

EditForm.propTypes = {
  data: object
}

const formControlCss = css`
  min-width: 200px !important;
  width: 100%;
  margin-bottom: 16px !important;
`

const buttonCss = css`
  margin-top: 16px !important;
`

const flexContainer = css`
  display: flex;
`
