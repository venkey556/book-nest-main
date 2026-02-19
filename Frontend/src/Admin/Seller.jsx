
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import Anavbar from './Anavbar';

function Seller() {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    // Fetch seller data
    axios.get('http://localhost:4000/sellers')
      .then((response) => {
        setSellers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching sellers: ', error);
      });
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'SkyBlue', // Set your desired background color here
        padding: '20px',
      }}
    >
      <Anavbar />
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-semibold mb-4 text-center">Sellers</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller) => (
              <tr key={seller._id}>
                <td>{seller._id}</td>
                <td>{seller.name}</td>
                <td>{seller.email}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(seller._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Seller;