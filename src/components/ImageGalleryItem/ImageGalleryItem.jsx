import React, { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import { GalleryItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <GalleryItem>
      <Image
        src={webformatURL}
        alt=""
        onClick={() => {
          toggleModal();
        }}
      />
      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          onClose={() => {
            toggleModal();
          }}
        />
      )}
    </GalleryItem>
  );
};
