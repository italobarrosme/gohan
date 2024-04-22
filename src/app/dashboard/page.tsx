import { LogoutForm } from '@/modules/Authentication/Forms/LogoutForm'

export default async function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <LogoutForm />
    </div>
  )
}
