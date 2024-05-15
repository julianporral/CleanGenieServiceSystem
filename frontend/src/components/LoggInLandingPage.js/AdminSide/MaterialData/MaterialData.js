import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './MaterialData.css';

function MaterialData() {
  // Define state to hold cell values
  const [cellValues, setCellValues] = useState(generateInitialCellValues(20));

  // Function to generate initial cell values
  function generateInitialCellValues(numRows) {
    const initialCellValues = [];
    for (let i = 0; i < numRows; i++) {
      initialCellValues.push({ date: '', description: '', category: '', amount: '' });
    }
    return initialCellValues;
  }

  // Function to handle cell value change
  const handleCellValueChange = (index, key, value) => {
    const updatedCellValues = [...cellValues];
    updatedCellValues[index][key] = value;
    setCellValues(updatedCellValues);
  };

  return (
    <div className="Material-sheet-form">
      <h1>Material Data</h1>
      <div className="Spread-Sheet">
        <h2>Data Sheet</h2>
        <div className="Sheet-Container">
          <table className="Sheet-Structure">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {cellValues.map((cell, index) => (
                <tr key={index}>
                  <td><input type="text" value={cell.date} onChange={(e) => handleCellValueChange(index, 'date', e.target.value)} /></td>
                  <td><input type="text" value={cell.description} onChange={(e) => handleCellValueChange(index, 'description', e.target.value)} /></td>
                  <td><input type="text" value={cell.category} onChange={(e) => handleCellValueChange(index, 'category', e.target.value)} /></td>
                  <td><input type="text" value={cell.amount} onChange={(e) => handleCellValueChange(index, 'amount', e.target.value)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Link to="/admin" className="back-button"><FaArrowLeft /> Go Back</Link>
    </div>
  );
}

export default MaterialData;
