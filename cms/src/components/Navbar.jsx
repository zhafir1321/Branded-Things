import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate('/login');
  }
  return (
    <>
      <div className="navbar bg-base-100 shadow-md">
        <div className="navbar-start">
          <Link to="/home" className="btn btn-ghost text-xl">
            <img src="/logo_HMNS_black_2016x.webp" alt="" className="w-32" />
          </Link>
        </div>
        <div className="navbar-center">
          <Link to="/add-user" className="btn btn-ghost text-sm">
            Add Staff
          </Link>
          <Link to="/categories" className="btn btn-ghost text-sm">
            Category List
          </Link>
        </div>
        <div className="navbar-end">
          <Link
            className="btn btn-ghost text-xl"
            onClick={handleLogout}
            to="/login"
          >
            Logout
          </Link>
        </div>
      </div>
    </>
  );
}
