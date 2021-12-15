const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLFloat } = graphql
const MerchantType = require('./merchant-type')
const { MerchantModel } = require('../data-models/Merchant')
const { UserModel } = require('../data-models/User')
const UserType = require('./user-type')

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve(parent) {
        return parent.id ? parent.id : parent._id
      }
    },
    user_id: { type: GraphQLString },
    description: { type: GraphQLString },
    merchant_id: { type: GraphQLString },
    debit: { type: GraphQLBoolean },
    credit: { type: GraphQLBoolean },
    amount: { type: GraphQLFloat },
    user: {
      type: UserType,
      resolve(parent) {
        return UserModel.findById(parent.user_id)
      }
    },
    merchant: {
      type: MerchantType,
      resolve(parent) {
        return MerchantModel.findById(parent.merchant_id)
      }
    }
  })
})

module.exports = TransactionType
