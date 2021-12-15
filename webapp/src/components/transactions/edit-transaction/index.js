import React from 'react'
import { CircularProgress, Modal, Paper } from '@material-ui/core'
import { useHistory, useParams } from 'react-router'
import { css } from '@emotion/react'
import { useQuery } from '@apollo/client'
import EditTransactionQuery from '../../../gql/editTransactionQuery.gql'
import { BasicError } from '../../errors/BasicError'
import { EditForm } from './edit-form'

export const EditTransaction = () => {
  const history = useHistory()
  const { transactionId } = useParams()
  const { data, loading, error } = useQuery(EditTransactionQuery, {
    variables: {
      transactionId
    }
  })

  if (loading) {
    return (
      <Modal onClose={() => history.goBack()} open>
        <Paper css={container}>
          <CircularProgress />
        </Paper>
      </Modal>
    )
  }

  if (error) {
    return (
      <Modal onClose={() => history.goBack()} open>
        <Paper css={container}>
          <BasicError />
        </Paper>
      </Modal>
    )
  }

  return (
    <Modal onClose={() => history.goBack()} open>
      <Paper css={container}>{data && <EditForm data={data} />}</Paper>
    </Modal>
  )
}

const container = css`
  outline: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 24px;
  width: 300px;
`
