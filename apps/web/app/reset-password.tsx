import { useResetPassword } from '../modules/reset-password/use-reset-password.hook'
import { ResetPasswordPage } from '../themes'

const Page = () => ResetPasswordPage(useResetPassword())

export default Page
