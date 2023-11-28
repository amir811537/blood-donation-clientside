import React, { useEffect, useState } from "react";

import TimePicker from 'react-time-picker';
import Swal from "sweetalert2";


import { useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import moment from 'moment'
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
const Mydonationreq = () => {

    const axiosPublics = useAxiosPublic();
    
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm();
 // const inputTime = '9:15';
    // const formattedTime = moment(inputTime, 'HH:mm').format('h:mm A');
    // console.log(formattedTime)

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
  
   


    const onSubmit = async (data) => {
        try {
          data.pickedTime = moment(data.pickedTime, 'HH:mm').format('h:mm A');
        //   console.log(JSON.stringify(data, null, 2));
      
          const myreq = {
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
            donationstatus: "pending"
          };
          console.log(myreq);  
          const userRes = await axiosPublics.post('/donation', myreq);
          if (userRes.data) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: `${data.name} Your request is pending ....`,
              showConfirmButton: false,
              timer: 1500
            });
            navigate('/dashboard/my-donation-requests');
          }
        } catch (error) {
          console.log(error);
        }
      };
      















   

    return (
        <div className="h-full bg-gray-400 dark:bg-gray-900">
            <div className="mx-auto">
                <div className="flex justify-center px-6 py-12">
                    {/* <!-- Col --> */}
                    <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg ">
                        <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
                            Please submit this from for blood request
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
                                    placeholder="Enter requester name..."
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
                                    required
                                    placeholder="Enter your email address..."
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
                                    placeholder="Enter recipient name .."
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
                                    placeholder="Enter hospital address..."
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                                    htmlFor="recipientfulladress"
                                >
                                    Recipient hospital adress:
                                </label>
                                <textarea
                                    {...register("recipientfulladress")}
                                    className="w-full textarea textarea-bordered h-24 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    name="recipientfulladress"
                                    type="text"
                                    required
                                    placeholder="Enter recipient full adress .......(like: Zahir Raihan Rd, Dhaka)"
                                />
                            </div>







                            {/* <div className="mb-4">
                                <label
                                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                                    htmlFor="hospitalname"
                                >
                                    Recipient full Adress:
                                </label>
                                <textarea
                                    {...register("recipientfulladress")}
                                    className="w-full textarea textarea-bordered h-24 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    name="recipientfulladress"
                                    type="text"
                                    required
                                    placeholder="Enter recipient full adress .......(like: Zahir Raihan Rd, Dhaka)"
                                />
                            </div> */}



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








                            {/* <div className="mb-4">
  <label
    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
    htmlFor="name"
  >
    Donation time:
  </label>
  <input
    {...register("donationtime", {
      pattern: /^([1]?[0-9]|2[0-3]):[0-5][0-9]$/
    })}
    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
    name="donationtime"
    type="time"
  />
</div> */}







                            {/* 
<div className="mt-2 p-5 w-40 bg-white rounded-lg shadow-xl">
  <div className="flex">
    <select name="hours" className="bg-transparent text-xl appearance-none outline-none">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
      <option value="11">10</option>
      <option value="12">12</option>
    </select>
    <span className="text-xl mr-3">:</span>
    <select name="minutes" className="bg-transparent text-xl appearance-none outline-none mr-4">
      <option value="0">00</option>
      <option value="15">15</option>
      <option value="30">30</option>
      <option value="45">45</option>
    </select>
    <select name="ampm" className="bg-transparent text-xl appearance-none outline-none">
      <option value="am">AM</option>
      <option value="pm">PM</option>
    </select>
  </div>
</div> */}








                            {/* <div className="mt-2 p-5 w-40 bg-white rounded-lg shadow-xl">
        <div className="flex">
          <Controller
            name="hours"
            control={control}
            rules={{ required: 'Please select hours' }}
            render={({ field }) => (
              <select
                {...field}
                className="bg-transparent text-xl appearance-none outline-none"
              >
                <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
      <option value="11">10</option>
      <option value="12">12</option>
              </select>
            )}
          />
          <span className="text-xl mr-3">:</span>
          <Controller
            name="minutes"
            control={control}
            rules={{ required: 'Please select minutes' }}
            render={({ field }) => (
              <select
                {...field}
                className="bg-transparent text-xl appearance-none outline-none mr-4"
              >
               <option value="0">00</option>
      <option value="15">15</option>
      <option value="30">30</option>
      <option value="45">45</option>
              </select>
            )}
          />
          <Controller
            name="ampm"
            control={control}
            rules={{ required: 'Please select AM/PM' }}
            render={({ field }) => (
              <select
                {...field}
                className="bg-transparent text-xl appearance-none outline-none"
              >
                <option value="am">AM</option>
      <option value="pm">PM</option>
              </select>
            )}
          />
        </div>
      </div> */}

                            {/* Display validation errors */}
                          



























                            <div className="mb-4">
                                <label
                                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                                    htmlFor="requstermessage"
                                >
                                    Why he/she need blood:
                                </label>
                                <textarea
                                    {...register("recipientfulladress")}
                                    className="w-full textarea textarea-bordered h-24 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    name="requstermessage"
                                    type="text"
                                    required
                                    placeholder="why he/she need blood explain......)"
                                />
                            </div>



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
                                    Create a donation request
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mydonationreq;