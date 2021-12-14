import React from 'react'
import { TextField } from '@material-ui/core'

import { css } from '@emotion/react'

export const MerchantsForm = () => {
  return (
    <form css={formContainer}>
      <TextField label='Name' />
    </form>
  )
}

const formContainer = css`
  display: grid;
  grid-template-columns: 1fr;

  max-width: 800px;
  width: 100%;
`
