import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    navigate("/");
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
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="name" className="label">
              <span className="text-base label-text">Name</span>
            </label>
            <input
              autoComplete="name"
              type="text"
              name="name"
              placeholder="Name"
              className="w-full input input-bordered input-primary"
            />
          </div>
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
              name="password"
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered input-primary"
            />
          </div>
          <div>
            <label htmlFor="password2" className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              name="password2"
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered input-primary"
            />
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
