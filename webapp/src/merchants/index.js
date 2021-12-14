import { css } from '@emotion/react'
import React from 'react'
import { MerchantsTable } from './merchants-table'

export const MerchantsPage = () => {
  return (
    <div css={rootContainer}>
      <MerchantsTable />
    </div>
  )
}

const rootContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`
