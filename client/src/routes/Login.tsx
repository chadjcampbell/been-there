import axios from "axios";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/UserContext";

interface IFormLoginInputs {
  email: string;
  password: string;
}

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLoginInputs>();

  const handleLogin: SubmitHandler<IFormLoginInputs> = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        formData
      );
      console.log(response.data);
      if (response.data.loggedIn) {
        setUser({ ...response.data });
        toast.success("Successfully logged in");
        navigate("/");
      } else {
        toast.error(response.data.status);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-4 bg-secondary-content relative flex flex-col justify-center min-h-screen">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
        <img src="./globe-pins.webp" />
        <h1 className="py-3 text-3xl font-semibold text-center text-primary">
          Welcome Back!
        </h1>
        <h2 className="py-3 text-3xl font-semibold text-center text-secondary">
          Where have you been?
        </h2>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <div>
            <label htmlFor="email" className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Please enter a valid email",
                },
              })}
              placeholder="Email Address"
              className=" w-full input input-bordered input-primary"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email?.message && (
              <p className="m-2 p-1 w-fit rounded bg-red-700 text-xs text-white">
                {" "}
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: true,
              })}
              placeholder="Enter Password"
              className="w-full input input-bordered input-primary"
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password?.message && (
              <p className="m-2 p-1 w-fit rounded bg-red-700 text-xs text-white">
                {" "}
                {errors.password.message}
              </p>
            )}
          </div>
          <a
            href="#"
            className="text-s text-gray-600 hover:underline hover:text-blue-600"
          >
            Forget Password?
          </a>
          <div>
            <button type="submit" className="w-full btn btn-secondary">
              Login
            </button>
          </div>
        </form>
        <div className="my-6">
          <button
            onClick={() => navigate("/register")}
            type="button"
            className="w-full btn btn-primary"
          >
            New Here? Sign Up!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
