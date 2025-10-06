import { redirect } from 'next/navigation'
import { auth } from '~/server/auth'

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  if (session) redirect('/dashboard')

  return children
}
