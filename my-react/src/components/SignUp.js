import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';

export const SignUp = ({ onSignUp }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [availabilityRanges, setAvailabilityRanges] = useState([{ availableFrom: '', availableUntil: '', period: 'AM', period2: 'AM' }]);
  const [classes, setClasses] = useState('');

  const createFirstName = (event) => {
    setFirstName(event.target.value);
  }

  const createLastName = (event) => {
    setLastName(event.target.value);
  }

  const createEmail = (event) => {
    setEmail(event.target.value);
  }

  const createPassword = (event) => {
    setPassword(event.target.value);
  }

  const handleAvailabilityFromChange = (index, event) => {
    const newAvailabilityRanges = [...availabilityRanges];
    newAvailabilityRanges[index].availableFrom = event.target.value;
    setAvailabilityRanges(newAvailabilityRanges);
  }

  const handleAvailabilityUntilChange = (index, event) => {
    const newAvailabilityRanges = [...availabilityRanges];
    newAvailabilityRanges[index].availableUntil = event.target.value;
    setAvailabilityRanges(newAvailabilityRanges);
  }

  const handleAddAvailabilityRange = () => {
    setAvailabilityRanges([...availabilityRanges, { availableFrom: '', availableUntil: '', period: 'AM', period2: 'AM' }]);
  }

  const handleRemoveAvailabilityRange = (index) => {
    const newAvailabilityRanges = [...availabilityRanges];
    newAvailabilityRanges.splice(index, 1);
    setAvailabilityRanges(newAvailabilityRanges);
  }

  const createClasses = (event) => {
    setClasses(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://34.227.51.137:3000/addStudent/', { // Corrected the endpoint URL
        method: 'POST',
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          availability: availabilityRanges,
          classes: classes.split(',').map(className => className.trim())
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
  }

  const handlePeriodChange = (index, event) => {
    const newRanges = [...availabilityRanges];
    newRanges[index].period = event.target.value; // Update the period value
    setAvailabilityRanges(newRanges); // Set the updated state
  };

  const handlePeriodChange2 = (index, event) => {
    const newRanges = [...availabilityRanges];
    newRanges[index].period2 = event.target.value; // Update the period value
    setAvailabilityRanges(newRanges); // Set the updated state
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={6} sx={{ mt: 4, p: 3, backgroundColor: '#f4f4f2' }}>
        <Typography component="h1" variant="h5" align="center" sx={{ color: '#000000' }}>
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
                sx={{ backgroundColor: 'white', borderRadius: '5px' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                value={lastName}
                onChange={createLastName}
                required
                fullWidth
                sx={{ backgroundColor: 'white', borderRadius: '5px' }}
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
                sx={{ backgroundColor: 'white', borderRadius: '5px' }}
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
                sx={{ backgroundColor: 'white', borderRadius: '5px' }}
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
                    sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label={`Available Until (Range ${index + 1})`}
                    value={range.availableUntil}
                    onChange={(event) => handleAvailabilityUntilChange(index, event)}
                    fullWidth
                    sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={() => handleRemoveAvailabilityRange(index)} fullWidth sx={{ mt: 1, backgroundColor: '#c5b358', color: 'black' }}>
                    Remove Range {index + 1}
                  </Button>
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button onClick={handleAddAvailabilityRange} fullWidth sx={{ backgroundColor: '#c5b358', color: 'black' }}>
                Add Availability Range
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Classes (comma separated)"
                value={classes}
                onChange={createClasses}
                fullWidth
                sx={{ backgroundColor: 'white', borderRadius: '5px' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button type="submit" variant="contained" sx={{ backgroundColor: '#c5b358', color: 'black' }}>
                  Sign Up
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default SignUp;