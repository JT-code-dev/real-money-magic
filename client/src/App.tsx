// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import Signup from "./screens/Signup";
import Dashboard from "./screens/Dashboard";
import Hello from "./screens/Hello";
import Layout from "./components/Layout";
import Profile from "./screens/Profile";
import Report from "./screens/ReportsScreen";
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Routes>
        {/* Default route redirects to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/hello" element={<Hello />} />

      {/* Protected pages */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <div>Transactions Page</div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/day"
        element={
          <ProtectedRoute>
            <div>Day View</div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/week"
        element={
          <ProtectedRoute>
            <div>Week View</div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/month"
        element={
          <ProtectedRoute>
            <div>Month View</div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
	 <Route
        path="/report"
        element={
          <ProtectedRoute>
            <Report />
          </ProtectedRoute>
        }
      />
	  <Route path="/report" element={<Report />} />
    </Routes>

  );
}

export default App;
