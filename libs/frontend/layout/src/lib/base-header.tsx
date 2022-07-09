import { useRouter } from 'next/router'
import Link from 'next/link'

const list = [
  {
    name: '朝闻道',
    link: '/',
    extract: true,
  },
  {
    name: '编程技术',
    link: '/category/programming-technology',
  },
  {
    name: '编程思想',
    link: '/category/thinking-programming',
  },
]

const List = () => {
  const router = useRouter()

  return list.map(item => (
    <li key={item.link}>
      <Link href={item.link}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          className={
            'block py-[20px] px-[15px] text-[16px] hover:bg-[#f7f7f7] ' +
            (!item.extract && router.asPath === item.link ? 'bg-[#f0f0f0]' : '')
          }
        >
          {item.name}
        </a>
      </Link>
    </li>
  ))
}

const BaseHeader = () => (
  <div className="flex items-center mb-[30px] px-[20px] bg-white shadow-[0px_16px_12px_0px_rgb(0_0_0_/_9%)]">
    <div className="container mx-auto">
      <ul className="flex">{List()}</ul>
    </div>
  </div>
)

export default BaseHeader
