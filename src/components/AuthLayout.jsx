// src/components/AuthLayout.jsx (or Protected.jsx)

import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status); // This should be true if logged in, false if not
   
    useEffect(() => {
        // console.log("AuthLayout useEffect running. authStatus:", authStatus, " authentication prop:", authentication); // Good for debugging AuthLayout itself

        // Case 1: If route requires authentication (authentication = true)
        // AND user is NOT authenticated (authStatus is false)
        if (authentication && authStatus !== true) {
            // console.log("AuthLayout: Redirecting to /login (Auth required but user not logged in)");
            navigate("/login");
        }
        // Case 2: If route does NOT require authentication (authentication = false, like /login or /signup)
        // AND user IS authenticated (authStatus is true)
        else if (!authentication && authStatus === true) { // <-- CORRECTED CONDITION
            // console.log("AuthLayout: Redirecting to / (User logged in, but tried to access public-only route)");
            navigate("/");
        }
        // If none of the above, means user is in the correct auth state for the route, so show content
        setLoader(false);

    }, [authStatus, navigate, authentication]); // Dependencies are correct

    if (loader) {
        // console.log("AuthLayout: Still loading, showing loader..."); // Good for debugging loader state
        return <h1>Loading...</h1>;
    }
     if ((authentication && authStatus) || (!authentication && !authStatus)) {
        return <>{children}</>;
    } else {
        return null; // Or a fallback component/message
    }

    // return loader ? <h1>Loading...</h1> : <>{children}</>
}