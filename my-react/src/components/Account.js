import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Paper, Container } from '@mui/material';
import { useDataStore } from '../store';
import './Account.css'; 

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
      <Paper elevation={3} style={{ padding: '20px', margin: '20px 0', backgroundColor: '#f4f4f2' }}>
        {userData ? (
          <>
            <Typography variant="h4" gutterBottom style={{ color: '#222' }}>
              Account Details
            </Typography>
            {editMode ? (
              <>
                <TextField
                  label="First Name"
                  value={editedData.first_name}
                  onChange={(e) => handleEditChange('first_name', e.target.value)}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  label="Last Name"
                  value={editedData.last_name}
                  onChange={(e) => handleEditChange('last_name', e.target.value)}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  label="Email"
                  value={editedData.email}
                  onChange={(e) => handleEditChange('email', e.target.value)}
                  margin="normal"
                  variant="outlined"
                />

                <TextField
                  label="Classes (comma-separated)"
                  value={editedData.classes.join(', ')}
                  onChange={(e) => handleEditChange('classes', e.target.value.split(',').map(s => s.trim()))}
                  margin="normal"
                  variant="outlined"
                />

                <TextField
                  label="Availability (JSON format)"
                  value={JSON.stringify(editedData.availability)}
                  onChange={(e) => handleEditChange('availability', e.target.value)}
                  margin="normal"
                  multiline
                  variant="outlined"
                />
                <Button onClick={handleSave} variant="contained" style={{ margin: '20px 0', backgroundColor: '#222', color: '#c5b358' }}>
                  Save
                </Button>
              </>
            ) : (
              <>
                <Typography variant="h6" style={{ color: '#222' }}>Name: {userData.first_name} {userData.last_name}</Typography>
                <Typography variant="h6" style={{ color: '#222' }}>Email: {userData.email}</Typography>
                <Typography variant="h6" style={{ color: '#222' }}>Classes:</Typography>
                <ul>
                  {userData.classes.map((className, index) => (
                    <li key={index}>{className}</li>
                  ))}
                </ul>
                <Typography variant="h6" style={{ color: '#222' }}>Availability:</Typography>
                {userData.availability.map((slot, index) => (
                  <Typography key={index} style={{ color: '#222' }}>
                    From: {slot.available_from} - Until: {slot.available_until}
                  </Typography>
                ))}
                <Button onClick={() => setEditMode(true)} variant="contained" color="secondary" style={{ margin: '20px 0', backgroundColor: '#c5b358', color: '#222' }}>
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
