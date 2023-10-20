import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../redux/features/auth/authService";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME } from "../redux/features/auth/authSlice";

const ResetPassword = () => {
  const { resetToken } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords must match");
    }
    const userData = { password };
    if (resetToken) {
      setIsLoading(true);
      try {
        const data = await resetPassword(userData, resetToken);
        dispatch(SET_LOGIN(true));
        dispatch(SET_NAME(data.name));
        navigate("/login");
        setIsLoading(false);
      } catch (error: any) {
        toast.error(error);
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="p-4 bg-secondary-content relative flex flex-col justify-center min-h-screen">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
        <h1 className="py-3 text-3xl font-semibold text-center text-primary">
          Almost done!
        </h1>
        <h2 className="py-3 text-3xl font-semibold text-center">
          Set your <span className=" text-secondary">new password</span> below
        </h2>
        <form
          aria-disabled={isLoading}
          onSubmit={(e) => handleSubmit(e)}
          className="space-y-4"
        >
          <div>
            <label htmlFor="password" className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              autoComplete="new-password"
              disabled={isLoading}
              id="password"
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered input-primary"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password2" className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              autoComplete="new-password"
              disabled={isLoading}
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered input-primary"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="w-full btn btn-secondary">
              Reset Password
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

export default ResetPassword;
