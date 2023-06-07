import Nav from '../components/Nav.js'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '../components/Footer.js'
import { AuthProvider } from '../../context/AuthContext.js'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AniManager',
  description: 'Watch anime in the right way',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary">
        <AuthProvider>
          <Nav metadata={metadata} />
          {children}
          <Footer metadata={metadata}/>
        </AuthProvider>
      </body>
    </html>
  )
}
