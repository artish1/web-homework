/* eslint-disable no-unused-vars */
const path = require('path')
const graphql = require('graphql')
const { GraphQLList, GraphQLString, GraphQLObjectType } = graphql

const { TransactionModel: Transaction } = require(path.join('..', 'data-models', 'Transaction'))
const TransactionType = require('./transaction-type')

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString, resolve: parent => parent._id },
    dob: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString }
  })
})

module.exports = UserType
