import React from 'react'
import { css } from '@emotion/react'

export const BasicError = () => {
  return (
    <div css={container}>
      <h2>It broke</h2>
      <p>Sorry, an unexpected error came up</p>
      <p>Our very productive dev team is working hard to fix the problem as shown below</p>
      <iframe
        allowFullScreen
        frameBorder='0'
        height='268'
        src='https://giphy.com/embed/J4ZvLjAEx4ANeT3dEj'
        title='It broke'
        width='480'
      />
    </div>
  )
}

const container = css`
  text-align: center;
`
