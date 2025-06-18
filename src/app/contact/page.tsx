import { FaWhatsapp } from 'react-icons/fa'

export default function ContactPage() {
  const whatsappNumber = '9779702629297' // Replace with your actual number

  return (
    <main className="max-w-3xl mt-20 mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>

      <div className="bg-white shadow rounded p-6 space-y-4">
        <p className="text-gray-700">
          Have questions about our courses or want to collaborate? Reach out to us:
        </p>

        <div className="space-y-2">
          <p><strong>Email:</strong> contact.rsgrt@gmail.com</p>
          <p><strong>Phone:</strong> +977-9702629297</p>
        </div>

        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
        >
          <FaWhatsapp size={20} />
          Chat with us on WhatsApp
        </a>
      </div>
    </main>
  )
}
