import React, { useEffect } from 'react';
import { Overlay, ModalContainer, ModalImage } from './Modal.styled';

export const Modal = ({ onClose, largeImageURL }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.classList.add('modal-opened');

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-opened');
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalContainer>
        <ModalImage src={largeImageURL} alt="" />
      </ModalContainer>
    </Overlay>
  );
};
