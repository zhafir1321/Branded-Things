import axios from 'axios';
import { useEffect, useState } from 'react';

export default function CategoryList({ url }) {
  const [categories, setCategories] = useState([]);
  async function getCategories() {
    try {
      const { data } = await axios.get(`${url}categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="overflow-x-auto w-screen">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((el, i) => (
              <tr>
                <td>{i + 1}</td>
                <td>{el.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
