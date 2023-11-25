import { Container } from 'react-bootstrap'

export const BaseFooter = () => (
  <footer className="py-4 text-xs text-center text-neutral-400">
    <Container>
      <div>Copyright © 2023 - All Rights Reserved</div>
      <div className="text-center mt-2">
        <span>Powered by Nest and React</span>
        <a
          className="ml-2 text-neutral-500"
          href="https://github.com/hojas/nest-react-blog"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          本站源码
        </a>
      </div>
    </Container>
  </footer>
)
