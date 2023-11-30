


// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";

// const useAdmin = () => {
// const axiosSecure =useAxiosSecure();
// const {user}=useAuth();
// console.log('user',user)

// const {data: isAdmin,isPending: isAdminLoading}=useQuery({
//     queryKey:['isaAdmin',user?.email],
//     queryFn:async()=>{
//         const res = await axiosSecure.get(`/users/admin/${user.email}`);
//        console.log("this admin",res.data)
//         return res.data?.admin;

//     }
// })
// return [isAdmin,isAdminLoading]
// };

// export default useAdmin;

import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Provider/AuthProvider";

const useAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  console.log('user', user);

  const fetchIsAdmin = async () => {
    try {
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      console.log("this admin", res.data);
      return res.data?.admin;
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  const [isAdmin, isAdminLoading] = useAsync(fetchIsAdmin);

  return [isAdmin, isAdminLoading];
};

// Helper function to handle async calls with loading state
const useAsync = (asyncFn) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await asyncFn();
        setData(result);
      } catch (error) {
        console.error('Async function error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [asyncFn]);

  return [data, loading];
};

export default useAdmin;
