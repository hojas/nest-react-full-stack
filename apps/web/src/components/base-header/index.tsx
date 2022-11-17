import {
  HiOutlineHome,
  HiOutlineChip,
  HiOutlineLightBulb,
} from 'react-icons/hi'
import { BaseHeaderLeft } from './base-header-left'
import { BaseHeaderCenter } from './base-header-center'
import { BaseHeaderRight } from './base-header-right'

const navbarList = [
  {
    name: '首页',
    link: '/',
    Icon: () => <HiOutlineHome />,
    extract: true,
  },
  {
    name: '编程技术',
    link: '/category/programming-technology',
    Icon: () => <HiOutlineChip />,
  },
  {
    name: '编程思想',
    link: '/category/thinking-programming',
    Icon: () => <HiOutlineLightBulb />,
  },
]

export const BaseHeader = () => (
  <div className="sticky top-0 px-5">
    <div className="navbar bg-base-100 rounded-box shadow-lg">
      <BaseHeaderLeft navbarList={navbarList} />
      <BaseHeaderCenter navbarList={navbarList} />
      <BaseHeaderRight />
    </div>
  </div>
)
