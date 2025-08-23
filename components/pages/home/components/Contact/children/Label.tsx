import { Mail } from 'lucide-react'
import React from 'react'

export const Label = () => {
  return (
    <div className="flex items-center justify-center mb-6">
    <Mail className="w-8 h-8 text-amber-500 mr-3 animate-pulse" />
    <span className="text-amber-600 font-semibold tracking-wider uppercase text-sm">
      Get In Touch
    </span>
    <Mail className="w-8 h-8 text-amber-500 ml-3 animate-pulse" />
  </div>
  )
}
