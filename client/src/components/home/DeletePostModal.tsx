import { FormEvent } from "react";
import { toast } from "react-hot-toast";
import { BsTrash } from "react-icons/bs";

declare global {
  interface Window {
    delete_post_modal: HTMLDialogElement;
  }
}

// TODO - need to pass posts and use id to make unique dialogs

const DeletePostModal = () => {
  const handleDelete = async (event: FormEvent) => {
    event.preventDefault();
    try {
      //delete post here
      return;
    } catch {
      toast.error("Something went wrong");
    } finally {
      window.delete_post_modal.close();
    }
  };

  return (
    <>
      <button
        className="btn btn-error mb-4"
        onClick={() => window.delete_post_modal.showModal()}
      >
        <BsTrash />
      </button>
      <dialog id="delete_post_modal" className="modal">
        <div className="modal-box flex flex-col">
          <div className="flex flex-column flex-wrap items-center justify-center w-full">
            <h2>Delete this post?</h2>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DeletePostModal;
