import { css } from '@emotion/react'
import React from 'react'
import { MerchantsForm } from './merchants-form'
import { MerchantsTable } from './merchants-table'

export const MerchantsPage = () => {
  return (
    <div css={rootContainer}>
      <MerchantsForm />
      <MerchantsTable />
    </div>
  )
}

const rootContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
`
