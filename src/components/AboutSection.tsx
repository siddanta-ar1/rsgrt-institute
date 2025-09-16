'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutSection() {
  return (
    <section className="relative py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              About RS GRT Institute
            </span>
          </h2>

          <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8">
            <span className="font-semibold text-blue-600">RSGRT Institute</span> is an international hub 
            for geospatial, environmental, and disaster-related research training. Our mission is to 
            empower <span className="font-medium">students, researchers, and professionals</span> with 
            practical skills in <span className="font-semibold">GIS, remote sensing, Python, R</span>, 
            and advanced data analysis — preparing them for real-world problem solving.
          </p>

          {/* Highlight Features */}
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: 'Hands-on Learning', desc: 'Practical training with real-world datasets.' },
              { title: 'Expert Mentorship', desc: 'Guidance from leading researchers & professionals.' },
              { title: 'Global Community', desc: 'Connect with learners and experts worldwide.' },
              { title: 'Career Focused', desc: 'Upskill for jobs in GIS, Remote Sensing, and more.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-white/70 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500"
              >
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Visual */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="relative flex justify-center md:justify-end"
        >
          <div className="relative w-[300px] md:w-[400px] lg:w-[450px] h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://media.istockphoto.com/id/1359499268/photo/young-woman-working-at-home-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=ThyLJitUy84DGOfb1MprsN0sh38Jz538_R3ObgoRyhk=" // <-- Replace with your actual image
              alt="About RS GRT Institute"
              fill
              className="object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
