// Gallery.jsx
import React, { useState } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [selectedAlbumIndex, setSelectedAlbumIndex] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const albums = [
    {
      title: 'Album 1',
      images: [
        { src: 'image1.jpg', alt: 'Image 1' },
        { src: 'image2.jpg', alt: 'Image 2' },
        { src: 'image3.jpg', alt: 'Image 3' },
        { src: 'image4.jpg', alt: 'Image 4' },
        { src: 'image5.jpg', alt: 'Image 5' },
      ],
    },
    {
      title: 'Album 2',
      images: [
        { src: 'image6.jpg', alt: 'Image 6' },
        { src: 'image7.jpg', alt: 'Image 7' },
        { src: 'image8.jpg', alt: 'Image 8' },
        { src: 'image9.jpg', alt: 'Image 9' },
        { src: 'image10.jpg', alt: 'Image 10' },
      ],
    },
    {
      title: 'Album 3',
      images: [
        { src: 'image11.jpg', alt: 'Image 11' },
        { src: 'image12.jpg', alt: 'Image 12' },
        { src: 'image13.jpg', alt: 'Image 13' },
        { src: 'image14.jpg', alt: 'Image 14' },
        { src: 'image15.jpg', alt: 'Image 15' },
      ],
    },
  ];

  const handleAlbumClick = (albumIndex) => {
    setSelectedAlbumIndex(albumIndex);
    setSelectedImageIndex(0); 
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? albums[selectedAlbumIndex].images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === albums[selectedAlbumIndex].images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleCloseModal = () => {
    setSelectedAlbumIndex(null);
    setSelectedImageIndex(null);
  };

  return (
    <div className="gallery">
      <h1 className="gallery-title">Gallery</h1>
      <div className="albums-container">
        {albums.map((album, index) => (
          <div className="album" key={index} onClick={() => handleAlbumClick(index)}>
            <h2 className="album-title">{album.title}</h2>
            <img src={album.images[0].src} alt={album.images[0].alt} className="album-cover" />
          </div>
        ))}
      </div>
      {selectedAlbumIndex !== null && selectedImageIndex !== null && (
        <div className="selected-image-modal">
          <button className="exit-btn" onClick={handleCloseModal}>
            X
          </button>
          <img
            src={albums[selectedAlbumIndex].images[selectedImageIndex].src}
            alt={albums[selectedAlbumIndex].images[selectedImageIndex].alt}
            className="selected-image"
          />
          <button className="prev-btn" onClick={handlePrevImage}>
            Prev
          </button>
          <button className="next-btn" onClick={handleNextImage}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
