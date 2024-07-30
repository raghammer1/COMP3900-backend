import React from 'react';
import Home from './HomePage/Home.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingProvider } from './components/useLoading.js';
import { AlertProvider } from './components/AlertError.js';
import Login from './auth/Login/Login.js';
import Register from './auth/Register/Register.js';
import Dashboard from './Dashboard/Dashboard.js';
import ProtectedRoute from './ProtectedRoute.js';
import PageNotFound from './PageNotFound/PageNotFound.js';
import FileManagerDashboard from './FileManagerDashboard/FileManagerDashboard.js';
import ResetPassword from './auth/Login/ResetPassword.js';
import ProfileBoard from './Dashboard/Profile/ProfileBoard.js';

// Main App component that sets up routing and providers
const App = () => {
  return (
    <div>
      <AlertProvider>
        <LoadingProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} /> {/* Home page route */}
              <Route path="/home" element={<Home />} /> {/* Home page route */}
              <Route path="/login" element={<Login />} />{' '}
              {/* Login page route */}
              <Route path="/register" element={<Register />} />{' '}
              {/* Register page route */}
              <Route
                path="/dashboard/:process"
                element={
                  <ProtectedRoute>
                    <Dashboard /> {/* Dashboard route with protection */}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/handle-files/:process/:file/:id"
                element={
                  <ProtectedRoute>
                    <FileManagerDashboard />{' '}
                    {/* File manager dashboard route with protection */}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />{' '}
              {/* Reset password route */}
              <Route
                path="/profile/:userId"
                element={
                  <ProtectedRoute>
                    <ProfileBoard /> {/* Profile board route with protection */}
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<PageNotFound />} />{' '}
              {/* 404 Page not found route */}
            </Routes>
          </BrowserRouter>
        </LoadingProvider>
      </AlertProvider>
    </div>
  );
};

export default App;
