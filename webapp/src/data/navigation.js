import { Home } from '../home'
import { Transactions } from '../transactions'
import HomeIcon from '@material-ui/icons/Home'
import PeopleIcon from '@material-ui/icons/People'
import ReceiptIcon from '@material-ui/icons/Receipt'
import StorefrontIcon from '@material-ui/icons/Storefront'
import { UsersPage } from '../users'
import { MerchantsPage } from '../merchants'

const navigationData = [
  {
    label: 'Home',
    route: '/',
    component: Home,
    icon: HomeIcon,
    exact: true
  },
  {
    label: 'Transactions',
    route: '/transactions',
    component: Transactions,
    icon: ReceiptIcon,
    exact: false
  },
  {
    label: 'Users',
    route: '/users',
    component: UsersPage,
    icon: PeopleIcon,
    exact: true
  },
  {
    label: 'Merchants',
    route: '/merchants',
    component: MerchantsPage,
    icon: StorefrontIcon,
    exact: true
  }
]

export default navigationData
