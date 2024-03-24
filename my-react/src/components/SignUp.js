import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import MenuItem from '@mui/material/MenuItem';

export const SignUp = ({ onSignUp }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [availabilityRanges, setAvailabilityRanges] = useState([{ availableFrom: '', availableUntil: '', period: 'AM', period2: 'AM' }]);
  const [classes, setClasses] = useState([]);
  const [classList, setClassList] = useState([]);

  // Fetch classes from API
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('http://34.227.51.137:3000/getClasses');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setClassList(data); // Assuming data is an array of class objects
        console.log(classList);
      } catch (error) {
        console.error('Error fetching classes:', error.message);
      }
    };
    fetchClasses();
  }, []);

  const createFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const createLastName = (event) => {
    setLastName(event.target.value);
  };

  const createEmail = (event) => {
    setEmail(event.target.value);
  };

  const createPassword = (event) => {
    setPassword(event.target.value);
  };

  const handleAvailabilityFromChange = (index, event) => {
    const newAvailabilityRanges = [...availabilityRanges];
    newAvailabilityRanges[index].availableFrom = event.target.value;
    setAvailabilityRanges(newAvailabilityRanges);
  };

  const handleAvailabilityUntilChange = (index, event) => {
    const newAvailabilityRanges = [...availabilityRanges];
    newAvailabilityRanges[index].availableUntil = event.target.value;
    setAvailabilityRanges(newAvailabilityRanges);
  };

  const handleAddAvailabilityRange = () => {
    setAvailabilityRanges([...availabilityRanges, { availableFrom: '', availableUntil: '', period: 'AM', period2: 'AM' }]);
  };

  const handleRemoveAvailabilityRange = (index) => {
    const newAvailabilityRanges = [...availabilityRanges];
    newAvailabilityRanges.splice(index, 1);
    setAvailabilityRanges(newAvailabilityRanges);
  };

  const handleClassChange = (event) => {
    const selectedClassNames = event.target.value;
    console.log('Selected class names:', selectedClassNames);
    console.log('Class list:', classList);
    const selectedClassIds = selectedClassNames.map(className => {
      const selectedClass = classList.find(item => item.class_name === className);
      return selectedClass.class_id;
    });
    console.log('Selected class ids:', selectedClassIds);
    setClasses(selectedClassIds);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://34.227.51.137:3000/addStudent', {
        method: 'POST',
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          availability: availabilityRanges,
          classes: classes
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('SignUp error: ', error.message);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={6} sx={{ mt: 4, p: 3 }}>
        <Typography component="h1" variant="h5" align="center">
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                value={firstName}
                onChange={createFirstName}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                value={lastName}
                onChange={createLastName}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={createEmail}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={createPassword}
                required
                fullWidth
              />
            </Grid>
            {availabilityRanges.map((range, index) => (
              <React.Fragment key={index}>
                <Grid item xs={6}>
                  <TextField
                    label={`Available From (Range ${index + 1})`}
                    value={range.availableFrom}
                    onChange={(event) => handleAvailabilityFromChange(index, event)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label={`Available Until (Range ${index + 1})`}
                    value={range.availableUntil}
                    onChange={(event) => handleAvailabilityUntilChange(index, event)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={() => handleRemoveAvailabilityRange(index)} fullWidth>Remove Range {index + 1}</Button>
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button onClick={handleAddAvailabilityRange} fullWidth>Add Availability Range</Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Classes"
                value={classes}
                onChange={handleClassChange}
                fullWidth
                SelectProps={{
                  multiple: true
                }}
              >
                {classList.map((classItem) => (
                  <MenuItem key={classItem.class_id} value={classItem.class_name}>
                    {classItem.class_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button type="submit" variant="contained" color="primary">Sign Up</Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
