import { Restore } from '@/modules/Restore'
import { unstable_noStore } from 'next/cache'

export default async function Dashboard() {
  unstable_noStore()
  return <Restore />
}
