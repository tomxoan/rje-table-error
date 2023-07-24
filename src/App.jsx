import React, { useState, useEffect } from 'react';
import Papa from 'papaparse'; 
import ModalBox from './ModalBox';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [errorColumn, setErrorColumn] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(0);

  useEffect(() => {
    // Replace 'your-csv-file-path.csv' with the actual path to your CSV file.
    fetch('equipment_list.csv')
      .then((response) => response.text())
      .then((csvData) => {
        // Parse CSV data using papaparse (optional).
        const parsedData = Papa.parse(csvData, { header: true }).data;
        // const arrayDataWithRowNumber = parsedData.map((obj, index) => {
        //   return { rowNumber: index + 1,...obj,  };
        // });
        // console.log(arrayDataWithRowNumber);
        setData(parsedData);
      })
      .catch((error) => {
        console.error('Error fetching or parsing CSV data:', error);
      });

      fetch('http://localhost:3000/validate')
      .then((response) => response.json())
      .then((data) => {
        setErrorColumn(data.filter((row) => row.message == 'Unknown field').map((col) => col.value));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleOpenModal = (event) => {
    setSelectedRow(event.target.id);
    setIsModalOpen(true);

  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <h1>RJE Data Table</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            {data.length > 0 &&
              Object.keys(data[0]).map((header, index) => (
                <th key={index} className={errorColumn.includes(header)?'highlighted-column':'normal-column'} >{header}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td><button id={`${index + 2}`}  onClick={handleOpenModal}>Validate</button></td>
              {Object.values(row).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <ModalBox isOpen={isModalOpen} onClose={handleCloseModal} selectedRow={selectedRow}>
        <h2>This is a Modal Box</h2>
        <p>Modal content goes here...</p>
      </ModalBox>
    </>
  );
};

export default DataTable;