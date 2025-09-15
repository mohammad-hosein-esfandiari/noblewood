import React, { FC } from 'react'
interface HeadProps {
  count : number 
}

export const Head:FC<HeadProps> = ({count}) => {
  return (
    <div className="mb-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-2">
      Shopping Cart
    </h1>
    <p className="text-gray-600"><strong>{count}</strong> items in your cart</p>
  </div>
  )
}
