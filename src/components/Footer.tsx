import Link from "next/link";


export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 p-6 mt-10 border-t">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 text-sm">
        <div>
          <h4 className="font-bold mb-2">RSGRT Institute</h4>
          <p>Geospatial and Environmental Research & Training</p>
          <p className="mt-1">Chitwan, Nepal</p>
        </div>

        <div>
          <h4 className="font-bold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/news" className="hover:underline">News</Link></li>
            <li><Link href="/courses" className="hover:underline">Courses</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-2">Contact</h4>
          <p>Email: info@rsgrt.com.np</p>
          <p>Phone: +977-9765662427</p>
          <Link
            href="https://wa.me/9779765662427"
            target="_blank"
            className="text-green-600 hover:underline mt-1 inline-block"
          >
            Message CEO on WhatsApp
          </Link>
        </div>
      </div>
      <p className="text-center mt-6 text-xs text-gray-500">
        &copy; {new Date().getFullYear()} RS GRT Institute. All rights reserved.
      </p>
    </footer>
  )
}
