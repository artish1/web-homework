const graphql = require('graphql')
const TransactionType = require('./transaction-type')
const Transactions = require('../query-resolvers/transaction-resolvers.js')
const UserType = require('./user-type')
const MerchantType = require('./merchant-type')
const { UserModel: Users } = require('../data-models/User')
const { MerchantModel: Merchant } = require('../data-models/Merchant')

const { GraphQLBoolean, GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } = graphql
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    transaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return Transactions.findOne(args.id)
      }
    },
    transactions: {
      type: GraphQLList(TransactionType),
      args: {
        amount: { type: GraphQLFloat },
        credit: { type: GraphQLBoolean },
        debit: { type: GraphQLBoolean },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        user_id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return Transactions.find(args)
      }
    },
    users: {
      type: GraphQLList(UserType),
      resolve(parent, args) {
        return Users.find(args || {})
      }
    },
    merchants: {
      type: GraphQLList(MerchantType),
      resolve(parent, args) {
        return Merchant.find(args || {})
      }
    }
  })
})

module.exports = RootQuery
