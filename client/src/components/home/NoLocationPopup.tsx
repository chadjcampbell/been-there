const NoLocationPopup = () => {
  const handleCancel = () => {
    window.main_modal.close();
  };

  return (
    <dialog id="main_modal" className="modal">
      <form
        method="dialog"
        className="modal-box flex flex-col justify-center items-center"
      >
        <h3 className="mb-4 font-bold text-lg">Are you sure?</h3>
        <div className="">
          <button className="btn btn-error" onClick={handleDelete}>
            Post
          </button>
          <button className="btn btn-primary ml-4" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button onClick={handleCancel}>close</button>
      </form>
    </dialog>
  );
};

export default NoLocationPopup;
