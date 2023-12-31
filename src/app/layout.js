'use client'
import './globals.css';
import ContextProvider from '@/Context/context';
import StateContext from '@/Context/context';
import AuthContextProvider from '@/Context/AuthContext';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gallary application',
  description: 'Generated by Ebunoluwa David-Suberu',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <ContextProvider>
            {children}
          </ContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
