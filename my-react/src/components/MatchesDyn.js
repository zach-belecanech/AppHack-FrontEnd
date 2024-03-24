import React from 'react';

const MatchesDyn = ({ data }) => (
  <div>
    {data.map((item, index) => (
      <div key={index}>
        {}
        <p>First Name: {{item}[0]}</p>
        <p>Last Name: {{item}[1]}</p>
        <p>User's Email: {{item}[2]}</p>
        <p>User's Classes: {{item}[3]}</p>
        <p>User's Availability: {{item}[4]}</p>
        <p>-----------------------</p>
      </div>
    ))}
  </div>
);

export default MatchesDyn;
