import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ASCEND - Your Journey to Greatness',
  description: 'A comprehensive self-improvement platform for workout tracking, focus management, sports, and personal growth.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
          {/* Navigation */}
          <nav className="bg-gray-900/50 backdrop-blur-sm fixed w-full z-50">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                  ASCEND
                </Link>
                <div className="hidden md:flex space-x-8">
                  <Link href="/workouts" className="text-gray-300 hover:text-white transition-colors">Workout</Link>
                  <Link href="/focus" className="text-gray-300 hover:text-white transition-colors">Focus</Link>
                  <Link href="/sports" className="text-gray-300 hover:text-white transition-colors">Sports</Link>
                  <Link href="/growth" className="text-gray-300 hover:text-white transition-colors">Growth</Link>
                </div>
                <Link href="/signin" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm">
                  Sign In
                </Link>
              </div>
            </div>
          </nav>
          <main className="container mx-auto px-4 py-16 pt-24">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
