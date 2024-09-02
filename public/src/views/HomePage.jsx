import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import PaginationDemo from '../components/PaginationDemo';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [filter, setFilter] = useState('');

  const limit = 10;

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `https://ch1.zhafirhafidz.dev/pub/products?search=${search}&page[number]=${currentPage}&sort=${sortOrder}&filter=${filter}`,
      );

      const totalData = data.result.totalData;
      setProducts(data.result.data);
      setPageNumber(data.result.totalPage);
      setTotalPages(Math.ceil(totalData / limit));
    } catch (error) {
      console.log(error);
    }
  };

  function handleSearch(e) {
    e.preventDefault();
    getProducts();
  }

  useEffect(() => {
    getProducts();
  }, [currentPage, sortOrder, filter]);

  return (
    <>
      <div className="h-full w-full bg-orange-400 p-4">
        <div className="">
          <form
            method="get"
            className="flex justify-center gap-2"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="btn">
              Search
            </button>
          </form>

          <div className="flex items-center">
            <label htmlFor="sortColumn" className="mr-2">
              Sort By:
            </label>

            <select
              id="sortOrder"
              className="p-2 border border-gray-300 ml-2"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </select>
          </div>
          <div className="flex items-center">
            <label htmlFor="sortColumn" className="mr-2">
              Filter By:
            </label>

            <select
              id="filter"
              className="p-2 border border-gray-300 ml-2"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="1">Fresh</option>
              <option value="2">Woody</option>
              <option value="3">Floral</option>
              <option value="4">Oriental</option>
              <option value="5">Fruity</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 justify-center">
          {products.map((el) => (
            <Card key={el.id} products={el} />
          ))}
        </div>
        <PaginationDemo
          totalPage={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
