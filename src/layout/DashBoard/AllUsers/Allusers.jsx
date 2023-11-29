import { useEffect, useState } from "react";
import { RiDeleteBin5Line } from 'react-icons/ri';
import { PiUsersThreeFill } from "react-icons/pi";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Allusers = () => {
    const axiosPublic=useAxiosPublic();
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => {
        setAllData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);
console.log(allData)
  const handleUpdate = (item) => {
    // Handle update logic
    console.log("Update user:", item);
  };

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
          .delete(`/users/${item._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
  
              // Refetch data after deletion
              fetch('http://localhost:5000/users')
                .then(res => res.json())
                .then(data => {
                  setAllData(data);
                })
                .catch(error => {
                  console.error('Error fetching user data:', error);
                });
            }
          })
          .catch((error) => {
            console.error("Error deleting donation:", error);
          });
      }
    });
  };
  

  const handleBlock = (item) => {
    // Handle block logic
    console.log("Block user:", item);
  };

  const handleUnblock = (item) => {
    // Handle unblock logic
    console.log("Unblock user:", item);
  };

  const handleMakeVolunteer = (item) => {
    axiosPublic.patch(`/users/volunteer/${item._id}`)
    .then(res => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `${item.name} is volunteer now`,
          showConfirmButton: false,
          timer: 1500
        });

        // Refetch data after updating role
        fetch('http://localhost:5000/users')
          .then(res => res.json())
          .then(data => {
            setAllData(data);
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
          });
      }
    })
    .catch(error => {
      console.error("Error updating user role:", error);
    });







    // Handle make volunteer logic
    console.log("Make volunteer:", item);
  };

  const handleMakeAdmin = (item) => {
    axiosPublic.patch(`/users/admin/${item._id}`)
      .then(res => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${item.name} is admin now`,
            showConfirmButton: false,
            timer: 1500
          });
  
          // Refetch data after updating role
          fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => {
              setAllData(data);
            })
            .catch(error => {
              console.error('Error fetching user data:', error);
            });
        }
      })
      .catch(error => {
        console.error("Error updating user role:", error);
      });
  };
  

  return (
    <div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>User Avatar</th>
            <th>User Email</th>
            <th>User Name</th>
            <th>User Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allData.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td><div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={item.image} alt="Avatar Tailwind CSS Component" />
              </div>
            </div></td>
              <td>{item.email}</td>
              <td>{item.name}</td>
              <td>{item.status}</td>
              <td>

                {/* {item.status === "active" ? (
                  <>
                    <button onClick={() => handleBlock(item)} className="btn btn-ghost btn-lg">Block</button>
                    <button onClick={() => handleMakeVolunteer(item.role)} className="btn btn-ghost btn-lg">Make Volunteer</button>
                    <button onClick={() => handleMakeAdmin(item)} className="btn btn-ghost btn-lg">Make Admin</button>
                  </>
                ) : (
                  <button onClick={() => handleUnblock(item)} className="btn btn-ghost btn-lg">Unblock</button>
                )} */}
                {item.role==='admin'? "Admin" :<button onClick={() =>handleMakeAdmin(item)} className="btn btn-ghost btn-sm">Make Admin</button>}
                <br />
                <button onClick={() => handleMakeVolunteer(item.role)} className="btn btn-ghost btn-sm">Make Volunteer</button>

                <button onClick={() => handleDeleteReq(item)} className="btn btn-ghost btn-lg"><RiDeleteBin5Line className="text-2xl text-red-500"/></button>
              </td>
              <td>



              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Allusers;
