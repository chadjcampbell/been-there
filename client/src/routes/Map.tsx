import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import { SET_POSTS, selectPosts } from "../redux/features/posts/postSlice";
import { PostsResponseType } from "./Home";
import MapPostCard from "../components/map/MapPostCard";
import { stringToColor } from "../utils/stringToColor";
import { useEffect } from "react";
import { findAllPosts } from "../redux/features/posts/postService";
import MarkerClusterGroup from "../components/map/MarkerClusterGroup";

const Map = () => {
  const posts: PostsResponseType[] = useSelector(selectPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchPosts() {
      const data = await findAllPosts(-1);
      dispatch(SET_POSTS(data));
    }
    fetchPosts();
  }, []);

  const createCustomIcon = (profilePictureUrl: string, color: string) => {
    const iconHtml = `
    <div style="width: 40px; height: 40px; position: relative;">
      <div style="background-color: ${color}; border-radius: 50%; width: 40px; height: 40px; overflow: hidden; display: flex; justify-content: center; align-items: center;">
        <img src="${profilePictureUrl}" style="width: 80%; height: 80%; border-radius: 50%; object-fit: cover; z-index:2">
      </div>
      <div style="width: 0; height: 0; border-left: 18px solid transparent; border-right: 18px solid transparent; border-top: 20px solid ${color}; position: absolute; bottom: -9px; left: 50%; transform: translateX(-50%);"></div>
    </div>
  `;

    const customIcon = Leaflet.divIcon({
      className: "custom-icon",
      html: iconHtml,
      iconSize: [40, 60],
    });

    return customIcon;
  };

  return (
    <MapContainer
      className="w-full isolate"
      center={[40, -80]}
      zoom={5}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        {posts.length &&
          posts.map((post) => {
            if (
              typeof post.user_location.latitude === "number" &&
              typeof post.user_location.longitude === "number"
            ) {
              const customIcon = createCustomIcon(
                post.user.photo_url,
                stringToColor(post.user.email)
              );
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
