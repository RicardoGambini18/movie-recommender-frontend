import { type Metadata } from 'next'
import { Roboto } from 'next/font/google'

import { Providers } from '~/components/providers'

import './globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'Algolab',
  description:
    'Algolab es un laboratorio interactivo de algoritmos y estructuras de datos que permite experimentar con distintas implementaciones, comparar su rendimiento y visualizar su comportamiento en tiempo real, incluyendo comparadores de algoritmos de búsqueda y ordenamiento.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={roboto.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
