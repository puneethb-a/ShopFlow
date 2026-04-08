// src/pages/Customer.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Customer() {
  const [username, setUsername] = useState('');
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('username') || '';
    setUsername(stored);
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get('http://localhost:8080/products/all')
      .then(res => {
        setProducts(res.data);
        // default qty = 1 for each
        const q = {};
        res.data.forEach(p => q[p.id] = 1);
        setQuantities(q);
      })
      .catch(err => console.error('Failed to fetch products:', err));
  };

  const handleQuantityChange = (pid, val) => {
    const v = Math.max(1, parseInt(val, 10) || 1);
    setQuantities(q => ({ ...q, [pid]: v }));
  };

  const handleCart = (prod) => {
    const payload = {
      username,
      prod,
      quantity: quantities[prod.id] || 1
    };
    axios
      .post('http://localhost:8080/addToCart', payload)
      .then(() => alert('Added to cart!'))
      .catch(err => console.error('Add to cart failed:', err));
  };
  return (
  <>
    <div className="p-4 flex justify-between items-center">
      <h2 className="text-xl font-bold">Welcome {username}</h2>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => navigate('/view_cart_page')}
      >
        View Cart 🛒
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      {products.map(p => (
        <div key={p.id} className="bg-white p-4 rounded shadow">
          <img src={p.image} className="h-40 w-full object-cover rounded" />
          <h3 className="font-bold">{p.name}</h3>
          <p>{p.description}</p>
          <p className="font-semibold">₹{p.price}</p>

          <input
            type="number"
            className="border p-1 w-16 mt-2"
            value={quantities[p.id]}
            onChange={e => handleQuantityChange(p.id, e.target.value)}
          />

          <button
            className="block mt-2 bg-blue-600 text-white px-3 py-1 rounded"
            onClick={() => handleCart(p)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  </>
);
}