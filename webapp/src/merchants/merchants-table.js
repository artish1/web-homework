import React from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress
} from '@material-ui/core'
import { useQuery } from '@apollo/client'
import GetMerchants from '../gql/merchants.gql'
import { BasicError } from '../components/errors/BasicError'
import { object } from 'prop-types'

export const MerchantsTable = () => {
  const { data, loading, error } = useQuery(GetMerchants)

  if (loading) return <CircularProgress />

  if (error) return <BasicError />

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.merchants.map(merchant => (
            <Row key={merchant.id + '-row'} merchant={merchant} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const Row = ({ merchant }) => {
  return (
    <TableRow>
      <TableCell>{merchant.id}</TableCell>
      <TableCell>{merchant.name}</TableCell>
      <TableCell>{merchant.description}</TableCell>
    </TableRow>
  )
}

Row.propTypes = {
  merchant: object
}
