import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Updateproduct() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const prod = state?.product;

  // Initialize state from passed-in product
  const [id]          = useState(prod?.id || '');
  const [name, setName]          = useState(prod?.name || '');
  const [description, setDescription] = useState(prod?.description || '');
  const [price, setPrice]        = useState(prod?.price?.toString() || '');
  const [image, setImage]        = useState(prod?.image || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    const updated = {
      id,
      name,
      description,
      price: parseInt(price, 10),
      image
    };

    axios
      .put('http://localhost:8080/products/updateProduct', updated)
      .then(() => {
        alert('Product updated!');
        navigate('/admin_page');
      })
      .catch(err => {
        console.error('Update failed:', err);
        alert('Error updating product');
      });
  };
  return (
  <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow">
    <h2 className="text-2xl font-bold mb-4 text-center">Update Product</h2>

    <input
      type="text"
      placeholder="Product Name"
      className="w-full p-2 mb-3 border rounded"
      value={name}
      onChange={e => setName(e.target.value)}
    />

    <input
      type="text"
      placeholder="Description"
      className="w-full p-2 mb-3 border rounded"
      value={description}
      onChange={e => setDescription(e.target.value)}
    />

    <input
      type="number"
      placeholder="Price"
      className="w-full p-2 mb-3 border rounded"
      value={price}
      onChange={e => setPrice(e.target.value)}
    />

    <input
      type="text"
      placeholder="Image URL"
      className="w-full p-2 mb-4 border rounded"
      value={image}
      onChange={e => setImage(e.target.value)}
    />

    <button className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
      Update Product
    </button>
  </form>
);
}