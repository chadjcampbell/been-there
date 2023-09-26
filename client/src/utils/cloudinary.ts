import { Cloudinary, CloudinaryImage } from "@cloudinary/url-gen";

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: "duu3fdfk0",
  },
});

function extractImageIdFromUrl(url: string): string | undefined {
  const parts = url.split("/");
  const filename = parts.pop(); // Get the last part of the URL
  if (filename) {
    // Extract the image ID by removing the file extension and any potential query parameters
    const id = filename.split(".")[0];
    return id;
  }
  return undefined;
}

export const getCloudinaryImage = (url: string): CloudinaryImage => {
  const myImage = cloudinary.image(extractImageIdFromUrl(url)).format("auto");
  return myImage;
};
