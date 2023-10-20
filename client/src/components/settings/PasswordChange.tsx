import { useState, FormEvent } from "react";
import toast from "react-hot-toast";
import { BiShow } from "react-icons/bi";
import { changePassword } from "../../redux/features/auth/authService";

const PasswordChange = ({ setShowPasswordChange }: any) => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      toast.error("All fields required");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords must match");
      return;
    }
    if (newPassword.length <= 6 || newPassword.length >= 30) {
      toast.error("Password must be between 6 and 30 characters");
      return;
    }
    const passwordData = {
      oldPassword: currentPassword,
      password: newPassword,
    };
    try {
      setIsLoading(true);
      await changePassword(passwordData);
      setShowPasswordChange(false);
      toast.success("Password changed");
    } catch (err: any) {
      toast.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-2 rounded-md border-red-700 mb-4">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col justify-center bg-white mx-4 rounded-md p-4"
      >
        <label htmlFor="currentPassword" className="label">
          <span className="text-base label-text">Current Password</span>
        </label>
        <div className="relative">
          <input
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
            autoComplete="password"
            disabled={isLoading}
            id="currentPassword"
            type={show ? "text" : "password"}
            name="currentPassword"
            placeholder="Enter Current Password"
            className="w-full input input-bordered input-primary"
          />
          <button
            onClick={() => {
              setShow(!show);
            }}
            type="button"
            className="absolute right-1 top-2 btn btn-sm btn-ghost"
          >
            <BiShow size={"2rem"} />
          </button>
        </div>
        <label htmlFor="newPassword" className="label">
          <span className="text-base label-text">New Password</span>
        </label>
        <div className="relative">
          <input
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            autoComplete="new-password"
            disabled={isLoading}
            id="newPassword"
            type={show ? "text" : "password"}
            name="newPassword"
            placeholder="Enter New Password"
            className="w-full input input-bordered input-primary"
          />
          <button
            onClick={() => {
              setShow(!show);
            }}
            type="button"
            className="absolute right-1 top-2 btn btn-sm btn-ghost"
          >
            <BiShow size={"2rem"} />
          </button>
        </div>
        <label htmlFor="confirmNewPassword" className="label">
          <span className="text-base label-text">Confirm New Password</span>
        </label>
        <div className="relative">
          <input
            onChange={(e) => {
              setConfirmNewPassword(e.target.value);
            }}
            autoComplete="new-password"
            disabled={isLoading}
            id="confirmNewPassword"
            type={show ? "text" : "password"}
            name="confirmNewPassword"
            placeholder="Confirm New Password"
            className="w-full input input-bordered input-primary"
          />
          <button
            onClick={() => {
              setShow(!show);
            }}
            type="button"
            className="absolute right-1 top-2 btn btn-sm btn-ghost"
          >
            <BiShow size={"2rem"} />
          </button>
        </div>
        <div className="mt-4">
          <button type="submit" className="btn btn-secondary">
            {isLoading ? (
              <span className="loading loading-spinner text-white loading-lg"></span>
            ) : (
              "Confirm"
            )}
          </button>
          <button
            type="button"
            className="btn btn-primary ml-4"
            onClick={() => setShowPasswordChange(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordChange;
