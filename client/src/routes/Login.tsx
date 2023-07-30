import { FormEvent } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Successfully logged in");
    navigate("/");
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
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              name="email"
              placeholder="Email Address"
              className="w-full input input-bordered input-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="w-full input input-bordered input-primary"
            />
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
