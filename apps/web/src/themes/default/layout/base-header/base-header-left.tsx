import { MobileDropdown } from './mobile-dropdown'
import Link from 'next/link'

export const BaseHeaderLeft = ({ navbarList }) => (
  <div className="navbar-start">
    <MobileDropdown navbarList={navbarList} />
    <Link className="btn btn-ghost normal-case text-xl" href="/">
      nest-react-blog
    </Link>
  </div>
)
