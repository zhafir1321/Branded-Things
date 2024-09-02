import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toastify from 'toastify-js';

export default function Login({ url }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${url}login`, { username, password });

      localStorage.setItem('access_token', data.access_token);

      Toastify({
        text: 'Success Login',
        duration: 2000,
        close: false,
        style: {
          background: '#B3C8CF',
          color: '#17202A',
          boxShadow: '0 5px 10px black',
          fontWeight: 'bold',
        },
        position: 'right',
      }).showToast();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  function usernameOnChange(e) {
    setUsername(e.target.value);
  }

  function passwordOnChange(e) {
    setPassword(e.target.value);
  }

  return (
    <>
      <form className="max-w-sm mx-auto" onSubmit={handleLogin}>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your username
          </label>
          <input
            type="username"
            id="username"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Username..."
            required
            onChange={usernameOnChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            onChange={passwordOnChange}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
      </form>
    </>
  );
}
