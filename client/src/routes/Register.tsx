import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../redux/features/auth/authService";
import {
  SET_LOGIN,
  SET_NAME,
  SET_USER,
} from "../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

export interface IFormRegisterInputs {
  name: string;
  email: string;
  password: string;
  password2: string;
}

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormRegisterInputs>();

  const handleRegister: SubmitHandler<IFormRegisterInputs> = async (values) => {
    const userData = { ...values };
    setIsLoading(true);
    try {
      const data = await registerUser(userData);
      dispatch(SET_LOGIN(true));
      dispatch(SET_NAME(data.name));
      dispatch(SET_USER(data));
      navigate("/");
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error);
      setIsLoading(false);
    }
  };
  return (
    <div className="p-4 bg-secondary-content relative flex flex-col justify-center min-h-screen">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
        <img src="./globe-pins.webp" />
        <h1 className="py-3 text-3xl font-semibold text-center text-primary">
          Sign up and share pics and tips from your travels
        </h1>
        <h2 className="py-3 text-3xl font-semibold text-center">
          Have you <span className=" text-secondary">Been There?</span>
        </h2>
        <form
          aria-disabled={isLoading}
          onSubmit={handleSubmit(handleRegister)}
          className="space-y-4"
        >
          <div>
            <label htmlFor="name" className="label">
              <span className="text-base label-text">Name</span>
            </label>
            <input
              disabled={isLoading}
              id="name"
              autoComplete="name"
              type="text"
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[a-z ,.'-]+$/i,
                  message: "Please enter a valid name",
                },
                minLength: {
                  value: 2,
                  message: "Minimum 2 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Maximum 30 characters",
                },
              })}
              placeholder="Name"
              className="w-full input input-bordered input-primary"
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name?.message && (
              <p className="m-2 p-1 w-fit rounded bg-red-700 text-xs text-white">
                {" "}
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              autoComplete="email"
              disabled={isLoading}
              id="email"
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
              autoComplete="new-password"
              disabled={isLoading}
              id="password"
              type="password"
              {...register("password", {
                required: true,
                min: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                max: {
                  value: 30,
                  message: "Password must be less than 30 characters",
                },
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
          <div>
            <label htmlFor="password2" className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              autoComplete="new-password"
              disabled={isLoading}
              id="password2"
              type="password"
              {...register("password2", {
                required: true,
                min: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                max: {
                  value: 30,
                  message: "Password must be less than 30 characters",
                },
                validate: (val: string) => {
                  if (watch("password") != val) {
                    return "Your passwords do no match";
                  }
                },
              })}
              placeholder="Confirm Password"
              className="w-full input input-bordered input-primary"
              aria-invalid={errors.password2 ? "true" : "false"}
            />
            {errors.password2?.message && (
              <p className="m-2 p-1 w-fit rounded bg-red-700 text-xs text-white">
                {" "}
                {errors.password2.message}
              </p>
            )}
          </div>
          <div>
            <button type="submit" className="w-full btn btn-secondary">
              Register
            </button>
          </div>
        </form>
        <div className="my-6">
          <button
            onClick={() => navigate("/login")}
            type="button"
            className="w-full btn btn-primary"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
