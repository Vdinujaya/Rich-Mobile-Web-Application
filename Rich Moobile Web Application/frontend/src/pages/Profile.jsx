import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/profile.css";
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const Profile = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (email) {
            setUserEmail(email);
            fetchUserDetails(email);
        } else {
            setLoading(false);
        }
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

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        setUserDetails(null);
        setUserEmail("");
        navigate("/profile"); // Redirect to login page after logout
    };

    if (loading) {
        return <div className="profile-container loading">Loading...</div>;
    }

    if (error) {
        return <div className="profile-container error">{error}</div>;
    }

    return (
        <div className="app">
            <NavBar />
            <div className="profile-container">
                <h2>Profile Page</h2>
                {userDetails ? (
                    <div className="profile-card">
                        <div className="profile-header">
                            <h3>Welcome, {userDetails.userName}!</h3>
                        </div>
                        <div className="profile-body">
                            <div className="user-details">
                                <p><strong>First Name:</strong> {userDetails.firstName}</p>
                                <p><strong>Last Name:</strong> {userDetails.lastName}</p>
                                <p><strong>E-mail:</strong> {userDetails.email}</p>
                                <p><strong>Phone:</strong> {userDetails.phone}</p>
                                <p><strong>Address:</strong> {userDetails.address}</p>
                            </div>
                            <button onClick={handleLogout} className="logout-button">Logout</button>
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
            </div>
            <Footer />
        </div>
    );
};

export default Profile;