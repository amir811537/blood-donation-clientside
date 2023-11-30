import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { HiMiniUsers } from "react-icons/hi2";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { GiBlood } from "react-icons/gi";




const Adminhome = () => {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [alldonorReq, setAllDonorReq] = useState([]);
  const [alluser, setAllUser] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get("/donation");
        setAllDonorReq(response.data);
      } catch (error) {
        console.error("Error fetching donor requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosSecure]);

//   console.log(alldonorReq);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get("/users");
        setAllUser(response.data);
      } catch (error) {
        console.error("Error fetching donor requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosSecure]);

  console.log(alluser);

  return (
    <div>
     



<div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:ml-9">
<div className="card w-full md:w-72 bg-base-100 shadow-xl md:mr-4 mb-4 md:mb-0">
    <figure className="px-10 pt-10"> <HiMiniUsers className="text-7xl" /></figure>
    <div className="card-body items-center text-center">
      <h2 className="card-title uppercase text-red-500 font-bold font-serif" >totol users</h2>
      <p>{alluser.length}</p>
    </div>
  </div>
<div className="card w-full md:w-72 bg-base-100 shadow-xl md:mr-4 mb-4 md:mb-0">
    <figure className="px-10 pt-10"> <FaHandHoldingDollar className="text-7xl" /></figure>
    <div className="card-body items-center text-center">
      <h2 className="card-title uppercase text-red-500 font-bold font-serif" >total funding</h2>
      <p>$ 100000</p>
    </div>
  </div>
<div className="card w-full md:w-72 bg-base-100 shadow-xl md:mr-4 mb-4 md:mb-0">
    <figure className="px-10 pt-10"> <GiBlood className="text-7xl text-red-800" /></figure>
    <div className="card-body items-center text-center">
      <h2 className="card-title uppercase text-red-500 font-bold font-serif" >totol donation requests</h2>
      <p>{alldonorReq.length}</p>
    </div>
  </div>
</div>


      
    </div>
  );
};

export default Adminhome;
