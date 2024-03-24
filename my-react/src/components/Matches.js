import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export const Matches = () => {
    const location = useLocation();
    const data = location.state; // Access the passed data
    const [groupMembers, setGroupMembers] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get('http://34.227.51.137:3000/getMLData');
                const groups = response.data;
                const studentId = data[0].student_id; // Assuming the student ID is passed in the location state
                console.log(data);
                for (const group of groups) {
                    const member = group.find(member => member.student_id === studentId);
                    console.log(member);
                    if (member) {
                        // Filter out the current member and set the remaining members as the group
                        setGroupMembers(group.filter(m => m.student_id !== studentId));
                        break;
                    }
                }
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        fetchGroups();
    }, [data.student_id]);

    return (
        <div>
            <h2>Group Members</h2>
            <div>
                {groupMembers.map(member => (
                    <div key={member.student_id} className="card">
                        <h3>{member.first_name} {member.last_name}</h3>
                        <p>Classes: {member.classes}</p>
                        <p>Availability: {member.availability}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Matches;


