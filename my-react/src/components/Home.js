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
                    <p>"Joining the platform was a game-changer for me. 
                        I struggled to find study partners who synced with my schedule and learning pace. 
                        After signing up and setting my schedule, I was matched with a group of peers who 
                        not only shared similar classes but also had free time that aligned perfectly with mine.
                         Thanks to this platform, I've formed strong study groups that have significantly boosted
                          my understanding of complex CS concepts."</p>
                    <p className="author">- Maria, Sophomore CS Student</p>
                </div>
                <div className="testimonial">
                    <p>"As a junior CS student juggling a heavy course load, finding time for group study sessions
                         seemed impossible. That's when I discovered this platform. By inputting my schedule and
                          preferences, I was effortlessly matched with peers who had complementary schedules. Through 
                          collaborative efforts, we tackled challenging assignments and even started a side project 
                          together. This platform has not only enhanced my academic performance but also expanded my
                           network within the CS department."</p>
                    <p className="author">- John, Junior CS Student</p>
                </div>
                <div className="testimonial">
                    <p>"Transitioning to college can be overwhelming, especially when trying to navigate coursework 
                        and meet new people. Joining this platform eased my worries. I signed up, set my schedule, and 
                        within days, I was connected with peers who shared my classes. Through our study sessions, I not
                         only improved academically but also made lasting friendships. This platform has been instrumental
                          in helping me thrive in my first year at Appalachian State University."</p>
                    <p className="author">- Emily, Freshman CS Student</p>
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
