import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Addproduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');   // keep as string, convert on submit
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProd = {
      name,
      description,
      price: parseInt(price, 10),  // convert to integer
      image
    };

    axios
      .post("http://localhost:8080/products/addProduct", newProd)
      .then(() => {
        alert('Product added!');
        navigate('/admin_page');
      })
      .catch(err => {
        console.error('Add product failed:', err);
        alert('Error adding product');
      });
  };
  return (
  <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow">
    <h2 className="text-2xl font-bold mb-4 text-center">Add Product</h2>

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

    <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
      Add Product
    </button>
  </form>
);
}