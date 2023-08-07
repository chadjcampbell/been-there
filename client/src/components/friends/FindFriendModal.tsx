const FindFriendModal = () => {
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
            <h3 className="mb-4 font-bold text-lg">Search for a friend</h3>
          </form>
          <form className="flex items-center justify-center">
            <input
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
