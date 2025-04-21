import './App.css';
import React, { useEffect, useReducer, useMemo } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

import Active from './components/Active';
import Completed from './components/Completed';
import AllTask from './components/AllTask';
import Layout from './components/Layout';
import Header from './components/Header/Header';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import ResetPassword from './components/forgotPassword/ResetPassword';

import TaskContext from './context/TaskContext';
import TokenContext from './context/TokenContext';
import taskReducer from './reducer/taskReducer';
import tokenReducer from './reducer/tokenReducer';
import userReducer from './reducer/userReducer';

import axios from './Axios/axios.js';

// New component to handle routes and context
function AppRoutes() {
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("authToken"));
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [userToken, tokenDispatch] = useReducer(tokenReducer, token);
  const [user, userDispatch] = useReducer(userReducer, null);

  // Logout function
  const logout = () => {
    localStorage.removeItem("authToken");
    tokenDispatch({ type: "CLEAR_TOKEN" });   
    userDispatch({ type: "CLEAR_USER" });
    navigate("/login");
  };

  // Fetch user info if token exists
  useEffect(() => {
    if (!userToken) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get("/user/getUser", {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        userDispatch({ type: "SET_USER", payload: res.data.user });
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [userToken]);

  // Fetch tasks if token exists
  useEffect(() => {
    if (!userToken) return;

    const fetchTasks = async () => {
      try {
        const res = await axios.get("/task/getTask", {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        dispatch({ type: "SET_TASK", payload: res.data });
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
  }, [userToken]);

  const contextValue = useMemo(
    () => ({ userToken, tokenDispatch, user, userDispatch, logout }),
    [userToken, user]
  );

  return (
    <TokenContext.Provider value={contextValue}>
      <TaskContext.Provider value={{ tasks, dispatch }}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="/" element={userToken ? <Layout /> : <Login />}>
              <Route index element={<AllTask />} />
              <Route path="active" element={<Active />} />
              <Route path="completed" element={<Completed />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
          </Route>
        </Routes>
      </TaskContext.Provider>
    </TokenContext.Provider>
  );
}

// Wrap routes in BrowserRouter
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;