import { useLogin } from '../modules/login/use-login.hook'
import { LoginPage } from '../themes'

const Page = () => LoginPage(useLogin())

export default Page
