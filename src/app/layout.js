import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '🥄 ✨ Clontest 2023',
  description: '🥄 ✨ Kadabra ftw'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
