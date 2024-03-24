import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDataStore } from '../store';

export const Matches = () => {
    const location = useLocation();
    const data = location.state; // Access the passed data
    const [groupMembers, setGroupMembers] = useState([]);
    const { studentid } = useDataStore();

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get('http://34.227.51.137:3000/getMLData');
                const groups = response.data;
                
                // Use the student ID from the location state if available
                const id = studentid || (data && data[0] && data[0].student_id);

                for (const group of groups) {
                    const member = group.find(member => member.student_id === id);
                    if (member) {
                        // Filter out the current member and set the remaining members as the group
                        setGroupMembers(group.filter(m => m.student_id !== id));
                        break;
                    }
                }
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        if (studentid || (data && data[0] && data[0].student_id)) {
            fetchGroups();
        }
    }, [studentid, data]);

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
