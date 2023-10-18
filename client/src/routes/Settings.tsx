import { Link } from "react-router-dom";

const Settings = () => {
  const handleDeleteUserData = () => {
    alert("Please contact admin");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-8">Settings</h2>

      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-2">Legal Information</h3>
        <p className="text-gray-600">
          Please review our{" "}
          <Link to="/terms" className="text-blue-500 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-blue-500 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Delete User Data</h3>
        <p className="text-gray-600 mb-4">
          Click the button below to permanently delete all your user data.
        </p>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={handleDeleteUserData}
        >
          Delete My Data
        </button>
      </div>
    </div>
  );
};

export default Settings;
