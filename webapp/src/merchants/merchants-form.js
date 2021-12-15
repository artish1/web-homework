import React, { useState } from 'react'
import { TextField, FormControl } from '@material-ui/core'

import { css } from '@emotion/react'
import { BasicForm } from '../components/form/BasicForm'

import AddMerchantMutation from '../gql/addMerchant.gql'
import { useMutation } from '@apollo/client'

export const MerchantsForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [addMerchant] = useMutation(AddMerchantMutation, {
    refetchQueries: ['GetMerchants']
  })

  const handleChange = setState => e => {
    setState(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    await addMerchant({
      variables: {
        name,
        description
      }
    })

    setName('')
    setDescription('')
  }

  return (
    <BasicForm handleSubmit={handleSubmit}>
      <h3 css={title}>Create Merchant</h3>
      <FormControl css={margin}>
        <TextField label='Name' onChange={handleChange(setName)} required value={name} variant='outlined' />
      </FormControl>
      <FormControl css={margin}>
        <TextField
          label='Description'
          multiline
          onChange={handleChange(setDescription)}
          value={description}
          variant='outlined'
        />
      </FormControl>
    </BasicForm>
  )
}

const title = css`
  text-align: center;
  margin-bottom: 32px;
`

const margin = css`
  margin-bottom: 16px !important;
`
