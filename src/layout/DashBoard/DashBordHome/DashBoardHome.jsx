import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import { GrDocumentUpdate } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";

const DashBoardHome = () => {




  
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [donorReq, setDonorReq] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const axiosPublic = useAxiosPublic();
  const navigate =useNavigate()

  const fetchData = () => {
    if (user && user.email) {
      console.log("Authenticated User Email:", user.email);

      fetch("http://localhost:5000/donation")
        .then((res) => res.json())
        .then((data) => {
          const filteredDonor = data.filter(
            (donorData) =>
              donorData.useremail.toLowerCase() === user.email.toLowerCase()
          );

          console.log("Filtered Donation Data:", filteredDonor);

          setDonorReq(filteredDonor);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const displayedDonorReq = showAll ? donorReq : donorReq.slice(0, 3);

  const handleDeleteReq = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/donation/${item._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              // Refetch data after deletion
              fetchData();
            }
          })
          .catch((error) => {
            console.error("Error deleting donation:", error);
          });
      }
    });
  };
 
  const handleUpdate=(item)=>{
console.log(item)

const _id=item._id;
navigate(`/dashboard/update-donation-requests/${_id}`)
  }
//   const handleUpdateInfo = () => {
//     // Make sure _id is defined before navigating
//     const _id = finalUser[0]?._id;
//     if (_id) {
//         // Pass user information as state during navigation
//         navigate(`/dashboard/updateprofileinfo/${_id}`, { state: finalUser[0] });
//     }
// };





  return (
    <section className="w-full text-center py-8 z-10 font-serif">
      <div className="max-w-6xl px-6 py-8 mx-auto">
        <div className="w-full md:w-1/2 py-8">
          <h1 className="text-purple-900 md:text-3xl text-xl lg:text-5xl font-semibold leading-none tracking-tighter">
            Hey {displayedDonorReq.length > 0 ? displayedDonorReq[0].role : ''},
            <br />
            <span className="text-blue-500"> {displayedDonorReq.length > 0 ? displayedDonorReq[0].username : ''}, <br /></span> Welcome to Dashboard
          </h1>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Recipient Name</th>
                <th>Recipient Location</th>
                <th>Donation Date & Time</th>
                <th>Donation Status</th>
                <th>Donor Information</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {displayedDonorReq.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.recipientname}</td>
                  <td>{item.recipientdistrict}, {item.recipientupazila}</td>
                  <td>{item.donationdate} ({item.pickedTime})</td>
                  <td>
                    <button className="btn btn-primary">In Progress</button>
                  </td>
                  <td>
                    <div>
                      <p><strong>Name:</strong> {item.username}</p>
                      <p><strong>Email:</strong> {item.useremail}</p>
                      <p className="text-red-500"><strong>blood group:</strong> {item.bloodgroup}</p>
                    </div>
                  </td>
                  <td>
                    <button onClick={()=>handleUpdate(item)} className="btn btn-ghost btn-lg"><GrDocumentUpdate className="text-2xl text-orange-500" /></button>
                  </td>
                  <td>
                    <button onClick={()=>handleDeleteReq(item)} className="btn btn-ghost btn-lg"><RiDeleteBin5Line className="text-2xl text-red-500"/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {donorReq.length > 1 && (
            <button
              className="btn btn-primary mt-4"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default DashBoardHome;
