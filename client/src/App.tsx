// src/App.tsx (simplified - no Layout)
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "./components/login";
import Signup from "./components/Signup";
import ProfilePage from "./screens/ProfilePage";
import ProjectView from "./screens/ProjectView";
import Dashboard from "./screens/Dashboard";
import LandingPage from "./screens/LandingPage";
import Hello from "../archive/Hello";
import LayoutWithNavbar from './components/LayoutWithNavbar'; // This is where the NavBar is linked to
import { isLoggedInVar } from "./graphql/cache";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    isLoggedInVar(!!token);
  }, []);

  return (
      <Routes>
      {/* ✅ Show LandingPage directly at `/` */}
      <Route 
         path="/" 
          element={
           <PublicRoute>
              <LayoutWithNavbar>
                <LandingPage />
              </LayoutWithNavbar>
          </PublicRoute>
      } 
  />

      <Route 
        path="/login" 
          element={
            <PublicRoute>
              <LayoutWithNavbar>
                <Login />
              </LayoutWithNavbar>
            </PublicRoute>
          } 
      />
      <Route 
        path="/signup" 
          element={
            <PublicRoute> 
              <LayoutWithNavbar>
                <Signup />
              </LayoutWithNavbar>
            </PublicRoute>
          } 
      />
      <Route 
        path="/hello"
          element={
            <PublicRoute> 
              <LayoutWithNavbar>
                <Hello />
              </LayoutWithNavbar>
            </PublicRoute>  
          } 
      />

      {/* Protected pages */}
      <Route
        path="/project/:id"
        element={
          <PrivateRoute>
            <LayoutWithNavbar>
              <Dashboard />
            </LayoutWithNavbar>
          </PrivateRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <PrivateRoute>
            <LayoutWithNavbar>
              <div>Transactions Page</div>
            </LayoutWithNavbar>
          </PrivateRoute>
        }
      />
      <Route
        path="/day"
        element={
          <PrivateRoute>
            <LayoutWithNavbar>
              <div>Day View</div>
            </LayoutWithNavbar>
          </PrivateRoute>
        }
      />
      <Route
        path="/week"
        element={
          <PrivateRoute>
            <LayoutWithNavbar>
              <div>Week View</div>
            </LayoutWithNavbar>
          </PrivateRoute>
        }
      />
      <Route
        path="/month"
        element={
          <PrivateRoute>
            <LayoutWithNavbar>
              <div>Month View</div>
            </LayoutWithNavbar>
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <LayoutWithNavbar>
              <ProfilePage />
            </LayoutWithNavbar>
          </PrivateRoute>
        }
      />
      <Route
        path="/project/:id"
        element={
          <PrivateRoute>
            <LayoutWithNavbar>
              <ProjectView />
            </LayoutWithNavbar>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
