import { array, func } from 'prop-types'
import React from 'react'
import { Button } from '@material-ui/core'
import { css } from '@emotion/react'

export const BasicForm = ({ children, handleSubmit }) => {
  return (
    <form css={formContainer} onSubmit={handleSubmit}>
      {children}
      <Button type='submit'>Submit</Button>
    </form>
  )
}

const formContainer = css`
  display: grid;
  grid-template-columns: 1fr;

  max-width: 400px;
  width: 100%;
  padding: 16px;
  background-color: white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);

  box-sizing: border-box;

  margin-bottom: 16px;
`

BasicForm.propTypes = {
  children: array,
  handleSubmit: func
}
