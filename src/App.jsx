import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'; // Make sure react-redux is installed
import React from 'react'; // React is automatically imported in JSX files in modern setups, but good to be explicit
import authService from './appwrite/auth'; // Ensure this path is correct
import { login, logout } from './store/authSlice'; // Ensure this path is correct

import { Outlet } from 'react-router-dom'; // Assuming you have react-router-dom setup
import Header from './components/Header/Header'; // Ensure this path is correct
import Footer from './components/Footer/Footer'; // Ensure this path is correct

function App() {
  const [loading, setLoading] = useState(true); // Manages initial loading state
  const dispatch = useDispatch(); // Get the dispatch function from Redux

  useEffect(() => {
    // This effect runs once when the component mounts to check the user's authentication status.
    const checkAuthStatus = async () => {
      try {
        const userData = await authService.getCurrentUser(); // This can return null if no user is logged in
        if (userData) {
          dispatch(login(userData)); // If user data exists, dispatch login action
        } else {
          dispatch(logout()); // If no user data (e.g., 401 from Appwrite), dispatch logout action
        }
      } catch (error) {
        // This catch block handles any unexpected errors during the getCurrentUser call,
        // though `authService.getCurrentUser` is already designed to catch 401s and return null.
        // It's a fallback for truly unexpected network issues or other problems.
        console.error("App.jsx :: Error checking authentication status:", error);
        dispatch(logout()); // Ensure logout state on unexpected error
      } finally {
        // This block always executes after try/catch, ensuring loading state is turned off.
        setLoading(false);
      }
    };

    checkAuthStatus(); // Call the async function

    // The empty dependency array ensures this effect runs only once after the initial render.
    // In React 18 with StrictMode, this effect might run twice in development.
    // This is a development-only behavior and does not affect production build.
  }, []); // <--- Crucial: Empty dependency array for run-once-on-mount behavior

  // Conditional rendering based on the `loading` state.
  // We only render the main application structure once the authentication check is complete.
  return !loading ? (
    <div className='min-h-screen flex flex-col bg-gray-400'> {/* Changed flex-wrap to flex-col for better layout control */}
      <Header /> {/* Header component, usually visible regardless of auth status */}
      <main className='flex-grow w-full'> {/* flex-grow ensures main content takes available space */}
        {/* Outlet renders the matched child route component */}
        <Outlet />
      </main>
      <Footer /> {/* Footer component */}
    </div>
  ) : (
    // Show a loading indicator while the authentication check is in progress
    <div className="min-h-screen flex items-center justify-center text-xl font-semibold bg-gray-400">
      Loading application...
    </div>
  );
}

export default App;