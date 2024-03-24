import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Paper, Container, Grid } from '@mui/material';


const AccountDetails = () => {
  const [userDetails, setUserDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://34.227.51.137:3000/getStudentDetails');
        setUserDetails(response.data[0]); 
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Account Details</Typography>
      {isEditing ? (
        <EditForm userDetails={userDetails} setIsEditing={setIsEditing} />
      ) : (
        <DisplayDetails userDetails={userDetails} onEdit={handleEdit} />
      )}
    </Container>
  );
};

const DisplayDetails = ({ userDetails, onEdit }) => {
  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h6">Name: {userDetails.first_name} {userDetails.last_name}</Typography>
      <Typography variant="h6">Email: {userDetails.email}</Typography>
      <Button variant="contained" color="primary" onClick={onEdit} sx={{ marginTop: 2 }}>Edit</Button>
    </Paper>
  );
};

const EditForm = ({ userDetails, setIsEditing }) => {
  const [editedDetails, setEditedDetails] = useState({ ...userDetails });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails({ ...editedDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://34.227.51.137:3000/updateStudentPersonalInfo', editedDetails);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="First Name"
              name="first_name"
              value={editedDetails.first_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Last Name"
              name="last_name"
              value={editedDetails.last_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={editedDetails.email}
              onChange={handleChange}
            />
          </Grid>
          {/* Add more fields as needed */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">Save</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AccountDetails;
