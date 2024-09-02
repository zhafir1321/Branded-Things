import { createBrowserRouter, redirect } from 'react-router-dom';
import Login from '../views/Login';
import Toastify from 'toastify-js';
import BaseLayout from '../layout/BaseLayout';
import Home from '../views/Home';
import AddProduct from '../views/AddProduct';
import EditProduct from '../views/EditProduct';
import AddStaff from '../views/AddStaff';
import CategoryList from '../views/CategoryList';

const url = 'https://ch1.zhafirhafidz.dev/';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login url={url} />,
    loader: () => {
      if (localStorage.access_token) {
        Toastify({
          text: 'kamu berhasill login',
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
        return redirect('/home');
      }
      return null;
    },
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        Toastify({
          text: 'Please login first',
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
        return redirect('/login');
      }
      return null;
    },
    children: [
      {
        path: '/',
        element: <Home url={url} />,
      },
      {
        path: '/add-product',
        element: <AddProduct url={url} />,
      },
      {
        path: '/edit-product/:id',
        element: <EditProduct url={url} />,
      },
      {
        path: '/add-user',
        element: <AddStaff url={url} />,
      },
      {
        path: '/categories',
        element: <CategoryList url={url} />,
      },
    ],
  },
]);

export default router;
