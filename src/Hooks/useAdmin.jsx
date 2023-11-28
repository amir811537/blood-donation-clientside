import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
const axiosSecure =useAxiosSecure();
const {user}=useAuth();
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