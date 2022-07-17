import { useRouter } from 'next/router'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faMicrochip,
  faLightbulb,
  faHeart,
} from '@fortawesome/free-solid-svg-icons'

const list = [
  {
    name: '首页',
    link: '/',
    icon: () => <FontAwesomeIcon icon={faHome} />,
    extract: true,
  },
  {
    name: '编程技术',
    link: '/category/programming-technology',
    icon: () => <FontAwesomeIcon icon={faMicrochip} />,
  },
  {
    name: '编程思想',
    link: '/category/thinking-programming',
    icon: () => <FontAwesomeIcon icon={faLightbulb} />,
  },
]

const List = () => {
  const router = useRouter()

  return list.map(item => (
    <li key={item.link}>
      <Link href={item.link}>
        <a className={router.asPath === item.link ? 'active' : ''}>
          {item.icon()}
          {item.name}
        </a>
      </Link>
    </li>
  ))
}

export const BaseHeader = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
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
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {List()}
          </ul>
        </div>
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl">朝闻道</a>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{List()}</ul>
      </div>
      <div className="navbar-end">
        <button className="btn gap-2">
          <FontAwesomeIcon icon={faHeart} />
          Hello World
        </button>
      </div>
    </div>
  )
}
