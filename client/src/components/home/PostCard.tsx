import { AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";

export const PostCard = () => {
  return (
    <div className="card max-w-[600px] bg-base-100 shadow-xl m-4">
      <figure className="flex flex-col">
        <img
          className="max-w-md rounded-xl m-4"
          src="https://picsum.photos/300/400"
          alt="Shoes"
        />
        <figcaption>🇫🇷 Paris, France</figcaption>
      </figure>
      <div className="card-body">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src="https://fastly.picsum.photos/id/64/4326/2884.jpg?hmac=9_SzX666YRpR_fOyYStXpfSiJ_edO3ghlSRnH2w09Kg" />
          </div>
        </div>
        <h2 className="card-title">Fake User</h2>
        <p>
          A land of art, romance, and rich history. From the Eiffel Tower to
          fine wines, it captivates with its cultural allure. Gastronomy,
          fashion, and iconic landmarks make it a global treasure. Vive la
          France!{" "}
        </p>
        <div className="card-actions justify-between mt-4">
          <div className="badge btn">
            <AiOutlineHeart />
            13
          </div>
          <div className="badge btn btn-secondary">
            <FaRegCommentAlt />
            11 Comments
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
