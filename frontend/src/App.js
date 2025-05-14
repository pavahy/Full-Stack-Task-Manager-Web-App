import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TaskForm from './pages/TaskForm';
import ViewTasks from './pages/ViewTasks';
import ProtectedRoute from './pages/ProtectedRoute';
import UpdateTask from './pages/UpdateTask';
import Profile from './pages/Profile';

const App = () => {
  const getAuthStatus = () => !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        {/* Redirect root path based on authentication */}
        <Route path="/" element={<Navigate to={getAuthStatus() ? "/dashboard" : "/login"} replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={getAuthStatus()}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks/create"
          element={
            <ProtectedRoute isAuthenticated={getAuthStatus()}>
              <TaskForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute isAuthenticated={getAuthStatus()}>
              <ViewTasks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks/update/:id"
          element={
            <ProtectedRoute isAuthenticated={getAuthStatus()}>
              <UpdateTask />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={getAuthStatus()}>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
