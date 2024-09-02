export default function Card({ products }) {
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-xl m-10">
        <a href="#">
          <figure>
            <img
              className="rounded-xl shadow-2xl"
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt={products.name}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{products.name}</h2>
            <p>{products.description}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </a>
      </div>
    </>
  );
}
