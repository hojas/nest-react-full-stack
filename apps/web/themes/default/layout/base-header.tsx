'use client'

import { Container, Nav, Navbar } from 'react-bootstrap'

export function BaseHeader() {
  return (
    <Navbar
      className="shadow-[0_1px_3px_hsla(0,0%,7%,.1)]"
      expand="md"
      bg="light"
      data-bs-theme="light"
    >
      <Container>
        <Navbar.Brand href="/">Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">首页</Nav.Link>
            <Nav.Link href="/topic/programming">
              编程技术
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
