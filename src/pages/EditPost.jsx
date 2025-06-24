import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import  appwriteService  from "../appwrite/config";
import { useParams, useNavigate, Navigate } from "react-router-dom";
function EditPost() {
    const [post, setposts] = useState(null);
    const navigate = useNavigate();
    const { slug } = useParams();
    useEffect(() => {
        console.log("EditPost: useEffect triggered with slug:", slug);
        if (slug) {
            appwriteService.getPost(slug).then((fetchedPost) => {
                if (fetchedPost) {
                    setposts(fetchedPost);// Set the state with the fetched post
                } else{
                   console.log("EditPost: Post not found or fetch failed for slug:", slug);
                    navigate("/");
                }
            })
            .catch((error) => {
                console.error("EditPost: Error fetching post:", error);
                navigate("/");  // Redirect on error
            });
        } else {
            console.log("EditPost: No slug found in URL. Redirecting.");
            navigate('/');
        }
    }, [slug, navigate])
console.log("EditPost: Current 'post' state before rendering PostForm:", post); // What is being passed to PostForm?
    return post ? (
        <div className="'py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) :(
        <div className='py-8 w-full text-center'>
            <Container>
                Loading post...
            </Container>
        </div>
    );
}

export default EditPost;