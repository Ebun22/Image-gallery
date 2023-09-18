import Image from 'next/image'
import { UserAuth } from './components'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <UserAuth />
    </main>
  )
}
