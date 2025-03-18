import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post("http://localhost:4000/login", formData);
            setMessage("Login successful!");
            
            // Save user email to localStorage
            localStorage.setItem("userEmail", response.data.data.email);
    
            navigate("/");
        } catch (error) {
            setMessage("Login failed. Please check your email and password.");
            console.error(error);
        }
    };

    return (
        <div className="app">
            <NavBar/>
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group password-group">
                    <label>Password:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <span className="eye-icon" onClick={togglePasswordVisibility}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <button type="submit" className="submit-button">Login</button>
            </form>
            <div className="login-prompt">
    <p>Don't have an account?</p>
    <a href="/register">Register</a>
</div>
            {message && <p className="message">{message}</p>}
        </div>
        <Footer/>
        </div>
    );
};

export default Login;
