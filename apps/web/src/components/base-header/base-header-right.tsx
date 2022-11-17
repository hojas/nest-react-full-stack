import { ImGithub } from 'react-icons/im'

export const BaseHeaderRight = () => (
  <div className="navbar-end">
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
