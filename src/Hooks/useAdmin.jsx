import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useAdmin = () => {
const axiosSecure =useAxiosSecure();
const {user}=useContext(AuthContext)
console.log('user',user)

const {data: isAdmin,isPending: isAdminLoading}=useQuery({
    queryKey:['isaAdmin',user?.email],
    queryFn:async()=>{
        const res = await axiosSecure.get(`/users/admin/${user.email}`);
       console.log("this admin",res.data)
        return res.data?.admin;

    }
})
return [isAdmin,isAdminLoading]
};

export default useAdmin;


