import React, { useState } from 'react';

const ModalBoxContent = () => {
  const [message, setMessage] = useState('Message:');
  const [value, setValue] = useState('Value:');
  const [line, setLine] = useState('Line:');

  const handleButtonClick = () => {
    // Update the content on button click
    setContent('Updated Content');
  };

  return (
    <div className="modal-content">
      <p>{message}</p>
      <p>{value}</p>
      <p>{line}</p>
      {/* <button onClick={handleButtonClick}>Update Content</button> */}
    </div>
  );
};

export default ModalBoxContent;