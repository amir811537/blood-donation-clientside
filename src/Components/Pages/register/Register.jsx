import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const image_hostion_api = "https://api.imgbb.com/1/upload?key=1d6fdf8c502424c419510b9f0a67a7f8";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate()
  const axiosPublics=useAxiosPublic();


  const [districtDDL, setDistrictDDL] = useState([]);
  const [upZillaDDL, setUpzillaDDL] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const getDistictsDDL = async () => {
    try {
      const res = await axios.get("districts.json");
      setDistrictDDL(res?.data[2]?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDistictsDDL();
  }, []);

  const onSubmit = async (data) => {
    try {
      const result = await createUser(data.email, data.password);
      const loggedUser = result.user;
      console.log(loggedUser);
  
      const imageFile = { image: data.image[0] };
      const res = await axiosPublics.post(image_hostion_api, imageFile, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (res.data.success) {
        const userInfo = {
          name: data.name,
          email: data.email,
          image: res.data.data.display_url,
          District: data.district,
          Upazila: data.upzilla,
          Blood_Group: data.bloodgroup,
          Password: data.password,
          role:"donor"

        };
  
        const userRes = await axiosPublics.post('/users', userInfo);
        console.log(userInfo); // Log userInfo, not userInfo.data
  
        if (userRes.data.insertedId) {
          reset();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${data.name} Your account create successful.`,
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/')
        }
      }
  
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleDistrict = async (districtName) => {
    const district = districtDDL.filter((item) => item.name === districtName);

    try {
      const res = await axios.get("upazilas.json");
      const allData = res?.data[2]?.data;
      const filterData = allData?.filter(
        (item) => item?.district_id === district[0]?.id
      );
      // console.log('upzilla',allData)
      // console.log('filterData',filterData)
      setUpzillaDDL(filterData);
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
              Create an Account!
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
                  type="text"
                  placeholder="Enter Your Name..."
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                  htmlFor="email"
                >
                  Email:
                </label>
                <input
                  {...register("email")}
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  name="email"
                  type="email"
                  placeholder="Enter Your Email Address.."
                />
              </div>
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
              <div className="mb-4 md:mr-2 md:mb-0">
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

              <div className="mb-4 md:flex md:justify-between">
                <div>
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="password"
                  >
                    Password:
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    {...register("password", { required: true })}
                    type="password"
                    aria-invalid={errors.password ? "true" : "false"}
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-red-600" role="alert">
                      Password is required
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="c_password"
                  >
                    Confirm Password:
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    type="password"
                    aria-invalid={errors.confirmPassword ? "true" : "false"}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-600" role="alert">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="form-control w-full py-3 mb-2 max-w-xs">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                  htmlFor="c_password"
                >
                  Profile Picture:(150 x 150 pixels)
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
              <div className="mb-6 text-center">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Register Account
                </button>
              </div>
              <hr className="mb-6 border-t" />
              <div className="text-center">
                <Link to="/login"
                  className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                  href="./index.html"
                >
                  Already have an account? Login!
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
