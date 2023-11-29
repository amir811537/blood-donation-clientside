import { useContext, useEffect, useState } from "react";

import TimePicker from 'react-time-picker';
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";


import { useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import moment from 'moment'
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { AuthContext } from "../../../Provider/AuthProvider";
const UpdateDonorReq = () => {


    const inputData = useLoaderData()


    const { _id,bloodgroup, donationdate,
         hospitalname,
         recipientdistrict,
        recipientfulladress,
        recipientname,
        recipientupazila,
     username } = inputData;
    // console.log("this input data =============",inputData)

    const { user } = useContext(AuthContext)

    const axiosPublics = useAxiosPublic();

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,

        setValue,
        formState: { errors },
    } = useForm();





    const onSubmit = async (data) => {
        try {
          data.pickedTime = moment(data.pickedTime, 'HH:mm').format('h:mm A');
      
          const myReq = {
            username: data.name,
            useremail: data.email,
            recipientname: data.recipientname,
            recipientdistrict: data.recipientdistrict,
            recipientupazila: data.recipientupazila,
            hospitalname: data.hospitalname,
            recipientfulladress: data.recipientfulladress,
            donationdate: data.donationdate,
            bloodgroup: data.bloodgroup,
            pickedTime: data.pickedTime,
            donationstatus: 'pending',
          };
      
          const userRes = await axiosPublics.patch(`/donation/${_id}`, myReq);
      
          if (userRes.data) {
            Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: `${data.name} Your donation request update successful.`,
              showConfirmButton: false,
              timer: 1500,
            });
            navigate('/dashboard');
          }
        } catch (error) {
          console.error(error);
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

    // console.log('district res', districtDDL);











    return (
        <div className="h-full bg-gray-400 dark:bg-gray-900">
            <div className="mx-auto">
                <div className="flex justify-center px-6 py-12">
                    {/* <!-- Col --> */}
                    <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg ">
                        <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
                            Please submit this from for update your request
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
                                    Requester name:
                                </label>
                                <input
                                    {...register("name")}
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    name="name"
                                    type="text"
                                    required
                                    disabled
                                    defaultValue={username}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                                    htmlFor="email"
                                >
                                    Requester email:
                                </label>
                                <input
                                    {...register("email")}
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    name="email"
                                    type="email"
                                    readOnly
                                    value={user?.email || ''}
                                />

                            </div>


                            <div className="mb-4">
                                <label
                                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                                    htmlFor="name"
                                >
                                    Recipient name:
                                </label>
                                <input
                                    {...register("recipientname")}
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    name="recipientname"
                                    type="text"
                                    required
                                    defaultValue={recipientname}
                                />
                            </div>

                            {/* to do dainamic upazila and districs add in to input fild */}



                            <div className="mb-4 md:flex md:justify-between">
                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label
                                            className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                                            htmlFor="recipientdistrict"
                                        >
                                            Recipient District:
                                        </label>
                                        <select
                                            {...register("recipientdistrict")}
                                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            name="recipientdistrict"
                                            defaultValue={recipientdistrict}
                                            id="recipientdistrict"
                                            required
                                            onChange={(e) => {
                                                handleDistrict(e.target.value);
                                            }}

                                        >
                                            <option value="" disabled selected>
                                                Select your District
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
                                            htmlFor="recipientupazila"
                                        >
                                            Recipient Upazila:
                                        </label>
                                        <select
                                            {...register("recipientupazila")}
                                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            name="recipientupazila"
                                            defaultValue={recipientupazila}
                                            id="recipientupazila"
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



                            {/*hospital name(where the donor will go to donate blood - like: Dhaka
Medical College Hospital)  */}

                            <div className="mb-4">
                                <label
                                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                                    htmlFor="hospitalname"
                                >
                                    Recipient hospital adress:
                                </label>
                                <textarea
                                    {...register("hospitalname")}
                                    className="w-full textarea textarea-bordered h-24 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    name="hospitalname"
                                    type="text"
                                    required
                                    defaultValue={hospitalname}
                                    placeholder="Enter hospital address..."
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                                    htmlFor="recipientfulladress"
                                >
                                    recipient full adress:
                                </label>
                                <input
                                    {...register("recipientfulladress")}
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    name="recipientfulladress"
                                    type="text"
                                    required
                                    defaultValue={recipientfulladress}
                                    placeholder="Enter recipient full adress."
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                                    htmlFor="name"
                                >
                                    Donation date:
                                </label>
                                <input
                                    {...register("donationdate")}
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    name="donationdate"
                                    defaultValue={donationdate}
                                    required
                                    type="date"
                                />
                            </div>

                            <TimePicker
                                onChange={(value) => {
                                    setValue('pickedTime', value)
                                }}
                                format="h:mm a"
                                amPmAriaLabel="Select AM/PM"
                            />








                            <div className="mb-4">
                                <label
                                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                                    htmlFor="bloodgroup"
                                >
                                    Blood Group  you needed:
                                </label>
                                <select
                                    {...register("bloodgroup")}
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    name="bloodgroup"
                                    defaultValue={bloodgroup}
                                    id="bloodgroup"
                                    required

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

                            {/* Add more form fields as needed */}

                            <div className="mb-6 text-center">
                                <button
                                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Update your information
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateDonorReq;