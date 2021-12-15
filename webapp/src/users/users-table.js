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
import GetUsers from '../gql/users.gql'
import { BasicError } from '../components/errors/BasicError'
import { object } from 'prop-types'

export const UsersTable = () => {
  const { data, loading, error } = useQuery(GetUsers)

  if (loading) return <CircularProgress />

  if (error) return <BasicError />

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>DOB</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.users.map(user => (
            <Row key={user.id + '-row'} user={user} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const Row = ({ user }) => {
  return (
    <TableRow>
      <TableCell>{user.id}</TableCell>
      <TableCell>{user.firstName}</TableCell>
      <TableCell>{user.lastName}</TableCell>
      <TableCell>{user.dob}</TableCell>
    </TableRow>
  )
}

Row.propTypes = {
  user: object
}
