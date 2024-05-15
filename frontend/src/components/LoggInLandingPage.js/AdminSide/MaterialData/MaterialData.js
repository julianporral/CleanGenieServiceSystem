import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../GoogleSignin/config';
import './MaterialData.css';
import CompanyLogo from './CompanyLogo.png';

function MaterialData({ onBookService }) {
    useEffect(() => {
        fetchData();
    }, []);

    const [cellValues, setCellValues] = useState([]);

    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'inventory'));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCellValues(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleCellValueChange = (id, key, value) => {
        const updatedCellValues = cellValues.map(cell => {
            if (cell.id === id) {
                return { ...cell, [key]: value };
            } else {
                return cell;
            }
        });
        setCellValues(updatedCellValues);
    };

    const handleSubmit = async () => {
        try {
            for (const cell of cellValues) {
                if (cell.id) {
                    await updateDoc(doc(db, 'inventory', cell.id), cell);
                } else {
                    const docRef = await addDoc(collection(db, 'inventory'), cell);
                    setCellValues(prevState => {
                        const updatedState = prevState.map(prevCell => {
                            if (!prevCell.id && prevCell === cell) {
                                return { ...cell, id: docRef.id };
                            }
                            return prevCell;
                        });
                        return updatedState;
                    });
                }
            }
            alert('Data submitted successfully.');
        } catch (error) {
            console.error('Error submitting data:', error);
            alert('Failed to submit data. Please try again later.');
        }
    };

    const handleAddRow = () => {
        const newRow = { itemName: '', dateOfPurchase: '', category: '', amount: '', amountType: '', price: '' };
        setCellValues([...cellValues, newRow]);
    };

    const handleDeleteRow = async (id) => {
        try {
            await deleteDoc(doc(db, 'inventory', id));
            setCellValues(cellValues.filter(cell => cell.id !== id));
            alert('Row deleted successfully.');
        } catch (error) {
            console.error('Error deleting row:', error);
            alert('Failed to delete row. Please try again later.');
        }
    };

    const handleBookService = async (serviceType, sqm) => {
        // Deduct chemicals
        deductChemicals(serviceType, sqm);

        // Prepare data to send to AdminFinanceData
        const serviceData = {
            serviceType,
            sqm,
            cleaners: 1, // Placeholder for now
        };

        // Send data to AdminFinanceData
        onBookService(serviceData);
    };

    const deductChemicals = (serviceType, sqm) => {
        // Define initial values for chemicals
        let detergentAmount = 0;
        let microfiberClothsAmount = 0;
        let brushesAmount = 0;
        let mopsAmount = 0;

        // Deduct chemicals based on service type and sqm
        if (serviceType === 'Deep Cleaning') {
            if (sqm <= 20) {
                detergentAmount = 3;
                microfiberClothsAmount = 2;
                brushesAmount = 1;
                mopsAmount = 1;
            } else if (sqm >= 50 && sqm <= 100) {
                detergentAmount = 6;
                microfiberClothsAmount = 3;
                brushesAmount = 2;
                mopsAmount = 2;
            }
        } else if (serviceType === 'Post Construction Cleaning' && sqm >= 100 && sqm <= 300) {
            detergentAmount = 5;
            microfiberClothsAmount = 5;
            brushesAmount = 3;
            mopsAmount = 3;
        }

        // Deduct the amount from the inventory
        const updatedCellValues = cellValues.map(cell => {
            if (cell.category === 'Chemicals') {
                if (cell.itemName === 'Detergents') {
                    return { ...cell, amount: Math.max(0, cell.amount - detergentAmount) };
                } else if (cell.itemName === 'Microfiber cloths') {
                    return { ...cell, amount: Math.max(0, cell.amount - microfiberClothsAmount) };
                } else if (cell.itemName === 'Brushes') {
                    return { ...cell, amount: Math.max(0, cell.amount - brushesAmount) };
                } else if (cell.itemName === 'Mops') {
                    return { ...cell, amount: Math.max(0, cell.amount - mopsAmount) };
                } else {
                    return cell;
                }
            } else {
                return cell;
            }
        });

        setCellValues(updatedCellValues);
    };

    return (
        <div className="Material-sheet-form">
            <h1>Material Data <input type="image" src={CompanyLogo} alt="Submit" width="50" height="40" /></h1>
            <div className="Spread-Sheet">
                <h2>Data Sheet</h2>
                <div className="Sheet-Container">
                    <table className="Sheet-Structure">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Date of Purchase</th>
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Amount Type</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cellValues.map((cell, index) => (
                                <tr key={index}>
                                    <td><input type="text" value={cell.itemName} onChange={(e) => handleCellValueChange(cell.id, 'itemName', e.target.value)} /></td>
                                    <td><input type="text" value={cell.dateOfPurchase} onChange={(e) => handleCellValueChange(cell.id, 'dateOfPurchase', e.target.value)} /></td>
                                    <td>
                                        <select value={cell.category} onChange={(e) => handleCellValueChange(cell.id, 'category', e.target.value)}>
                                            <option value="">Select Category</option>
                                            <option value="Cleaning     Equipment"> Cleaning  Equipment</option>
                                            <option value="Supplies/Material">Cleaning Supplies/Materials</option>
                                            <option value="Cleaning Chemicals">Cleaning Chemicals</option>
                                        </select>
                                    </td>
                                    <td><input type="text" value={cell.amount} onChange={(e) => handleCellValueChange(cell.id, 'amount', e.target.value)} /></td>
                                    <td>
                                        <select value={cell.amountType} onChange={(e) => handleCellValueChange(cell.id, 'amountType', e.target.value)}>
<option value="">Select Amount Type</option>
<option value="Liters">Liters</option>
<option value="Bottles">Bottles</option>
<option value="Unit">Unit</option>
</select>
</td>
<td><input type="text" value={cell.price} onChange={(e) => handleCellValueChange(cell.id, 'price', e.target.value)} /></td>
<td><button onClick={() => handleDeleteRow(cell.id)}>Delete</button></td>
</tr>
))}
</tbody>
</table>
</div>
</div>
<div className="button-container">
<button className="button" onClick={handleSubmit}>Submit Data</button>
<button className="add-row-button" onClick={handleAddRow}>Add Row</button>
</div>
<Link to="/admin" className="back-button"><FaArrowLeft /> Go Back</Link>
</div>
);
}

export default MaterialData;


