import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDataStore } from '../store';
import './Matches.css'; // Import CSS file for styling
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


export const Matches = () => {
    const location = useLocation();
    const data = location.state; // Access the passed data
    const [groupMembers, setGroupMembers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0); // Index of the currently displayed member
    const [viewMode, setViewMode] = useState('grid'); // Default view mode is 'grid'
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

    const handleNext = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % groupMembers.length);
    };

    const handlePrevious = () => {
        setCurrentIndex(prevIndex => (prevIndex - 1 + groupMembers.length) % groupMembers.length);
    };

    const toggleViewMode = () => {
        setViewMode(prevMode => prevMode === 'grid' ? 'scrolling' : 'grid');
    };

    return (
        <div className="matches-container">
            <div className="view-mode-toggle">
                <button onClick={toggleViewMode}>{viewMode === 'grid' ? 'Switch to Scrolling' : 'Switch to Grid'}</button>
            </div>
            <h2 className="matches-heading">Group Members</h2>
            {viewMode === 'grid' ? (
                <div className="matches-grid">
                    {groupMembers.map(member => (
                        <div key={member.student_id} className="matches-card">
                            <h3>{member.first_name} {member.last_name}</h3>
                            <p><strong>Classes:</strong> {member.classes}</p>
                            <p><strong>Availability:</strong> {member.availability}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="matches-scrolling-card">
                    {groupMembers.length > 0 && (
                        <div className="matches-card">
                            <h3>{groupMembers[currentIndex].first_name} {groupMembers[currentIndex].last_name}</h3>
                            <p><strong>Classes:</strong> {groupMembers[currentIndex].classes}</p>
                            <p><strong>Availability:</strong> {groupMembers[currentIndex].availability}</p>
                        </div>
                    )}
                    <div className="navigation-buttons">
                        <IconButton onClick={handlePrevious}>
                            <ArrowBackIcon />
                        </IconButton>
                        <IconButton onClick={handleNext}>
                            <ArrowForwardIcon />
                        </IconButton>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Matches;
