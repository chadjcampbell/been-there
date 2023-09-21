import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useSelector } from "react-redux";
import { selectPosts } from "../redux/features/posts/postSlice";
import { PostsResponseType } from "./Home";
import MapPostCard from "../components/map/MapPostCard";

const Map = () => {
  const posts: PostsResponseType[] = useSelector(selectPosts);
  function createCustomIcon(profilePictureUrl: string, color: string) {
    const iconHtml = `
      <div style="background-color: ${color}; border-radius: 50%; width: 40px; height: 40px; overflow: hidden; display: flex; justify-content: center; align-items: center;">
        <img src="${profilePictureUrl}" style="width: 90%; height: 90%; border-radius: 50%; object-fit: cover;">
      </div>
    `;

    const customIcon = Leaflet.divIcon({
      className: "custom-icon",
      html: iconHtml,
      iconSize: [40, 40],
    });

    return customIcon;
  }

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
      <MarkerClusterGroup chunkedLoading>
        {posts.map((post) => {
          if (
            typeof post.user_location.latitude === "number" &&
            typeof post.user_location.longitude === "number"
          ) {
            const customIcon = createCustomIcon(post.user.photo_url, "red");
            return (
              <Marker
                key={post.post_id}
                icon={customIcon}
                position={[
                  post.user_location.latitude,
                  post.user_location.longitude,
                ]}
              >
                <Popup>
                  <MapPostCard post={post} />
                </Popup>
              </Marker>
            );
          }
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Map;
