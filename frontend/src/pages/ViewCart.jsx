// src/pages/ViewCart.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewCart() {
  const [username] = useState(localStorage.getItem('username') || '');
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    axios
      .get('http://localhost:8080/viewCart', { params: { username } })
      .then(res => setItems(res.data))
      .catch(err => console.error('Fetch cart failed:', err));
  };
  const removeItem = (productId) => {
    axios
      .delete(`http://localhost:8080/removeFromCart/${username}/${productId}`)
      .then(() => fetchCart())
      .catch(err => console.error('Remove failed:', err));
  };


  const updateQuantity = (item, newQty) => {
    if (newQty < 1) return;
    const payload = { username, prod: { id: item.productId }, quantity: newQty };
    axios
      .post('http://localhost:8080/updateCartItem', payload)
      .then(() => fetchCart())
      .catch(err => console.error('Update cart failed:', err));
  };
  const totalPrice = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">{username}'s Cart 🛒</h2>

      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {items.map(it => (
            <div
              key={it.productId}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <img
                  src={it.image}
                  alt={it.name}
                  className="h-20 w-20 object-cover rounded"
                />

                <div>
                  <h3 className="font-semibold">{it.name}</h3>
                  <p className="text-gray-500">₹{it.price}</p>
                </div>
              </div>

              {/* CENTER */}
              <div className="flex items-center gap-2">
                <button
                  className="bg-gray-300 px-2 rounded"
                  onClick={() => updateQuantity(it, it.quantity - 1)}
                >
                  -
                </button>

                <span className="px-3">{it.quantity}</span>

                <button
                  className="bg-gray-300 px-2 rounded"
                  onClick={() => updateQuantity(it, it.quantity + 1)}
                >
                  +
                </button>
              </div>

              {/* RIGHT */}
              <div className="text-right">
                <p className="font-semibold">
                  ₹{it.price * it.quantity}
                </p>

                <button
                  className="text-red-500 text-sm mt-1"
                  onClick={() => removeItem(it.productId)}
                >
                  Remove
                </button>
                <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded">
                  Checkout
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TOTAL */}
      <div className="mt-6 text-right">
        <h3 className="text-xl font-bold">
          Total: ₹{totalPrice}
        </h3>
      </div>
    </div>

  );
}