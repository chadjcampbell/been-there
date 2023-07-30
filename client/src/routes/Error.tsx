import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-secondary-content relative flex flex-col justify-center min-h-screen">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
        <img src="./moon-pin.webp" />
        <h1 className="py-3 text-3xl font-semibold text-center text-primary">
          Uh oh! Error 404
        </h1>
        <h2 className="py-3 text-3xl font-semibold text-center text-secondary">
          Not sure how you got here
        </h2>
        <div className="my-6">
          <button
            onClick={() => navigate("/")}
            type="button"
            className="w-full btn btn-primary"
          >
            Head back home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
