import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Toastify from 'toastify-js';
import { FaUpload } from 'react-icons/fa';

export default function Home({ url }) {
  const [products, setProducts] = useState([]);
  const [file, setFile] = useState('');

  async function getProducts() {
    try {
      const { data } = await axios.get(`${url}products`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleFileChange = async (e, id) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const { data } = await axios.patch(`${url}products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      Toastify({
        text: data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: 'bottom',
        position: 'right',
        stopOnFocus: true,
        style: {
          background: '#008000',
        },
      }).showToast();

      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  async function handleDelete(id) {
    try {
      await axios.delete(`${url}products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      Toastify({
        text: 'Success delete',
        duration: 2000,
        newWindow: true,
        close: true,
        style: {
          background: '#B3C8CF',
          color: '#17202A',
          boxShadow: '0 5px 10px black',
          fontWeight: 'bold',
        },
        position: 'right',
      }).showToast();

      getProducts();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="overflow-x-auto w-screen">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((el, i) => (
              <tr key={el.id}>
                <td>{i + 1}</td>
                <td>{el.name}</td>
                <td>
                  <img
                    src={el.imgUrl}
                    alt={el.name}
                    className="w-32 h-24 object-cover"
                  />
                  <div className="flex items-center justify-center mt-5">
                    <input
                      type="file"
                      className="file-input file-input-bordered file-input-sm max-w-xs w-3/4"
                      onChange={(e) => handleFileChange(e, el.id)}
                    />
                  </div>
                </td>
                <td>{el.price}</td>
                <td>{el.stock}</td>
                <td>{el.description}</td>
                <td>
                  <Link to={`/edit-product/${el.id}`}>
                    <button
                      type="button"
                      className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                    >
                      Edit
                    </button>
                  </Link>
                  <Link>
                    <button
                      onClick={() => handleDelete(el.id)}
                      type="button"
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Delete
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
