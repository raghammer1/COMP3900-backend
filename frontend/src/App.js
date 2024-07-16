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

const App = () => {
  return (
    <div>
      <AlertProvider>
        <LoadingProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard/:process"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/handle-files/:process/:file/:id"
                element={
                  <ProtectedRoute>
                    <FileManagerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />
              <Route
                path="/profile/:userId"
                element={
                  <ProtectedRoute>
                    <ProfileBoard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </LoadingProvider>
      </AlertProvider>
    </div>
  );
};

export default App;
