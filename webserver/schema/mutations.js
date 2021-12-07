const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLFloat, GraphQLList, GraphQLInputObjectType } = graphql
const { TransactionModel } = require('../data-models/Transaction')
const { UserModel } = require('../data-models/User')
const { MerchantModel } = require('../data-models/Merchant')
const TransactionType = require('./transaction-type')
const UserType = require('./user-type')
const MerchantType = require('./merchant-type')

const TransactionInputs = new GraphQLInputObjectType({
  name: 'TransactionValues',
  fields: {
    user_id: { type: GraphQLString },
    description: { type: GraphQLString },
    merchant_id: { type: GraphQLString },
    debit: { type: GraphQLBoolean },
    credit: { type: GraphQLBoolean },
    amount: { type: GraphQLFloat }
  },
  description: 'Values for Transaction Type'
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTransaction: {
      type: TransactionType,
      args: {
        values: { type: TransactionInputs }
      },
      resolve(
        parentValue,
        {
          values: { user_id, description, merchant_id, debit, credit, amount }
        }
      ) {
        return new TransactionModel({ user_id, description, merchant_id, debit, credit, amount }).save()
      }
    },
    removeTransaction: {
      type: GraphQLList(TransactionType),
      args: {
        transaction_id: { type: GraphQLString }
      },
      async resolve(parent, { transaction_id }) {
        await TransactionModel.findByIdAndDelete(transaction_id)
        return TransactionModel.find()
      }
    },
    editTransaction: {
      type: TransactionType,
      args: {
        transaction_id: { type: GraphQLString },
        values: { type: TransactionInputs }
      },

      resolve(parent, { transaction_id, values }) {
        return TransactionModel.findByIdAndUpdate(transaction_id, values, { new: true })
      }
    },
    addUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        dob: { type: GraphQLString }
      },
      resolve(parentValue, { firstName, lastName, dob }) {
        return new UserModel({ firstName, lastName, dob }).save()
      }
    },
    addMerchant: {
      type: MerchantType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString }
      },
      resolve(parentValue, { name, description }) {
        return new MerchantModel({ name, description }).save()
      }
    }
  }
})

module.exports = mutation
