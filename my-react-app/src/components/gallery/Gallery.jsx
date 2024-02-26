// Gallery.jsx
import React, { useState } from 'react';
import './Gallery.css';

const Image = ({ src, alt }) => (
  <img src={src} alt={alt} className="image" />
);

const Gallery = () => {
  const [expandedAlbum, setExpandedAlbum] = useState(null);

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

  const toggleAlbum = (index) => {
    setExpandedAlbum(expandedAlbum === index ? null : index);
  };

  const Album = ({ title, images, index }) => (
    <div className="album-container">
      <button className="album-title" onClick={() => toggleAlbum(index)}>
        {title}
      </button>
      <div className="album" onClick={() => toggleAlbum(index)}>
        {expandedAlbum === index && (
          <div className="album-images">
            {images.map((image, index) => (
              <Image key={index} src={image.src} alt={image.alt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className='bodygallery'>
      <div className="gallery">
        <h1 className="gallery-title">Gallery</h1>
        {albums.map((album, index) => (
          <Album key={index} index={index} title={album.title} images={album.images} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
