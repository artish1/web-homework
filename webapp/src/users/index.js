import { css } from '@emotion/react'
import React from 'react'
import { UsersForm } from './users-form'
import { UsersTable } from './users-table'

export const UsersPage = () => {
  return (
    <div css={root}>
      <UsersForm />
      <UsersTable />
    </div>
  )
}

const root = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
