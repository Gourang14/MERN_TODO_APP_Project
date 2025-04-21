import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from "../Axios/axios.js";
import TokenContext from '../context/TokenContext.js';

function Login() {
    const [formData, setFormData] = useState({});
    const { userToken, tokenDispatch, userDispatch } = useContext(TokenContext);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("/user/login", formData);
            tokenDispatch({ type: "SET_TOKEN", payload: result.data.token });
            userDispatch({ type: "SET_USER", payload: result.data.user });
            localStorage.setItem("authToken", JSON.stringify(result.data.token));
        } catch (err) {
            console.error(err);
            setError({ message: err.response?.data?.message || "Something went wrong!" });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    if (userToken) return <Navigate to="/" />;

    return (
        <div className="h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-end justify-center px-4 pb-8">
            <div className="bg-white shadow-xl rounded-xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
                
                {/* Left side image */}
                <div className="hidden md:block md:w-1/2">
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        alt="Login Illustration"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right side form */}
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Welcome Back</h2>

                    {error && (
                        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded border border-red-300 text-sm text-center">
                            {error.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                                placeholder="Enter your password"
                            />
                        </div>

                        {/* Forgot Password */}
                        <div className="mb-4 text-right">
                            <Link to="/forgotPassword" className="text-blue-600 text-sm hover:underline">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                        >
                            Login
                        </button>
                    </form>

                    {/* Register Prompt */}
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don’t have an account?{" "}
                        <Link to="/register" className="text-red-600 font-semibold hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;