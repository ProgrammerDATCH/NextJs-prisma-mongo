'use client'
import { useEffect, useState } from "react";

const getProducts = async () => {
  const response = await fetch("/api/products");
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

const addProduct = async () => {
  const response = await fetch("/api/products", { method: "POST" });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

const deleteAllProducts = async () => {
  const response = await fetch("/api/products", { method: "DELETE" });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.text();
};

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    })();
  }, []);
  
  const handleAddProduct = async () => {
    try {
      const newProduct = await addProduct();
      setProducts(prevProducts => [...prevProducts, newProduct]);
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const handleDeleteAllProducts = async () => {
    try {
      await deleteAllProducts();
      setProducts([]);
    } catch (error) {
      console.error('Failed to delete products:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products && products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-1">Price: ${product.price}</p>
            <p className="text-gray-600 mb-1">Shop: {product.shop.name}</p>
          </div>
        ))}
      </div>
      <button 
        onClick={handleAddProduct} 
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
      >
        ADD
      </button>
      <button 
        onClick={handleDeleteAllProducts} 
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
      >
        DELETE ALL
      </button>
    </main>
  );
}
