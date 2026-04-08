import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // 1. Load all products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get('http://localhost:8080/products/all')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Failed to fetch products:', err));
  };

  // 2. Delete by ID, then refresh
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/products/delete/${id}`)
      .then(() => {
        alert("Deleted!");
        fetchProducts();
      })
      .catch(err => console.error('Delete Failed: ', err));
    };

  // 3. Go to update page with product in state
  const handleUpdate = (product) => {
    navigate('/update_prod_page', { state: { product } });
  };

  const addToCart = (productId) => {
  axios.post("http://localhost:8080/addToCart", {
    username: localStorage.getItem("username"),
    prod: { id: productId },
    quantity: 1
  })
  .then(() => alert("Added to cart!"))
  .catch(err => console.log(err));
};



  return (
    <div className="p-6">
  <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

  <button
    className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
    onClick={() => navigate('/add_prod_page')}
  >
    + Add Product
  </button>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {products.map(p => (
      <div key={p.id} className="bg-white p-4 rounded-lg shadow">
        <img src={p.image} alt="" className="h-40 w-full object-cover rounded" />
        <h3 className="font-bold text-lg mt-2">{p.name}</h3>
        <p className="text-sm text-gray-600">{p.description}</p>
        <p className="font-semibold mt-2">₹{p.price}</p>

        <div className="flex gap-2 mt-3">
          <button
            className="bg-yellow-500 px-3 py-1 rounded text-white"
            onClick={() => handleUpdate(p)}
          >
            Update
          </button>

          <button
            className="bg-red-500 px-3 py-1 rounded text-white"
            onClick={() => handleDelete(p.id)}
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
  );
}