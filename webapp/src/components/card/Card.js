import React from 'react'
import { object } from 'prop-types'
import { css } from '@emotion/react'

export const StyledCard = props => {
  return <div css={root}>{props.children}</div>
}

const root = css`
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  padding: 16px;
`

StyledCard.propTypes = {
  children: object
}
