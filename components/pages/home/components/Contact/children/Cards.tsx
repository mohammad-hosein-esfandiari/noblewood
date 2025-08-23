import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

export const Cards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ animationDelay: '0.3s' }}>
    {[
      {
        icon: <Phone className="w-8 h-8" />,
        title: "Call Us",
        info: "+1 (555) 123-4567",
        description: "Mon-Fri 9AM-6PM"
      },
      {
        icon: <Mail className="w-8 h-8" />,
        title: "Email Us",
        info: "hello@noblewood.com",
        description: "We reply within 24 hours"
      },
      {
        icon: <MapPin className="w-8 h-8" />,
        title: "Visit Us",
        info: "123 Craft Street, Wood City",
        description: "Showroom & Workshop"
      }
    ].map((contact, index) => (
      <div key={index} className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-amber-100" style={{ animationDelay: `${0.6 + index * 0.2}s` }}>
        <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
          <div className="text-white">
            {contact.icon}
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-amber-700 transition-colors duration-300">
          {contact.title}
        </h3>
        <p className="text-lg font-semibold text-amber-700 mb-2">{contact.info}</p>
        <p className="text-gray-600">{contact.description}</p>
      </div>
    ))}
  </div>
  )
}
