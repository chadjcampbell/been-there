import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../redux/features/auth/authService";
import { IFormRegisterInputs } from "./Register";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormRegisterInputs>();

  const handleRegister: SubmitHandler<IFormRegisterInputs> = async (values) => {
    const userData = { ...values };
    setIsLoading(true);
    try {
      await forgotPassword(userData);
      navigate("/login");
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error);
      setIsLoading(false);
    }
  };
  return (
    <div className="p-4 bg-secondary-content relative flex flex-col justify-center min-h-screen">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
        <h1 className="py-3 text-3xl font-semibold text-center text-primary">
          Forgot your password?
        </h1>
        <h2 className="py-3 text-3xl font-semibold text-center">
          Get a <span className=" text-secondary">reset link</span> sent to your
          email
        </h2>
        <form
          aria-disabled={isLoading}
          onSubmit={handleSubmit(handleRegister)}
          className="space-y-4"
        >
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
            <button type="submit" className="w-full btn btn-secondary">
              Send email
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

export default ForgotPassword;
