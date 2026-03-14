import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-slate-800 mb-2">Page Not Found</h2>
      <p className="text-slate-600 mb-6 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or is still under construction.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
      >
        Go back home
      </Link>
    </div>
  )
}