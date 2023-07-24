import React, { useState, useEffect } from 'react';
import './ModalBox.css'; 

const ModalBox = ({ isOpen, onClose, selectedRow }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/validate/'+selectedRow)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [isOpen]);

  if (!isOpen) {
    return null; // If the modal is not open, don't render anything
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{data.length > 0?'Error Found':'Data is valid'}</h2>
        <p><span>Message: </span>{data.length>0?data[0].message:''}</p>
        <p><span>Value: </span>{data.length>0?data[0].value:''}</p>
        <p><span>Line: </span>{data.length>0?data[0].line:''}</p>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ModalBox;