import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-hot-toast";
import { findNewFriend } from "../../redux/features/friends/friendService";
import FoundFriendCard from "./FoundFriendCard";
import { FriendType } from "../../routes/Friends";
declare global {
  interface Window {
    find_friend_modal: HTMLDialogElement;
  }
}

const FindFriendModal = () => {
  const [friendName, setFriendName] = useState("");
  const [error, setError] = useState("");
  const [foundFriends, setFoundFriends] = useState([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setFriendName(value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const result = await findNewFriend(friendName);
      if (result.length) {
        setFoundFriends(result);
        setFriendName("");
        return;
      } else {
        setError("No users found");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <button
        className="btn btn-secondary mb-4"
        onClick={() => window.find_friend_modal.showModal()}
      >
        Find New Friend
      </button>
      <dialog id="find_friend_modal" className="modal">
        {" "}
        <div className="modal-box flex flex-col-reverse">
          {error && (
            <h3 className="mt-4 font-bold text-lg text-red-500">{error}</h3>
          )}
          <div className="flex flex-column flex-wrap items-center justify-center w-full">
            {foundFriends.map((friend: FriendType) => (
              <FoundFriendCard
                key={friend.user_id}
                friend={friend}
                setFoundFriends={setFoundFriends}
              />
            ))}
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center"
          >
            <input
              required
              onChange={handleInputChange}
              value={friendName}
              id="friendName"
              type="text"
              placeholder="Name..."
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <button className="ml-2 btn btn-secondary">Search</button>
          </form>
          <form method="dialog">
            <button
              onClick={() => setFoundFriends([])}
              className="btn btn-circle btn-outline absolute right-2 top-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h3 className="mb-4 font-bold text-lg">Find a new friend</h3>
          </form>
        </div>
      </dialog>{" "}
    </>
  );
};

export default FindFriendModal;
