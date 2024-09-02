export default function Search() {
  return (
    <>
      <div className="">
        <form method="get" className="flex justify-center gap-2">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
          <button type="submit" className="btn">
            Search
          </button>
        </form>
      </div>
    </>
  );
}
