import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Pages/Home/Home";
import Mainlayout from "../layout/Mainlayout";
import DonationRequest from "../Components/Pages/DonationRequest/DonationRequest";
import Blog from "../Components/Pages/Blog/Blog";
import Login from "../Components/Pages/login/Login";
import Register from "../Components/Pages/register/Register";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    children: [
      {
        path: "home",
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
]);
export default router;
