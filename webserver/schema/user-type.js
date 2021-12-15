/* eslint-disable no-unused-vars */
const path = require('path')
const graphql = require('graphql')
const { GraphQLString, GraphQLObjectType } = graphql

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
