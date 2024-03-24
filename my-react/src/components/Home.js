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
                        <p>Ready to connect with fellow students and optimize your study schedule? 
                            Sign up now to join our community exclusively for Appalachian State University's CS department. 
                            Create your profile and unlock access to a personalized scheduling experience that streamlines 
                            group collaboration and maximizes your learning potential.</p>
                    </div>
                    <div className="step">
                        <h3>Set Your Schedule</h3>
                        <p>Take control of your academic journey by setting your schedule on our platform. 
                            Input your class timetable, free time slots, and preferred study hours to help 
                            us match you with compatible peers. Whether you're looking for study partners, 
                            project collaborators, or simply seeking to enhance your learning experience, 
                            configuring your schedule is the first step towards finding the perfect group fit.</p>
                    </div>
                    <div className="step">
                        <h3>Get Matched</h3>
                        <p>Experience the power of machine learning in action as our algorithm analyzes your 
                            schedule and preferences to match you with like-minded peers. Discover study groups
                             tailored to your availability and course load, ensuring productive collaboration 
                             and mutual support. Get matched effortlessly and embark on a journey of shared learning 
                             and academic success with your fellow CS students at Appalachian State University.</p>
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
