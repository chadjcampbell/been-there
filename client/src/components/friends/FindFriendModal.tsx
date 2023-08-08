import { useState, ChangeEvent, FormEvent } from "react";

declare global {
  interface Window {
    find_friend_modal: HTMLDialogElement;
  }
}

const FindFriendModal = () => {
  const [friendName, setFriendName] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setFriendName(value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
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
            <button className="text-lg btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              x
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
