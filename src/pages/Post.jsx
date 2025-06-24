import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser"; // Ensure this is imported
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
     // Add console logs to trace the values
    console.log("Post.jsx Render Cycle - userData:", userData);
    console.log("Post.jsx Render Cycle - post:", post);

    const isAuthor = post && userData ? post.userId === userData.$id : false;
    console.log("Post.jsx Render Cycle - isAuthor:", isAuthor);
     if (post && userData) {
        console.log("Post.jsx Render Cycle - post.userId:", post.userId);
        console.log("Post.jsx Render Cycle - userData.$id:", userData.$id);
        console.log("Post.jsx Render Cycle - IDs match?", post.userId === userData.$id);
    }

    useEffect(() => {
        console.log("Post.jsx useEffect triggered. Current slug:", slug);
        if (slug) {
            appwriteService.getPost(slug).then((fetchedPost) => {
                if (fetchedPost) {
                    setPost(fetchedPost);
                } else {
                    console.log("Post not found, navigating home.");
                    navigate('/');
                }
            }).catch((error) => {
                console.error("Error fetching post:", error);
                navigate('/');
            });
        } else {
            console.log("Slug is undefined, navigating home.");
            navigate('/');
        }
    }, [slug, navigate]);

    const deletePost = async () => {
        if (!post) {
            console.warn("Attempted to delete a non-existent post.");
            return;
        }

        try {
            const status = await appwriteService.deletePost(post.$id);
            if (status) {
                if (post.featuredImage) {
                    await appwriteService.deleteFile(post.featuredImage);
                }
                navigate('/');
            } else {
                alert("Failed to delete post. Please try again.");
            }
        } catch (error) {
            console.error("Error during post deletion:", error);
            alert("An error occurred while deleting the post.");
        }
    };

    // --- CRITICAL FIX START: Function to parse and replace image SRCs ---
    const renderPostContent = (content) => {
        if (!content) return ''; // Handle empty or null content gracefully

        return parse(content, {
            replace: (node) => {
                // Check if the node is an <img> tag
                if (node.type === 'tag' && node.name === 'img') {
                    const originalSrc = node.attribs.src;

                    // This condition assumes your rich text editor saves Appwrite File IDs (20 characters)
                    // directly into the `src` attribute. Adjust `originalSrc.length === 20`
                    // if your editor saves something else (e.g., a relative path like /files/FILE_ID)
                    if (originalSrc && originalSrc.length === 20) {
                        const generatedUrl = appwriteService.getFilePreview(originalSrc);
                        console.log("DEBUG: In-content Image - Original src (fileId):", originalSrc, "Generated URL:", generatedUrl);
                        return (
                            <img
                                {...node.attribs} // Keep existing attributes like alt, class, etc.
                                src={generatedUrl} // Use the Appwrite preview URL
                            />
                        );
                    }
                    // If src is not a 20-character ID, assume it's already a full URL or relative path handled by browser
                    console.log("DEBUG: In-content Image - Original src (not 20-char ID):", originalSrc);
                    return node; // Return the node as is
                }
                // For all other tags, return them as they are
                return node;
            },
        });
    };
    // --- CRITICAL FIX END ---

    return post ? ( 
        <div className="py-8 bg-slate-200 m-10 border-2 border-gray-800 rounded-xl shadow-lg ">
            <Container >
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2 ">
                    {/* Featured Image Display */}
                    {post.featuredImage ? ( // Conditionally render if featuredImage exists
                        <>
                            <img 
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-xl" // Tailwind for rounded corners
                            />
                            {console.log("DEBUG: Featured Image - fileId:", post.featuredImage, "Generated URL:", appwriteService.getFilePreview(post.featuredImage))}
                        </>
                    ) : (
                        // Optional fallback if no featured image
                        <div className='w-full h-auto bg-gray-200 flex items-center justify-center rounded-xl text-gray-500 py-20'>
                            No Featured Image Available
                        </div>
                    )}
                    {isAuthor && (
                        <div className="absolute top-2 md:absolute md:right-6 md:top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3 ">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6 flex justify-center items-center">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css flex justify-center items-center">
                    {/* Use the new renderPostContent function here */}
                    
                    {renderPostContent(post.content)}
                </div>
            </Container>
        </div>
    ) : null; // You could also return a <Loader /> component here for better UX
}