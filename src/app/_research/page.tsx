import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      fontFamily: 'sans-serif' 
    }}>
      <h1>🚧 Coming Soon! 🚧</h1>
      <p>This page is under construction. We'll be here soon.</p>
      <Link href="/">
        Go back home
      </Link>
    </div>
  )
}