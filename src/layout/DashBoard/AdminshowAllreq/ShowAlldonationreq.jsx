import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { RiDeleteBin5Line } from "react-icons/ri";
import {useNavigate} from "react-router-dom";
import { GrDocumentUpdate } from "react-icons/gr";

const ShowAlldonationreq = () => {
    const axiosSecure = useAxiosSecure();
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(true);
    const navigate =useNavigate()

    const [alldonorReq, setAllDonorReq] = useState([]);


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

      

      const handleDeleteReq = (item) => {
        const confirmDeletion = () => {
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
              deleteDonation(item._id);
            }
          });
        };
      
        const deleteDonation = (donationId) => {
          // Show loading indicator
          Swal.fire({
            title: "Deleting...",
            showConfirmButton: false,
            allowOutsideClick: false,
            onBeforeOpen: () => {
              Swal.showLoading();
            },
          });
      
          axiosSecure
            .delete(`/donation/${donationId}`)
            .then((res) => {
              if (res.data.deletedCount > 0) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
      
                // Refetch data after deletion
                fetchData();
              } else {
                Swal.fire({
                  title: "Error",
                  text: "Unable to delete the donation.",
                  icon: "error",
                });
              }
            })
            .catch((error) => {
              console.error("Error deleting donation:", error);
              Swal.fire({
                title: "Error",
                text: "An error occurred while deleting the donation.",
                icon: "error",
              });
            });
        };
      
        confirmDeletion();
      };
      
      
      const handleUpdate=(item)=>{
        // console.log(item._id)
        
        const _id=item._id;
        navigate(`/dashboard/update-donation-requests/${_id}`)
          }





    return (

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
              {alldonorReq.map((item, index) => (
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
          {/* {alldonorReq.length > 1 && (
            <button
              className="btn btn-primary mt-4"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : 'Show More'}
            </button>
          )} */}
        </div>
    );
};

export default ShowAlldonationreq;