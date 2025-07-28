'use client';

import React, { useEffect, useState } from 'react';

const ProductsPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.result);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map(product => (
            <div key={product.id} className="border p-4 rounded">
              <img src={product.images?.[0]?.src} alt={product.name} className="w-full h-40 object-cover" />
              <h2 className="mt-2 font-medium">{product.name}</h2>
              <p className="text-green-700 mt-1">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
