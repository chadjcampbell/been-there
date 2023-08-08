import { useState, ChangeEvent, FormEvent } from "react";
import { socket } from "../../socket";
import { toast } from "react-hot-toast";
declare global {
  interface Window {
    find_friend_modal: HTMLDialogElement;
  }
}

type SocketEmitReturnTypes = {
  errorMessage: string;
  done: boolean;
};

const FindFriendModal = () => {
  const [friendName, setFriendName] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setFriendName(value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    socket.emit(
      "add_friend",
      friendName,
      ({ errorMessage, done }: SocketEmitReturnTypes) => {
        if (done) {
          toast.success("Friend added");
          window.find_friend_modal.close();
          return;
        }
        toast.error(errorMessage);
      }
    );
    // logic to find friends here
    setFriendName("");
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
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-circle btn-outline absolute right-2 top-2">
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
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center"
          >
            <input
              required
              onChange={handleInputChange}
              value={friendName}
              type="text"
              placeholder="Name..."
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <button className="ml-2 btn btn-secondary">Search</button>
          </form>
        </div>
      </dialog>{" "}
    </>
  );
};

export default FindFriendModal;
