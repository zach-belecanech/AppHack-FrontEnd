import React from 'react';
import './Home.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'; 

export const Home = props => {

    return (
        <div className="homeContainer">
            <section className="hero">
                <h1>Welcome to ByteBuddies!</h1>
                <p>Find your perfect study buddy and ace your classes together!</p>
                {}
                <Link to="/signup">
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "#000000", color: "white" }}
                    >
                        Join Now
                    </Button>
                </Link>
            </section>

            <section className="howItWorks">
                <h2>How It Works</h2>
                <div className="stepsContainer">
                    <div className="step">
                        <h3>Sign Up</h3>
                        <p>Create your account and tell us about the classes you're taking.</p>
                    </div>
                    <div className="step">
                        <h3>Set Your Schedule</h3>
                        <p>Input your free time so we can find matches who have similar availability.</p>
                    </div>
                    <div className="step">
                        <h3>Get Matched</h3>
                        <p>Our algorithm finds the best study buddies for you, maximizing class overlaps and syncing schedules.</p>
                    </div>
                </div>
            </section>

            <section className="testimonials">
                <h2>Success Stories</h2>
                <div className="testimonial">
                    <p>"ByteBuddies has been a game-changer for my study routine. I've found amazing partners for my toughest classes!"</p>
                    <p className="author">- Jane Doe, Computer Science Major</p>
                </div>
                {}
            </section>

            <section className="cta">
                <h2>Ready to find your ByteBuddy?</h2>
                {}
                <Link to="/signup">
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "#c5b358", color: "black" }} 
                    >
                        Sign Up Now
                    </Button>
                </Link>
            </section>
        </div>
    );
}

export default Home;
