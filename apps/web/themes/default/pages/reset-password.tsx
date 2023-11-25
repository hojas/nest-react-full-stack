import { Card, Form, Button } from 'react-bootstrap'

export function ResetPasswordPage({
  setOldPassword,
  setNewPassword,
  setConfirmPassword,
  onResetPassword,
}: {
  setOldPassword: (password: string) => void
  setNewPassword: (password: string) => void
  setConfirmPassword: (password: string) => void
  onResetPassword: () => void
}) {
  return (
    <Card className="w-1/3 my-10 mx-auto">
      <Card.Header className="text-center">设置密码</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>旧密码</Form.Label>
            <Form.Control
              type="password"
              placeholder="输入旧密码"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>新密码</Form.Label>
            <Form.Control
              type="password"
              placeholder="输入新密码"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>确认密码</Form.Label>
            <Form.Control
              type="password"
              placeholder="再次输入新密码"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="button" onClick={onResetPassword}>
            登录
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}
