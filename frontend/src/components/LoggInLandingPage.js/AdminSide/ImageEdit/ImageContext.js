// ImageContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the context
const ImageContext = createContext();

// Create a custom hook to use the context
export const useImageContext = () => useContext(ImageContext);

// Create a provider for the context
export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  // Function to add an image to the context
  const addImage = (image) => {
    setImages([...images, image]);
  };

  // Function to delete an image from the context
  const deleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <ImageContext.Provider value={{ images, addImage, deleteImage }}>
      {children}
    </ImageContext.Provider>
  );
};
