import { NavLink, Outlet, useLocation } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { MdDashboard } from "react-icons/md";
import { FaCodePullRequest } from "react-icons/fa6";
import './dashboard.css'
import navlogo from '../../assets/image-250x150.png'
import { HiUsers } from "react-icons/hi2";
import { MdOutlineContentPasteGo } from "react-icons/md";
import useAdmin from "../../Hooks/useAdmin";
const DashBoard = () => {


  const location = useLocation();
  // get is admin 
  const [isAdmin,isAdminLoading] = useAdmin();
  console.log(isAdmin)
  
if(isAdminLoading){
  return <p> loading..........</p>
}

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


                
             {
              isAdmin? <>
              
              
              <li className="min-w-max">
                  <NavLink
                    to='/dashboard'
                    aria-label="dashboard"
                    className={`relative flex items-center space-x-4 px-4 py-3
          transition duration-300 ease-in-out 
         ${location.pathname === '/dashboard' ? 'bg-gradient-to-r from-sky-600 to-cyan-400' : ''}`}
                  >
                    <MdDashboard className="text-3xl" />
                    <span className="-mr-1 font-medium" >Admin Dashboard</span>
                  </NavLink>
                </li>

                <li className="min-w-max">
                  <NavLink
                    to='/dashboard/all-users'
                    aria-label="dashboard"
                    className={`relative flex items-center space-x-4 px-4 py-3
          transition duration-300 ease-in-out 
         ${location.pathname === '/dashboard/all-users'? 'bg-gradient-to-r from-sky-600 to-cyan-400' : ''}`}
                  >
                    <HiUsers className="text-3xl" />
                    <span className="-mr-1 font-medium">All Users</span>
                  </NavLink>
                </li>
                <li className="min-w-max">
                  <NavLink
                    to='/dashboard/all-blood-donation-request'
                    aria-label="dashboard"
                    className={`relative flex items-center space-x-4 px-4 py-3
          transition duration-300 ease-in-out 
         ${location.pathname === '/dashboard/all-blood-donation-request' ? 'bg-gradient-to-r from-sky-600 to-cyan-400' : ''}`}
                  >
                    <FaCodePullRequest className="text-3xl" />
                    <span className="-mr-1 font-medium">All Blood Donation Request</span>
                  </NavLink>
                </li>
                <li className="min-w-max">
                  <NavLink
                    to='/dashboard/content-management'
                    aria-label="dashboard"
                    className={`relative flex items-center space-x-4 px-4 py-3
          transition duration-300 ease-in-out 
         ${location.pathname === '/dashboard/content-management' ? 'bg-gradient-to-r from-sky-600 to-cyan-400' : ''}`}
                  >
                    <MdOutlineContentPasteGo className="text-3xl" />
                    <span className="-mr-1 font-medium">Content Management</span>
                  </NavLink>
                </li>
              
              
              
              </>:
              
              
              
              
              <>
              
              <li className="min-w-max">
                  <NavLink
                    to='/dashboard'
                    aria-label="dashboard"
                    className={`relative flex items-center space-x-4 px-4 py-3
          transition duration-300 ease-in-out 
         ${location.pathname === '/dashboard' ? 'bg-gradient-to-r from-sky-600 to-cyan-400' : ''}`}
                  >
                    <MdDashboard className="text-3xl" />
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
                    to='/dashboard/Create-donation-requests'
                    aria-label="dashboard"
                    className={`relative flex items-center space-x-4 px-4 py-3
          transition duration-300 ease-in-out 
         ${location.pathname === '/dashboard/Create-donation-requests' ? 'bg-gradient-to-r from-sky-600 to-cyan-400' : ''}`}
                  >
                    <FaCodePullRequest className="text-3xl" />
                    <span className="-mr-1 font-medium">Create Donation requests</span>
                  </NavLink>
                </li>
              
              
              </>
             }





              </ul>
            </div>
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