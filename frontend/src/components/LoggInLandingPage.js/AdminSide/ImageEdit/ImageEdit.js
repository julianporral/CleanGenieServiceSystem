import React, { useState } from 'react';
import { FaTrash, FaPlus, FaPen, FaImage } from 'react-icons/fa'; // Import icons
import './ImageEdit.css';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ImageEdit = () => {
  // State to manage albums and selected album
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [editingTitle, setEditingTitle] = useState(false);

  // Function to handle adding a new album
  const handleAddAlbum = () => {
    const newAlbum = {
      id: albums.length + 1,
      title: `Album ${albums.length + 1}`,
      images: [] // Placeholder for images in the album
    };
    setAlbums([...albums, newAlbum]);
    setSelectedAlbum(newAlbum);
    setEditingTitle(true);
  };

  // Function to handle deleting an album
  const handleDeleteAlbum = () => {
    if (selectedAlbum) {
      const updatedAlbums = albums.filter(album => album.id !== selectedAlbum.id);
      setAlbums(updatedAlbums);
      setSelectedAlbum(null); // Reset selected album
      setEditingTitle(false);
    }
  };

  // Function to handle editing the title of the selected album
  const handleEditTitle = (e) => {
    const updatedAlbums = albums.map(album =>
      album.id === selectedAlbum.id
        ? { ...album, title: e.target.value }
        : album
    );
    setAlbums(updatedAlbums);
  };

  // Function to handle adding an image to the selected album
  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const imageDataUrl = event.target.result;
        const updatedAlbums = albums.map(album =>
          album.id === selectedAlbum.id
            ? { ...album, images: [...album.images, imageDataUrl] }
            : album
        );
        setAlbums(updatedAlbums);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-edit-wrapper">
      <div className="image-edit-content">
        <h1 className="image-edit-title">Image Editor</h1>

        {/* Add Album button */}
        <button className="action-button add-album-button" onClick={handleAddAlbum}>
          <FaPlus /> Add Album
        </button>

        {/* Display existing albums */}
        {albums.map(album => (
          <div key={album.id} className={`album ${selectedAlbum && selectedAlbum.id === album.id ? 'selected-album' : ''}`}>
            <h2 className="album-title" onClick={() => setSelectedAlbum(album)}>{album.title}</h2>
            {selectedAlbum && selectedAlbum.id === album.id && (
              <>
                <div className="album-actions">
                  {/* Add Image button */}
                  <label htmlFor={`upload-image-${album.id}`} className="action-button">
                    <FaImage /> Add Image
                    <input
                      id={`upload-image-${album.id}`}
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleAddImage}
                    />
                  </label>
                  {/* Edit Album button */}
                  <button className="action-button" onClick={() => setEditingTitle(true)}>
                    <FaPen /> Edit Album
                  </button>
                  {/* Delete Album button */}
                  <button className="action-button delete-album-button" onClick={handleDeleteAlbum}>
                    <FaTrash /> Delete Album
                  </button>
                </div>
                {/* Display images within the selected album */}
                {selectedAlbum.images.map((image, index) => (
                  <div key={index} className="image-thumbnail">
                    <img src={image} alt={`Image ${index + 1}`} />
                    <FaTrash className="delete-image-icon" />
                  </div>
                ))}
              </>
            )}
          </div>
        ))}

        {/* Edit Album Title */}
        {editingTitle && selectedAlbum && (
          <input
            type="text"
            value={selectedAlbum.title}
            onChange={handleEditTitle}
            onBlur={() => setEditingTitle(false)}
            autoFocus
          />
        )}
      </div>
      <Link to="/admin" className="back-button"><FaArrowLeft /> Go Back</Link>
    </div>
    
  );
};

export default ImageEdit;

/** import React, { useState } from 'react';
import { FaTrash, FaPlus, FaPen, FaImage } from 'react-icons/fa'; // Import icons
import './ImageEdit.css';
 */