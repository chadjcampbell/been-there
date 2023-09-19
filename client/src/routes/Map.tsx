import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";
import { selectPosts } from "../redux/features/posts/postSlice";
import { PostsResponseType } from "./Home";
import PostCard from "../components/home/PostCard";

const Map = () => {
  const posts: PostsResponseType[] = useSelector(selectPosts);

  return (
    <MapContainer
      className="w-full h-full isolate"
      center={[40, -80]}
      zoom={5}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {posts.map((post) => {
        if (
          typeof post.user_location.latitude === "number" &&
          typeof post.user_location.longitude === "number"
        ) {
          return (
            <Marker
              position={[
                post.user_location.latitude,
                post.user_location.longitude,
              ]}
            >
              <Popup>
                <PostCard post={post} />
              </Popup>
            </Marker>
          );
        }
      })}
    </MapContainer>
  );
};

export default Map;
