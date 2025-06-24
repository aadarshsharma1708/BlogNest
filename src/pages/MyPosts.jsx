import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux"; // Assuming you use Redux for user state
import { Query } from "appwrite"; // Import Query for filtering posts
function MyPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // Add a loading state
    const userData = useSelector((state) => state.auth.userData); // Get user data from Redux store

    useEffect(() => {
        const fetchUserPosts = async () => {
            if (!userData || !userData.$id) {
                // If user data isn't available or user isn't logged in,
                // set posts to empty and stop loading
                setPosts([]);
                setLoading(false);
                return;
            }

            try {
                // Assuming appwriteService.getUserPosts exists or getPosts can take queries
                // IMPORTANT: Your appwrite/config.js needs a function like `getPosts`
                // that accepts a query to filter by the author's ID.
                const response = await appwriteService.getPosts(
                    // Pass a query to filter by the current user's ID
                    // Assuming your post documents have an attribute like 'userId' or 'authorId'
                    // that stores the ID of the user who created the post.
                   [Query.equal("userId", userData.$id)] // Or 'authorId' if that's what you used
                );

                console.log("Appwrite getPosts response for user posts:", response);

                if (response && response.documents) {
                    setPosts(response.documents);
                } else {
                    setPosts([]); // No documents found or invalid response
                }
            } catch (error) {
                console.error("Error fetching user posts:", error);
                setPosts([]); // Clear posts on error
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchUserPosts();
    }, [userData]); // Re-run effect when userData changes (e.g., user logs in/out)

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap justify-center">
                        <h1 className="text-2xl font-bold text-gray-700">Loading posts...</h1>
                    </div>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap justify-center">
                        {userData ? (
                            <h1 className="text-2xl font-bold text-gray-700">You haven't posted anything yet.</h1>
                        ) : (
                            <h1 className="text-2xl font-bold text-gray-700">Please log in to see your posts.</h1>
                        )}
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default MyPosts;