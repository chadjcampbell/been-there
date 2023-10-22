import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser } from "../redux/features/auth/authService";
import {
  SET_LOGIN,
  SET_NAME,
  SET_USER,
  selectUser,
} from "../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import ConfirmDelete from "../components/settings/ConfirmDelete";
import PasswordChange from "../components/settings/PasswordChange";

const Settings = () => {
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const initialUserStateuser = {
    userId: "",
    name: "",
    email: "",
    photoUrl: "",
    bio: "",
    registrationDate: "",
  };

  const handleDelete = async () => {
    if (user.userId == 19) {
      toast.error("Demo user can't do that");
      return;
    }
    setLoading(true);
    try {
      navigate("/login");
      dispatch(SET_LOGIN(false));
      dispatch(SET_NAME(""));
      dispatch(SET_USER(initialUserStateuser));
      await deleteUser();
      toast.success("User data deleted");
    } catch (err: any) {
      toast.error(err);
      setLoading(false);
    }
  };

  return confirmDelete ? (
    <ConfirmDelete
      handleDelete={handleDelete}
      setConfirmDelete={setConfirmDelete}
    />
  ) : (
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
          className="btn btn-error text-white px-4 py-2 rounded"
          onClick={() => {
            setConfirmDelete(true);
          }}
        >
          {loading ? (
            <span className="loading loading-spinner text-white loading-lg"></span>
          ) : (
            "Delete My Data"
          )}
        </button>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Change your password</h3>
        <p className="text-gray-600 mb-4">
          Click the button below to change your password.
        </p>
        <button
          className="btn btn-warning text-white px-4 py-2 rounded"
          onClick={() => {
            setShowPasswordChange(!showPasswordChange);
          }}
        >
          {loading ? (
            <span className="loading loading-spinner text-white loading-lg"></span>
          ) : (
            "Change Password"
          )}
        </button>
      </div>
      {showPasswordChange && (
        <PasswordChange setShowPasswordChange={setShowPasswordChange} />
      )}
    </div>
  );
};

export default Settings;
