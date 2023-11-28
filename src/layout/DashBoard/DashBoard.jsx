import { NavLink, Outlet, useLocation } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { MdDashboard } from "react-icons/md";
import { FaCodePullRequest } from "react-icons/fa6";
import './dashboard.css'
import navlogo from '../../assets/image-250x150.png'
const DashBoard = () => {


  const location = useLocation();
  

  return (
    <div className="flex">


      {/* dashbord sidebar */}
      {/* <div className="w-64 min-h-full bg-orange-400">
          <ul className="menu">
            <li>
                <NavLink to="/dashboard/profile"> <ImProfile />My Profile</NavLink>
            </li>

          </ul>

        </div> */}






      <div className="min-h-screen bg-gray-100">
        <div className="sidebar min-h-screen w-[3.35rem] overflow-hidden border-r hover:w-56 hover:bg-white hover:shadow-lg">
          <div className="flex h-screen flex-col justify-between pt-2 pb-6">
            <div>
              <div className="w-max p-2.5">
                <img src={navlogo} className="w-32" alt="" />
              </div>
              <ul className="mt-6 space-y-2 tracking-wide">
                <li className="min-w-max">
                  <NavLink
                    to='/dashboard'
                    aria-label="dashboard"
                    className={`relative flex items-center space-x-4 px-4 py-3
          transition duration-300 ease-in-out 
         ${location.pathname === '/dashboard' ? 'bg-gradient-to-r from-sky-600 to-cyan-400' : ''}`}
                  >
                    <MdDashboard className="text-3xl"   />
                    <span className="-mr-1 font-medium">Dashboard</span>
                  </NavLink>
                </li>
                <li className="min-w-max">
                  <NavLink
                    to='/dashboard/profile'
                    aria-label="dashboard"
                    className={`relative flex items-center space-x-4 px-4 py-3
          transition duration-300 ease-in-out 
         ${location.pathname === '/dashboard/profile' ? 'bg-gradient-to-r from-sky-600 to-cyan-400' : ''}`}
                  >
                    <ImProfile className="text-3xl" />
                    <span className="-mr-1 font-medium">Profile</span>
                  </NavLink>
                </li>
                <li className="min-w-max">
                  <NavLink
                    to='/dashboard/my-donation-requests'
                    aria-label="dashboard"
                    className={`relative flex items-center space-x-4 px-4 py-3
          transition duration-300 ease-in-out 
         ${location.pathname === '/dashboard/my-donation-requests' ? 'bg-gradient-to-r from-sky-600 to-cyan-400' : ''}`}
                  >
                    <FaCodePullRequest className="text-3xl" />
                    <span className="-mr-1 font-medium">My Donation requests</span>
                  </NavLink>
                </li>
                {/* <li className="min-w-max">
                  <NavLink
                    to='/dashboard'
                    aria-label="dashboard"
                    className={`relative flex items-center space-x-4 px-4 py-3
          transition duration-300 ease-in-out 
         ${location.pathname === '/dashboard' ? 'bg-gradient-to-r from-sky-600 to-cyan-400' : ''}`}
                  >
                    <MdDashboard />
                    <span className="-mr-1 font-medium">Dashboard</span>
                  </NavLink>
                </li> */}
               
              
             
        
              </ul>
            </div>
            {/* <div className="w-max -mb-3">
        <Link to="" className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600">
          
          <span className="group-hover:text-gray-700">Settings</span>
        </Link>
      </div> */}
          </div>
        </div>
      </div>









      {/* dashboard-content */}
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;