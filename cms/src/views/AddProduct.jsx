import axios from 'axios';
import FormProduct from '../components/FormProduct';
import { useNavigate } from 'react-router-dom';
import Toastify from 'toastify-js';

export default function AddProduct({ url }) {
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
      const addedProduct = {
        name,
        description,
        price: +price,
        imgUrl,
        stock: +stock,
        categoryId: +categoryId,
      };

      const { data } = await axios.post(`${url}products`, addedProduct, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      Toastify({
        text: 'Success add new data',
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'left',
        stopOnFocus: true,
        style: {
          background: '#00B29F',
          color: '#17202A',
          boxShadow: '0 5px 10px black',
          fontWeight: 'bold',
        },
      }).showToast();

      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="m-10">
        <FormProduct url={url} handleSubmit={handleSubmit} />
      </div>
    </>
  );
}
