'use client';

import { useState, useEffect } from 'react';
import LoginForm from '../../components/LoginForm';
import AdminDashboard from '../../components/AdminDashboard';
import { subscribeToAuthChanges, signOutUser } from '../../lib/supabase';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to Supabase authentication state changes
    const unsubscribe = subscribeToAuthChanges((user) => {
      if (user) {
        // Check if user has admin role
        const userRole = user.user_metadata?.role;
        if (userRole === 'admin') {
          setIsAuthenticated(true);
        } else {
          // User is logged in but not an admin
          setIsAuthenticated(false);
          signOutUser();
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const handleLogin = (success) => {
    setIsAuthenticated(success);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        gap: '20px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1>Access Denied</h1>
        <p>Only admins can access the admin panel.</p>
        <a href="/login" style={{ color: '#0066cc', textDecoration: 'none' }}>Go to Login</a>
      </div>
    );
  }

  return (
    <div>
      {isAuthenticated ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}
