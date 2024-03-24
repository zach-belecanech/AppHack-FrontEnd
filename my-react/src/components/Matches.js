import React from 'react'
import MatchesDyn from './MatchesDyn'

export const Matches = props => {
    
    const axios = require('axios');

    
    async function getEmails() {
    try {
        const response = await axios.get('http://34.227.51.137:3000/getEmails/'); 
        const emails = response.data; 
        return emails;
    } catch (error) {
        console.error('Error fetching emails:', error);
        return []; 
    }
    }

    async function getEmailArray() {
    const emails = await getEmails();
    const emailArray = emails.map(email => email.address); 
    return emailArray;
    }

    getEmailArray()
    .then(emailArray => {
        console.log('Emails array:', emailArray);
    })
    .catch(error => {
        console.error('Error:', error);
    });


    const dataArray = [];
    let count = 1;
    if (count === 0)
    {
        return (
            <div>
                <p>
                    There are no matches here!!
                </p>
                <p>
                    Please either finish setting up your account and/or sign in.
                </p>
            </div>
        )
    }
    else
    {
        return (
            <div>
              <MatchesDyn data={dataArray} />
            </div>
        );
    }
    
}

export default Matches
