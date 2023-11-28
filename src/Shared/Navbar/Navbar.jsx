import { Link } from "react-router-dom";
import navlogo from '../../assets/image-250x150.png'
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {
  const {user,logOut}=useContext(AuthContext);

  const handelLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };
    const navoptions = (
        <>
          <li>
            <Link to="/">Home</Link>{" "}
          </li>
          <li>
            <Link to="/DonationRequest">Donation Request</Link>
          </li>
          <li>
            <Link to="/blog">Blogs</Link>
          </li>
          <li>
            <Link to="/dashboard">My Dashboard</Link>
          </li>
          {user ? (
        <>
          {/* <span>{user?.displayName}</span> */}
          <li>
            {" "}
            <button onClick={handelLogout} className="btn btn-ghost">
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </>
      )}
          <li>
            <Link to="/register">Register</Link>
          </li>
          
          
        </>
      );


    return (
        <div className="navbar max-w-screen-xl z-10  bg-opacity-30 bg-black fixed text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navoptions}
            </ul>
          </div>
          
        <div className="w-24">
          <img  style={{ width: '100%', height: 'auto' }} alt="Tailwind CSS Navbar component" src={navlogo} />
        </div>
      
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navoptions}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    );
};

export default Navbar;