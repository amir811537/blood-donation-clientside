import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";

const Mainlayout = () => {
    const location = useLocation();
    // console.log(location);
    const noHeadrFooter = location.pathname.includes("login") ||location.pathname.includes("register");
  
    return (
      <div>
        {noHeadrFooter || <Navbar></Navbar>}
        
        <Outlet></Outlet>
        {noHeadrFooter || <Footer></Footer>}
      </div>
    );
};

export default Mainlayout;