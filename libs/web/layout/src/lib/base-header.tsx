import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  HiOutlineHome,
  HiOutlineChip,
  HiOutlineLightBulb,
} from 'react-icons/hi'
import { ImBooks, ImGithub } from 'react-icons/im'

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

const NavbarList = () => {
  const router = useRouter()
  const activeClassName = (link: string) =>
    router.asPath === link ? 'active' : ''

  return (
    <>
      {navbarList.map(({ name, link, Icon }) => (
        <li key={link}>
          <Link href={link}>
            <a className={activeClassName(link)}>
              <Icon />
              {name}
            </a>
          </Link>
        </li>
      ))}
    </>
  )
}

const MobileDropdown = () => (
  <div className="dropdown">
    <label tabIndex={0} className="btn btn-ghost lg:hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h8m-8 6h16"
        />
      </svg>
    </label>
    <ul
      tabIndex={0}
      className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 w-52"
    >
      <NavbarList />
    </ul>
  </div>
)

const BaseHeaderLeft = () => (
  <div className="navbar-start">
    <MobileDropdown />
    <Link href="/">
      <a className="btn btn-ghost normal-case text-xl">朝闻道</a>
    </Link>
  </div>
)

const BaseHeaderCenter = () => (
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal p-0">
      <NavbarList />
    </ul>
  </div>
)

const BaseHeaderRight = () => (
  <div className="navbar-end">
    <a className="btn btn-ghost gap-1" href="/fe-stack/" target="_blank">
      <ImBooks />
      前端技术栈
    </a>
    <a
      className="btn btn-ghost gap-1"
      href="https://github.com/hojas"
      target="_blank"
      rel="noopener noreferrer nofollow"
    >
      <ImGithub />
      Github
    </a>
  </div>
)

export const BaseHeader = () => (
  <div className="sticky top-0 px-5">
    <div className="navbar bg-base-100 rounded-box shadow-lg">
      <BaseHeaderLeft />
      <BaseHeaderCenter />
      <BaseHeaderRight />
    </div>
  </div>
)
