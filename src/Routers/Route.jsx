import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Pages/Home/Home";
import Mainlayout from "../layout/Mainlayout";
import DonationRequest from "../Components/Pages/DonationRequest/DonationRequest";
import Blog from "../Components/Pages/Blog/Blog";
import Login from "../Components/Pages/login/Login";
import Register from "../Components/Pages/register/Register";
import DashBoard from "../layout/DashBoard/DashBoard";
import Profile from "../Components/Pages/DashBoard/Profile";
import DashBoardHome from "../layout/DashBoard/DashBordHome/DashBoardHome";
import UpdateProfile from "../Components/Pages/DashBoard/UpdateProfile/UpdateProfile";
import PrivateRoute from "./PrivateRoute";
import Createdonationreq from "../layout/DashBoard/MyDonationRequest/Createdonationreq";
import UpdateDonorReq from "../layout/DashBoard/DashBordHome/UpdateDonorReq";
import Allusers from "../layout/DashBoard/AllUsers/Allusers";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path:'DonationRequest',
        element:<DonationRequest></DonationRequest>
      },
      {
        path:'blog',
        element:<Blog></Blog>
      }
      ,
      {
        path:'login',
        element:<Login></Login>
      },
      {
        path:'register',
        element:<Register></Register>
      }
    ],
    
    
  },


{
  path:"dashboard",
  element:<DashBoard></DashBoard>,
  children:[
{
  path:'/dashboard',
  element:<PrivateRoute><DashBoardHome></DashBoardHome></PrivateRoute>
},

    {
      path:'/dashboard/profile',
      element:<Profile></Profile>,
    },
    {
      path:'/dashboard/updateprofileinfo/:id',
      element:<UpdateProfile></UpdateProfile>,
      loader:({params})=>fetch(`http://localhost:5000/users/${params.id}`)
    },
    {
      path:'/dashboard/Create-donation-requests',
      element:<Createdonationreq></Createdonationreq>
    },
    {
      path:'/dashboard/update-donation-requests/:id',
      element:<UpdateDonorReq></UpdateDonorReq>,
      loader:({params})=>fetch(`http://localhost:5000/donation/${params.id}`)
      
    },
    // admin route
    {
      path:'/dashboard/all-users',
      element:<Allusers></Allusers>
    }
  ]
}

  
]);
export default router;
