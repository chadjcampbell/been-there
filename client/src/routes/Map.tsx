const GOOGLE_API = import.meta.env.VITE_GOOGLE_API;
import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import PostCard from "../components/home/PostCard";
import { selectPosts } from "../redux/features/posts/postSlice";
import { PostsResponseType } from "./Home";

const Map = () => {
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const posts: PostsResponseType[] = useSelector(selectPosts);
  const [selectedPost, setSelectedPost] = useState<
    PostsResponseType | undefined | null
  >(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_API,
  });

  const onLoad = (map: google.maps.Map) => {
    setMapRef(map);
    const bounds = new google.maps.LatLngBounds();
    posts?.forEach((post) => {
      if (
        typeof post.user_location.latitude === "number" &&
        typeof post.user_location.longitude === "number"
      ) {
        bounds.extend({
          lat: post.user_location.latitude,
          lng: post.user_location.longitude,
        });
      }
    });
    map.fitBounds(bounds);
  };

  const center = useMemo(
    () => ({ lat: 40.031183, lng: -81.58845610000003 }),
    []
  );

  const onClickMarker = (postId: number) => {
    setSelectedPost(posts.find((post) => post.post_id === postId));
  };
  console.log(posts);
  return !isLoaded ? (
    <h1>Loading...</h1>
  ) : (
    <GoogleMap
      onLoad={onLoad}
      mapContainerStyle={{
        width: "100%",
        height: "100%",
        isolation: "isolate",
      }}
      center={center}
      zoom={5}
    >
      {posts.map((post) => {
        if (
          typeof post.user_location.latitude === "number" &&
          typeof post.user_location.longitude === "number"
        ) {
          const postPosition = {
            lat: post.user_location.latitude,
            lng: post.user_location.longitude,
          };
          console.log(postPosition);
          return (
            <MarkerF
              key={post.post_id}
              onClick={() => onClickMarker(post.post_id)}
              position={postPosition}
            />
          );
        }
      })}
      {selectedPost ? (
        <InfoWindow
          position={{
            lat: selectedPost.user_location.latitude!,
            lng: selectedPost.user_location.longitude!,
          }}
          onCloseClick={() => setSelectedPost(null)}
        >
          <PostCard post={selectedPost} />
        </InfoWindow>
      ) : null}
    </GoogleMap>
  );
};

export default Map;
