import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const DashBoardHome = () => {
const {user}=useContext(AuthContext)
    
    return (
        <section className="py-8 z-10 font-serif">
        <div className="max-w-6xl px-6 py-8 mx-auto">
          <div className="w-full md:w-1/2 py-8">
            <h1 className="text-purple-900 md:text-3xl text-xl lg:text-5xl font-semibold leading-none tracking-tighter">
             Hey Donor,<br/><span className="text-blue-500"> {user?.email}, <br/></span> Welcome to  Dashboard
            </h1>
          </div>
          <div className="w-full md:w-1/2 py-8">
            
          </div>
        </div>
      </section>
      
    );
};

export default DashBoardHome;