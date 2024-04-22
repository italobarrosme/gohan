import { LoginForm, RegisterForm } from '@/modules/Authentication/Forms'
import { CardInfo } from '@/shared/components/CardInfo'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/Tabs'

export const AuthSwitch = () => {
  return (
    <Tabs defaultValue="login" className="w-96">
      <TabsList className="flex justify-between text-brand-light">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <CardInfo title="Already have an account? Login here.">
          <LoginForm />
        </CardInfo>
      </TabsContent>
      <TabsContent value="register">
        <CardInfo title="Don't have an account? Register here.">
          <RegisterForm />
        </CardInfo>
      </TabsContent>
    </Tabs>
  )
}
