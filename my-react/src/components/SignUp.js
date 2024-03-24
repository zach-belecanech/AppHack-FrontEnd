import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const SignUp = ({ onSignUp }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [availabilityRanges, setAvailabilityRanges] = useState([{ availableFrom: '', availableUntil: '' }]);
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
    setAvailabilityRanges([...availabilityRanges, { availableFrom: '', availableUntil: '' }]);
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

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="First Name"
            value={firstName}
            onChange={createFirstName}
            required
          />
        </div>
        <div>
  <TextField
    label="Last Name"
    value={lastName}
    onChange={createLastName}
    required
  />
</div>
<div>
  <TextField
    label="Email"
    type="email"
    value={email}
    onChange={createEmail}
    required
  />
</div>
<div>
  <TextField
    label="Password"
    type="password"
    value={password}
    onChange={createPassword}
    required
  />
</div>
{/* Availability Ranges */}
{availabilityRanges.map((range, index) => (
  <div key={index}>
    <TextField
      label={`Available From (Range ${index + 1})`}
      value={range.availableFrom}
      onChange={(event) => handleAvailabilityFromChange(index, event)}
    />
    <TextField
      label={`Available Until (Range ${index + 1})`}
      value={range.availableUntil}
      onChange={(event) => handleAvailabilityUntilChange(index, event)}
    />
    <Button onClick={() => handleRemoveAvailabilityRange(index)}>Remove</Button>
  </div>
))}
<Button onClick={handleAddAvailabilityRange}>Add Availability Range</Button>
<div>
  <TextField
    label="Classes (comma separated)"
    value={classes}
    onChange={createClasses}
  />
</div>

        <Button type="submit" variant="contained" color="primary">Sign Up</Button>
      </form>
    </div>
  );
}

export default SignUp;
