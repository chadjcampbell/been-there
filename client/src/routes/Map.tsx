const GOOGLE_API = import.meta.env.VITE_GOOGLE_API;
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useRef, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { selectPosts } from "../redux/features/posts/postSlice";
import { PostsResponseType } from "./Home";
import PostCard from "../components/home/PostCard";

export default function Map() {
  const posts: PostsResponseType[] = useSelector(selectPosts);
  const mapRef = useRef<any>(null);
  const [selectedPost, setSelectedPost] = useState<
    PostsResponseType | undefined | null
  >(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_API,
  });

  const center = {
    lat: 40.031183,
    lng: -81.58845610000003,
  };

  const onLoad = useCallback(
    (mapInstance: google.maps.Map) => {
      const bounds = new google.maps.LatLngBounds();
      posts.forEach((post: PostsResponseType) => {
        if (post.user_location.latitude && post.user_location.longitude) {
          bounds.extend(
            new google.maps.LatLng(
              post.user_location.latitude,
              post.user_location.longitude
            )
          );
        }
      });
      mapRef.current = mapInstance;
      mapInstance.fitBounds(bounds);
    },
    [posts]
  );
  const onClickMarker = (postId: number) => {
    setSelectedPost(posts.find((post) => post.post_id === postId));
  };
  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={4}
        onLoad={onLoad}
      >
        {posts.map(
          (post) =>
            post.user_location.latitude &&
            post.user_location.longitude && (
              <Marker
                key={post.post_id}
                onClick={() => onClickMarker(post.post_id)}
                position={{
                  lat: post.user_location.latitude,
                  lng: post.user_location.longitude,
                }}
              />
            )
        )}
        {selectedPost &&
        selectedPost.user_location.latitude &&
        selectedPost.user_location.longitude ? (
          <InfoWindow
            position={{
              lat: selectedPost.user_location.latitude,
              lng: selectedPost.user_location.longitude,
            }}
            onCloseClick={() => setSelectedPost(null)}
          >
            <PostCard post={selectedPost} />
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </>
  ) : null;
}
