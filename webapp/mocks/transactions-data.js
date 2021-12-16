const transactions = [
  {
    id: '5d5c1f747e01cd704f18f863',
    user: {
      id: '61ab155437c1e82d19cdc0be',
      firstName: 'Mark',
      lastName: 'Artishuk',
      dob: '01/01/1970'
    },
    description: 'cleaningsupplies',
    merchant: {
      id: '61ab1d966485fd30c19fce9d',
      name: 'walmart',
      description: 'Default Merchant Description'
    },
    debit: true,
    credit: false,
    amount: 150
  },
  {
    id: '61bafef9b1513e8205969f1b',
    amount: 20,
    credit: false,
    debit: true,
    description: 'Deluxe Sandwich',
    user: {
      id: '61ba448ab1513e8205969f16',
      firstName: 'John',
      lastName: 'Doe',
      dob: ''
    },
    merchant: {
      id: '61ba3f61b1513e8205969f10',
      name: 'Chick Fil A',
      description: 'Quality Sandwiches'
    }
  }
]

export { transactions }
