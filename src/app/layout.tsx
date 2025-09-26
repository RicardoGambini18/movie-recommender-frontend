import { type Metadata } from 'next'
import { Roboto } from 'next/font/google'
import '~/styles/globals.css'
import { TRPCReactProvider } from '~/trpc/react'

export const metadata: Metadata = {
  title: 'Recomendador de películas',
  description: 'Proyecto final del curso Algoritmos y Estructuras de Datos',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={roboto.variable}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  )
}
