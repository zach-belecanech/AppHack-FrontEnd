import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Paper, Container, Grid } from '@mui/material';
import { useDataStore } from '../store';

const AccountDetails = () => {
  const { studentid } = useDataStore();
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://34.227.51.137:3000/getStudentInfo/${studentid}`);
        setUserData(response.data);
        setEditedData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, [studentid]);

  const handleEditChange = (field, value) => {
    setEditedData({ ...editedData, [field]: value });
  };
  
  const handleSave = async () => {
    try {
      // Parse the availability JSON before saving
      const updatedData = {
        ...editedData,
        availability: JSON.parse(editedData.availability)
      };
      await axios.put(`http://34.227.51.137:3000/updateStudent/${studentid}`, updatedData);
      setUserData(updatedData);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
        {userData ? (
          <>
            <Typography variant="h4" gutterBottom>
              Account Details
            </Typography>
            {editMode ? (
              <>
                <TextField
                  label="First Name"
                  value={editedData.first_name}
                  onChange={(e) => handleEditChange('first_name', e.target.value)}
                  margin="normal"
                />
                <TextField
                  label="Last Name"
                  value={editedData.last_name}
                  onChange={(e) => handleEditChange('last_name', e.target.value)}
                  margin="normal"
                />
                <TextField
                  label="Email"
                  value={editedData.email}
                  onChange={(e) => handleEditChange('email', e.target.value)}
                  margin="normal"
                />
                {/* Add fields for classes and availability */}
                <TextField
                  label="Classes (comma-separated)"
                  value={editedData.classes.join(', ')}
                  onChange={(e) => handleEditChange('classes', e.target.value.split(',').map(s => s.trim()))}
                  margin="normal"
                />
                {/* You may want to add a more sophisticated editor for availability */}
                <TextField
                  label="Availability (JSON format)"
                  value={JSON.stringify(editedData.availability)}
                  onChange={(e) => handleEditChange('availability', JSON.parse(e.target.value))}
                  margin="normal"
                  multiline
                />
                <Button onClick={handleSave} variant="contained" color="primary" style={{ margin: '20px 0' }}>
                  Save
                </Button>
              </>
            ) : (
              <>
                <Typography variant="h6">Name: {userData.first_name} {userData.last_name}</Typography>
                <Typography variant="h6">Email: {userData.email}</Typography>
                <Typography variant="h6">Classes:</Typography>
                <ul>
                  {userData.classes.map((className, index) => (
                    <li key={index}>{className}</li>
                  ))}
                </ul>
                <Typography variant="h6">Availability:</Typography>
                {userData.availability.map((slot, index) => (
                  <Typography key={index}>
                    From: {slot.available_from} - Until: {slot.available_until}
                  </Typography>
                ))}
                <Button onClick={() => setEditMode(true)} variant="contained" color="secondary" style={{ margin: '20px 0' }}>
                  Edit
                </Button>
              </>
            )}
          </>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default AccountDetails;
