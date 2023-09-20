import { useParams, useNavigate } from "react-router-dom";

const FullScreenImage = () => {
  const { imageUrl } = useParams();
  const navigate = useNavigate();

  // Handle the case when the user clicks the "Back" button or presses the browser's back button
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black">
      <div className="absolute top-0 right-0 p-4">
        <button
          className="text-white bg-black border border-white px-2 py-1 rounded hover:bg-white hover:text-black"
          onClick={handleGoBack}
        >
          Back
        </button>
      </div>
      <img
        src={imageUrl}
        alt="Full Screen"
        className="max-h-screen max-w-screen"
      />
    </div>
  );
};

export default FullScreenImage;
