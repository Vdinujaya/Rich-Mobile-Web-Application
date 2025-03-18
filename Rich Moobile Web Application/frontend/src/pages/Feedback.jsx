import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/feedback.css";

function Feedback() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [feedback, setFeedback] = useState("");
    const [submitStatus, setSubmitStatus] = useState("");
    const [feedbacks, setFeedbacks] = useState([]); // State to store all feedbacks

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (email) {
            setUserEmail(email);
            fetchUserDetails(email);
        } else {
            setLoading(false);
        }

        // Fetch all feedbacks when the component mounts
        fetchAllFeedbacks();
    }, []);

    const fetchUserDetails = async (email) => {
        try {
            const response = await axios.get(`http://localhost:4000/user/${email}`);
            setUserDetails(response.data);
            setLoading(false);
        } catch (error) {
            setError("Failed to fetch user details. Please try again.");
            setLoading(false);
            console.error(error);
        }
    };

    const fetchAllFeedbacks = async () => {
        try {
            const response = await axios.get('http://localhost:4000/feedbacks');
            setFeedbacks(response.data); // Store all feedbacks in state
        } catch (error) {
            console.error("Failed to fetch feedbacks:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        setUserDetails(null);
        setUserEmail("");
        navigate("/profile"); // Redirect to login page after logout
    };

    const handleSubmitFeedback = async (e) => {
        e.preventDefault();
        if (!userDetails || !feedback) {
            setSubmitStatus("Please enter your feedback.");
            return;
        }

        const payload = {
            userName: userDetails.userName,
            userEmail: userDetails.email,
            feedback: feedback
        };

        console.log("Submitting feedback with payload:", payload);

        try {
            const response = await axios.post('http://localhost:4000/addFeedback', payload);
            console.log("Response from server:", response.data);
            setSubmitStatus("Feedback submitted successfully!");
            setFeedback("");

            // Refresh the list of feedbacks after submission
            fetchAllFeedbacks();
        } catch (error) {
            console.error("Error submitting feedback:", error.response ? error.response.data : error.message);
            setSubmitStatus("Failed to submit feedback. Please try again.");
        }
    };

    // Function to format the date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return <div className="profile-container loading">Loading...</div>;
    }

    if (error) {
        return <div className="profile-container error">{error}</div>;
    }

    return (
        <div className='app'>
            <NavBar />
            <div className="profile-container">
                <h2>Feedback</h2>
                {userDetails ? (
                    <div className="profile-card">
                        <div className="profile-header">
                            <h3>Welcome, {userDetails.userName}!</h3>
                        </div>
                        <div className="profile-body">
                            <form onSubmit={handleSubmitFeedback}>
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder="Enter your feedback here..."
                                    required
                                />
                                <button type="submit" className="nav-button">Submit Feedback</button>
                            </form>
                            {submitStatus && <p>{submitStatus}</p>}
                        </div>
                    </div>
                ) : (
                    <div className="profile-card">
                        <div className="profile-header">
                            <h3>You are not logged in.</h3>
                        </div>
                        <div className="profile-body">
                            <button onClick={() => navigate("/login")} className="nav-button">Login</button>
                            <button onClick={() => navigate("/register")} className="nav-button">Register</button>
                        </div>
                    </div>
                )}

                {/* Display all feedbacks */}
                <div className="feedbacks-container">
                    <h3>All Feedbacks</h3>
                    {feedbacks.length > 0 ? (
                        <ul className="feedback-list">
                            {feedbacks.map((fb, index) => (
                                <li key={index} className="feedback-item">
                                    <div className="feedback-header">
                                        <strong>{fb.userName}</strong>
                                        <span>{formatDate(fb.createdAt)}</span>
                                    </div>
                                    <p>{fb.feedback}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No feedbacks available.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Feedback;