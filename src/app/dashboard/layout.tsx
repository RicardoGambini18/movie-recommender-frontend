import { redirect } from 'next/navigation'
import { auth } from '~/server/auth'

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  if (!session) redirect('/auth')

  return children
}
