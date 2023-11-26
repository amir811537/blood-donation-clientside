import { useContext } from "react";
import { Link } from "react-router-dom";
import gifimg from '../../../assets/login img/authentication.gif'
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



const Login = () => {

    // const from = location.state?.from?.pathname || "/";
    const navigate = useNavigate();

    // const location = useLocation();
const {signIn}=useContext(AuthContext);

    const handelLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);
        signIn(email, password).then((result) => {
          const user = result.user;
          console.log("=====>login user", user);
    
          Swal.fire({
            title: "User Login Succcessful",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
            },
          });
          navigate('/');
        });
      };


    return (
        <div className="imgofbg hero min-h-screen">
            <div className="hero-content shadow-2xl flex-col lg:flex-row-reverse">
                <div className="hidden lg:block w-1/2">
                    <img src={gifimg} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="card  md:w-1/2 max-w-sm  ">
                    <form onSubmit={handelLogin} className="card-body">
                        <div className="form-control">
                            <h1 className="text-4xl text-center font-bold">Login </h1>
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="email"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                className="input input-bordered"
                                required
                            />
                        </div>

                        <div className="form-control mt-6">
                            <input
                                className="btn text-white bg-primary"
                                type="submit"
                                value="Login"
                            ></input>
                        </div>
                        <Link to="/register">
                            {" "}
                            <p className="text-center text-primary">
                                New here? Create a New Account!
                            </p>
                        </Link>


                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;