import { Card, Form, Button } from 'react-bootstrap'

export function LoginPage({
  setEmail,
  setPassword,
  onLogin,
}: {
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  onLogin: () => void
}) {
  return (
    <Card className="w-1/3 my-10 mx-auto">
      <Card.Header className="text-center">登录</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>邮箱</Form.Label>
            <Form.Control
              type="email"
              placeholder="输入邮箱"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>密码</Form.Label>
            <Form.Control
              type="password"
              placeholder="输入密码"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="button" onClick={onLogin}>
            登录
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}
