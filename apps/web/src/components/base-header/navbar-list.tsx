import {useRouter} from "next/router";
import Link from "next/link";

export const NavbarList = ({ navbarList }) => {
  const router = useRouter()
  const activeClassName = (link: string) =>
    router.asPath === link ? 'active' : ''

  return (
    <>
      {navbarList.map(({ name, link, Icon }) => (
        <li key={link}>
          <Link className={activeClassName(link)} href={link}>
            <Icon />
            {name}
          </Link>
        </li>
      ))}
    </>
  )
}
