import { AuthGuard } from '../../action'

export const Auth = async () => {
  await AuthGuard()

  return (
    <div>
      <h1>Sign In</h1>
    </div>
  )
}
