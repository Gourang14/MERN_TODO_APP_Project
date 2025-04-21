import React, { useContext, useEffect, useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import TokenContext from '../../context/TokenContext.js';
import './header.css';

function Header() {
    const { user, logout } = useContext(TokenContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const auth = localStorage.getItem("authToken");
        setIsLoggedIn(!!auth);
    }, [user]);

    return (
        <div>
            <header className='bg-white shadow sticky top-0 z-50'>
                <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between'>
                    {/* Logo */}
                    <div className='flex-shrink-0'>
                        <NavLink to="/" className="text-2xl font-extrabold text-blue-600 tracking-tight">
                            Todo<span className="text-gray-800">App</span>
                        </NavLink>
                    </div>

                    {/* Navigation */}
                    <div className='flex items-center gap-6'>
                        {isLoggedIn ? (
                            <>
                                <p className='text-gray-700 text-sm md:text-base'>
                                    Welcome, <span className='font-semibold text-blue-700 capitalize'>{user?.name}</span>
                                </p>
                                <button
                                    onClick={logout}
                                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                        `text-sm font-medium ${isActive ? "text-blue-600 underline" : "text-gray-600 hover:text-blue-600"}`
                                    }
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className={({ isActive }) =>
                                        `text-sm font-medium ${isActive ? "text-blue-600 underline" : "text-gray-600 hover:text-blue-600"}`
                                    }
                                >
                                    Register
                                </NavLink>
                            </>
                        )}
                    </div>
                </nav>
            </header>

            {/* Main Page Content */}
            <main className="px-4 py-6 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    );
}

export default Header;