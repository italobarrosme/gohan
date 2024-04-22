import { AuthGuard } from '../../action'
import { AuthSwitch } from './AuthSwitch'

export const Auth = async () => {
  await AuthGuard()

  return (
    <section className="flex h-screen items-center justify-center">
      <AuthSwitch />
    </section>
  )
}
