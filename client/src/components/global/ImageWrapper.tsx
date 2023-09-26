import { AdvancedImage } from "@cloudinary/react";
import React, { ReactElement, ReactNode } from "react";
import { Link } from "react-router-dom";
import { getCloudinaryImage } from "../../utils/cloudinary";

type ImageWrapperProps = {
  children: ReactNode;
};

const ImageWrapper: React.FC<ImageWrapperProps> = ({ children }) => {
  // Find the URL of the image from the child <img> element
  let imageUrl = "";

  React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === "img") {
      const imgElement = child as ReactElement<HTMLImageElement>;
      imageUrl = imgElement.props.src || "";
    }
    if (React.isValidElement(child) && child.type === AdvancedImage) {
      const imgElement = child as ReactElement<any>;
      imageUrl = getCloudinaryImage(imgElement.props.cldImg.publicID).toURL();
    }
    return null;
  });

  return (
    <Link to={`/fullscreen/${encodeURIComponent(imageUrl)}`}>{children}</Link>
  );
};

export default ImageWrapper;
