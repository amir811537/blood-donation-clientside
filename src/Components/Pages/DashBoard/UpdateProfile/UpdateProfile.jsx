import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";

const image_hostion_api = "https://api.imgbb.com/1/upload?key=1d6fdf8c502424c419510b9f0a67a7f8";


const UpdateProfile = () => {
  const navigate = useNavigate()

  const axiosPublics = useAxiosPublic();

  const location = useLocation();
  const userInformation = location.state;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use userInformation
    console.log("User Information:", userInformation);
    setLoading(false);
  }, [userInformation]);

  const { _id, name, image, Blood_Group, District, Upazila } = userInformation;

  // console.log("=====================",image)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();




  const onSubmit = async (data) => {
    // console.log(data.image,data.district,data.upzilla,data.bloodgroup,data.name)

    try {

      const imageFile = { image: data.image[0] };
      const res = await axiosPublics.post(image_hostion_api, imageFile, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data.success) {
        const userInfo = {
          name: data.name,
          image: res.data.data.display_url,
          District: data.district,
          Upazila: data.upzilla,
          Blood_Group: data.bloodgroup
        };

        const userRes = await axiosPublics.patch(`/users/${_id}`, userInfo);
        console.log(userInfo);

        if (userRes.data) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${data.name} Your Profile update successful.`,
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/dashboard/profile')
        }
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const [districtDDL, setDistrictDDL] = useState([]);
  const [upZillaDDL, setUpzillaDDL] = useState([]);

  useEffect(() => {
    getDistictsDDL();
  }, []);

  const getDistictsDDL = async () => {
    try {
      const response = await fetch('/districts.json');
      const data = await response.json();
      setDistrictDDL(data[2].data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDistrict = async (districtName) => {
    const district = districtDDL.filter((item) => item.name === districtName);

    try {
      const res = await fetch("../../../../public/upazilas.json");
      const allData = await res.json(); // Parse the response
      const filterData = allData[2]?.data?.filter(
        (item) => item?.district_id === district[0]?.id
      );
      console.log('upzilla=========>', allData);
      // console.log('filterData',filterData)
      setUpzillaDDL(filterData);
    } catch (error) {
      console.log(error);
    }
  };















  return (
    <div>
      {loading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : (
        <div>
          {/* Your update form and UI here */}
          <div className="h-full bg-gray-400 dark:bg-gray-900">
            <div className="mx-auto">
              <div className="flex justify-center px-6 py-12">
                {/* <!-- Col --> */}
                <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg ">
                  <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
                    Update Your Profile
                  </h3>

                  <form
                    className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                        htmlFor="name"
                      >
                        Name:
                      </label>
                      <input
                        {...register("name")}
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        name="name"
                        defaultValue={name}
                        type="text"
                        placeholder="Enter Your Name..."
                      />
                    </div>


                    {/* to do dainamic upazila and districs add in to input fild */}



                    <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="district"
                    >
                      District:
                    </label>
                    <select
                      {...register("district")}
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      name="district"
                      id="district"
                      onChange={(e) => {
                        handleDistrict(e.target.value);
                      }}
                      required
                    >
                      <option value="" disabled selected>
                        Select your district
                      </option>
                      {districtDDL?.length > 0 &&
                        districtDDL?.map((district) => {
                          return (
                            <option key={district?.id} value={district?.name}>
                              {district?.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="upazila"
                    >
                      Upazila:
                    </label>
                    <select
                      {...register("upzilla")}
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      name="upzilla"
                      id="upazila"
                      required
                    >
                      <option value="" disabled selected>
                        Select your upazila
                      </option>
                      {upZillaDDL?.length > 0 &&
                        upZillaDDL?.map((upzilla) => {
                          return (
                            <option key={upzilla?.id} value={upzilla?.name}>
                              {upzilla?.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>


                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                        htmlFor="bloodgroup"
                      >
                        Blood Group:
                      </label>
                      <select
                        {...register("bloodgroup")}
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        name="bloodgroup"
                        id="bloodgroup"
                        required
                        defaultValue={Blood_Group}
                      >
                        <option value="" disabled selected>
                          Select your blood group
                        </option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>

                    <div className="form-control w-full py-3 mb-2 max-w-xs">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                        htmlFor="image"
                      >
                        Update Profile Picture:(150 x 150 pixels)
                      </label>
                      <input
                        {...register("image", { required: true })}
                        type="file"
                        className="file-input w-full "
                      />
                      {errors.image?.type === "required" && (
                        <p className="text-red-600" role="alert">
                          image  is required
                        </p>
                      )}
                    </div>

                    {/* Add more form fields as needed */}

                    <div className="mb-6 text-center">
                      <button
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        Update Information
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* Use userInformation data to pre-fill form fields or display information */}
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;
