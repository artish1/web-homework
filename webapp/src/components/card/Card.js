import React from 'react'
import Card from '@material-ui/core/Card'
import { object } from 'prop-types'

export const StyledCard = props => {
  return (
    <Card style={{ padding: 16, boxShadow: '0px 0px 4px rgba(0,0,0,0.25)', ...props.style }}>{props.children}</Card>
  )
}

StyledCard.propTypes = {
  children: object,
  style: object
}
