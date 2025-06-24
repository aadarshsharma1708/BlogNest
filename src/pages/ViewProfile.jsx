import React,{ useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { getUserPostCount } from '../appwrite/database';

function ViewProfile() {
    // 👇️ CORRECTION 1: Access userData from the Redux state
    const user = useSelector((state) => state.auth.userData);
    
    // Add a console log to see what the 'user' object actually contains
    console.log("ViewProfile - user data from Redux:", user);
    // 👇️ CLARIFICATION: If you need to fetch the post count, you can do it here
    const [postCount, setPostCount] = useState(0);
    useEffect(() => {
        if (user?.$id) {
            getUserPostCount(user.$id).then(setPostCount);
        }
    }, [user]);

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white shadow p-6 rounded-lg">
            <h1 className="text-2xl font-semibold mb-4">Profile Details</h1>
            <div className="space-y-3">
                {/* Appwrite user objects usually have 'name' and 'email' */}
                <p><strong>Name:</strong> {user?.name || 'N/A'}</p>
                <p><strong>Email:</strong> {user?.email || 'N/A'}</p>

                {/* 👇️ CLARIFICATION/CORRECTION for username and postCount */}
                {/* Appwrite's default user object does NOT have 'username' or 'postCount'.
                    If you need these, you'd need to:
                    1. Store them as custom attributes when a user registers.
                    2. Fetch them from a separate database (e.g., a 'profiles' collection).
                */}
                <p><strong>Total Posts:</strong> { postCount }</p>

                {/* 👇️ CORRECTION 2: Appwrite user creation timestamp is 'registration' */}
                <p>
                    <strong>Joined: </strong>

                    {user?.$createdAt ? new Date(user.$createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                        : 'N/A'}
                    {console.log("DEBUG: User registration timestamp:", user?.$createdAt)}
                    {/* Appwrite 'registration' is a Unix timestamp in seconds, so multiply by 1000 for milliseconds */}
                </p>
                <p className='flex flex-wrap justify-center font-mono text-sm'>Please reload the page if Profile Details is not visible.</p>
            </div>
            
        </div>
    );
}

export default ViewProfile;