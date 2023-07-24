import React, { useState } from 'react';
import ModalBox from './ModalBox';

const ModalButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Open Modal</button>
      <ModalBox isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>This is a Modal Box</h2>
        <p>Modal content goes here...</p>
      </ModalBox>
    </div>
  );
};

export default ModalButton;
