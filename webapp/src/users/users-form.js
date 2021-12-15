import React, { useState } from 'react'
import { TextField, FormControl } from '@material-ui/core'

import { css } from '@emotion/react'
import { BasicForm } from '../components/form/BasicForm'

import AddUserMutation from '../gql/addUsers.gql'
import { useMutation } from '@apollo/client'

export const UsersForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDob] = useState('')
  const [addUser] = useMutation(AddUserMutation, {
    refetchQueries: ['GetUsers']
  })

  const handleChange = setState => e => {
    setState(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const res = await addUser({
      variables: {
        firstName,
        lastName,
        dob
      }
    })

    console.log('REs: ', res)

    setFirstName('')
    setLastName('')
    setDob('')
  }

  return (
    <BasicForm handleSubmit={handleSubmit}>
      <h3 css={title}>Create User</h3>
      <FormControl css={margin}>
        <TextField
          id='firstName-field'
          label='First Name'
          onChange={handleChange(setFirstName)}
          required
          value={firstName}
          variant='outlined'
        />
      </FormControl>
      <FormControl css={margin}>
        <TextField
          id='lastName-field'
          label='Last Name'
          onChange={handleChange(setLastName)}
          required
          value={lastName}
          variant='outlined'
        />
      </FormControl>
      <FormControl css={margin}>
        <TextField id='date-field' label='DOB' onChange={handleChange(setDob)} value={dob} variant='outlined' />
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
