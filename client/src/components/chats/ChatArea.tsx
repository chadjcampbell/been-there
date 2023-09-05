import { useSelector } from "react-redux";
import { selectChatId } from "../../redux/features/chats/chatSlice";
import {
  SendMessageData,
  sendMessage,
} from "../../redux/features/chats/chatService";
import { useRef, useState, FormEvent, ChangeEvent, useEffect } from "react";
import toast from "react-hot-toast";
import { BsSendFill } from "react-icons/bs";
import { MdAddAPhoto, MdCancel } from "react-icons/md";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { GoSmiley } from "react-icons/go";
import ChatDisplay from "./ChatDisplay";

const ChatArea = () => {
  const friendId = useSelector(selectChatId);
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const initialPostValues = { message: "", messagePhotoUrl: "" };
  const [message, setMessage] = useState(initialPostValues);
  const [messageImage, setMessageImage] = useState<File | null>(null);
  const pickerRef = useRef<HTMLDetailsElement | null>(null);

  const handleEmojiSelect = (event: { native: string }) => {
    const newText = message.message + event.native;
    setMessage({ ...message, message: newText });
  };

  const closeEmojiPicker = () => {
    if (pickerRef.current) {
      pickerRef.current.open = false;
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let value = event.target.value;
    setMessage({ ...message, [event.target.name]: value });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setMessageImage(event.target.files[0]);
    }
  };

  const handlePicButton = () => {
    hiddenFileInput.current?.click();
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      // handle image upload to cloudinary
      let imageURL: string = "";
      if (
        messageImage &&
        (messageImage.type === "image/jpeg" ||
          messageImage.type === "image/jpg" ||
          messageImage.type === "image/png" ||
          messageImage.type === "image/webp")
      ) {
        const image = new FormData();
        image.append("file", messageImage);
        image.append("cloud_name", "duu3fdfk0");
        image.append("upload_preset", "zx0zcbpv");

        // save to cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/duu3fdfk0/image/upload",
          { method: "post", body: image }
        );
        const imageData = await response.json();
        imageURL = imageData.url.toString();
      }

      // send all data to backend
      const formData: SendMessageData = {
        friendId: friendId,
        message: message.message,
        messagePhotoUrl: imageURL,
      };

      const newMessage = await sendMessage(formData);
      if (newMessage) {
        toast.success("Message sent");
      }
      setMessage(initialPostValues);
      setMessageImage(null);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col border-r-2 overflow-y-auto h-[calc(100vh-8rem)] w-full justify-end">
      <div className="w-full px-5 flex flex-col justify-between overflow-y-auto">
        <ChatDisplay />
        <div className="py-5 sticky bottom-0 bg-white">
          {messageImage && (
            <div className="flex content-center justify-center max-h-36 aspect-square relative">
              <img
                src={URL.createObjectURL(messageImage)}
                alt="Post image preview"
                className=" m-4 rounded-xl shadow-sm"
              />
              <button onClick={() => setMessageImage(null)}>
                <MdCancel
                  size={24}
                  className="absolute top-[-0.5rem] right-0 text-red-700"
                />
              </button>
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center"
          >
            <input
              className="w-full bg-gray-300 py-5 px-3 rounded-xl mr-3"
              type="text"
              placeholder="type your message here..."
              required
              value={message.message}
              onChange={handleInputChange}
              autoComplete="off"
              name="message"
            />
            <input
              type="file"
              onChange={handleImageChange}
              ref={hiddenFileInput}
              className="hidden" // Make the file input element invisible, because it's ugly
            />
            <details
              ref={pickerRef}
              className="dropdown dropdown-top dropdown-end hidden md:block"
            >
              <summary className="m-1 btn btn-sm">
                <GoSmiley />
              </summary>
              <div
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mr-10"
              >
                <Picker
                  onClickOutside={closeEmojiPicker}
                  data={data}
                  onEmojiSelect={handleEmojiSelect}
                />
              </div>
            </details>
            <button
              onClick={handlePicButton}
              type="button"
              className="badge btn btn-sm mr-2"
            >
              <MdAddAPhoto size="1.5rem" title="Add Picture to post" />
            </button>
            <button type="submit" className="badge btn btn-secondary btn-sm">
              {isLoading ? (
                <span className="loading loading-spinner text-white loading-lg"></span>
              ) : (
                <BsSendFill />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
