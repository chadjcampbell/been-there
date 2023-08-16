import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/features/auth/authService";
import { SET_LOGIN, SET_NAME } from "../redux/features/auth/authSlice";

export interface IFormLoginInputs {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLoginInputs>();

  // this state is only for guest login functionality
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameIndex, setNameIndex] = useState(0);
  const [passIndex, setPassIndex] = useState(0);
  const [guestBool, setGuestBool] = useState(false);
  const guestData = { email: "chadjcampbell@gmail.com", password: "fakepass" };

  // this useEffect is the logic for guest login "typewriter" effect
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (nameIndex < guestData.email.length && guestBool) {
      timer = setTimeout(() => {
        setEmail((prev) => prev + guestData.email[nameIndex]);
        setNameIndex((nameIndex) => nameIndex + 1);
      }, 50);
    }
    if (
      passIndex < guestData.password.length &&
      nameIndex === guestData.email.length &&
      guestBool
    ) {
      timer = setTimeout(() => {
        setPassword((prev) => prev + guestData.password[passIndex]);
        setPassIndex((passIndex) => passIndex + 1);
      }, 50);
    }
    if (
      passIndex === guestData.password.length &&
      nameIndex === guestData.email.length &&
      guestBool
    ) {
      timer = setTimeout(() => {
        onSubmitHandler({ email, password });
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [guestBool, nameIndex, passIndex]);

  const handleGuestLogin = () => {
    setEmail("");
    setPassword("");
    setGuestBool(true);
  };

  const onSubmitHandler: SubmitHandler<IFormLoginInputs> = async (values) => {
    const userData = { ...values };
    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      dispatch(SET_LOGIN(true));
      dispatch(SET_NAME(data.name));
      navigate("/");
      setIsLoading(false);
      setGuestBool(false);
    } catch (error: any) {
      setIsLoading(false);
      setGuestBool(false);
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
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
          <div>
            <label htmlFor="email" className="label">
              <span className="text-base label-text">Email</span>
            </label>
            {guestBool ? (
              <input
                disabled
                className=" w-full input input-bordered input-primary"
                value={email}
              />
            ) : (
              <input
                autoComplete="email"
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
            )}
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
            {guestBool ? (
              <input
                disabled
                type="password"
                className=" w-full input input-bordered input-primary"
                value={password}
              />
            ) : (
              <input
                autoComplete="current-password"
                id="password"
                type="password"
                {...register("password", {
                  required: true,
                })}
                placeholder="Enter Password"
                className="w-full input input-bordered input-primary"
                aria-invalid={errors.password ? "true" : "false"}
              />
            )}

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
            <button
              disabled={isLoading || guestBool}
              type="submit"
              className="w-full btn btn-secondary"
            >
              {isLoading ? (
                <span className="loading loading-spinner text-white loading-lg"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        <div className="my-6">
          <button
            disabled={isLoading || guestBool}
            onClick={() => navigate("/register")}
            type="button"
            className="w-full btn btn-primary"
          >
            New Here? Sign Up!
          </button>
        </div>
        <div className="my-6">
          <button
            disabled={isLoading || guestBool}
            onClick={handleGuestLogin}
            type="button"
            className="w-full btn btn-warning"
          >
            Demo Account Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
