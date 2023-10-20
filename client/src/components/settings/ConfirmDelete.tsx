const ConfirmDelete = ({ handleDelete, setConfirmDelete }: any) => {
  return (
    <div className="w-screen h-screen bg-red-700 flex justify-center items-center">
      <form className="flex flex-col justify-center items-center bg-white mx-4 rounded-md p-4">
        <h3 className="mb-4 font-bold text-lg">
          Are you sure you want to delete your account?
        </h3>
        <div className="">
          <button className="btn btn-error" onClick={handleDelete}>
            DELETE
          </button>
          <button
            className="btn btn-primary ml-4"
            onClick={() => setConfirmDelete(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfirmDelete;
