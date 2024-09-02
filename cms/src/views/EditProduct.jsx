import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormProduct from '../components/FormProduct';
import Toastify from 'toastify-js';

export default function EditProduct({ url }) {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  async function handleSubmit(
    e,
    name,
    description,
    price,
    imgUrl,
    stock,
    categoryId,
  ) {
    e.preventDefault();
    try {
      const body = {
        name,
        description,
        price: +price,
        imgUrl,
        stock: +stock,
        categoryId: +categoryId,
      };

      const { data } = await axios.put(`${url}products/${id}`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      navigate('/home');
      Toastify({
        text: `Succedd edit product`,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: 'bottom', // `top` or `bottom`
        position: 'right', // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: '#008000',
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    } catch (error) {
      Toastify({
        text: error.response.data.error,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: 'bottom', // `top` or `bottom`
        position: 'right', // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: '#FF0000',
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  }

  async function getProduct() {
    try {
      const { data } = await axios.get(`${url}products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setProduct(data.product);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <FormProduct
        url={url}
        product={product}
        handleSubmit={handleSubmit}
        nameProp="Edit Product"
      />
    </>
  );
}
