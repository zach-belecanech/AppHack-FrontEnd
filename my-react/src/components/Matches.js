// import React from 'react'
// import MatchesDyn from './MatchesDyn'

// export const Matches = props => {
    
//     const axios = require('axios');

//     // Function to make the API call and retrieve emails
//     async function getEmails() {
//     try {
//         const response = await axios.get('http://34.227.51.137:3000/getEmails/'); // Replace the URL with your actual API endpoint
//         const emails = response.data; // Assuming the response contains an array of emails in JSON format
//         return emails;
//     } catch (error) {
//         console.error('Error fetching emails:', error);
//         return []; // Return an empty array in case of error
//     }
//     }

//     // Function to process emails and store them in an array
//     async function getEmailArray() {
//     const emails = await getEmails();
//     const emailArray = emails.map(email => email.address); // Assuming email objects have an 'address' property, modify this according to your API response structure
//     return emailArray;
//     }

//     // Example usage
//     getEmailArray()
//     .then(emailArray => {
//         console.log('Emails array:', emailArray);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });


//     const dataArray = [];
//     let count = 1;
//     if (count === 0)
//     {
//         return (
//             <div>
//                 <p>
//                     There are no matches here!!
//                 </p>
//                 <p>
//                     Please either finish setting up your account and/or sign in.
//                 </p>
//             </div>
//         )
//     }
//     else
//     {
//         return (
//             <div>
//               <MatchesDyn data={dataArray} />
//             </div>
//         );
//     }
    
// }

// export default Matches

import React from 'react'

export const Matches = props => {
    
    return (
        <div>
        <h1>This is the Sign Up page!</h1>
        </div>
    )
}

export default Matches