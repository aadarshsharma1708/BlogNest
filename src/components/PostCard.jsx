import React from "react";
import  appwriteService  from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({
    $id,
    title,
    featuredImage,
    authorName,

}) {
    // Ensure that the featuredImage is a valid URL or path
    const imageUrl = featuredImage ? appwriteService.getFilePreview(featuredImage) : '';
    console.log("PostCard Debug - featuredImage:", featuredImage, "Generated URL:", imageUrl); // <-- Keep this
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    {imageUrl ? (
                        <img src={imageUrl}
                        alt={title}
                        className="rounded-xl w-full h-48 object-cover" />
                    ) : (
                        // Optional: Render a fallback if no image
                        <div className='w-full h-48 bg-gray-200 flex items-center justify-center rounded-xl text-gray-500'>
                            No Image Available
                        </div>
                    )}
                </div>
                <h2 className="text-xl font-bold">{title}</h2>
                {console.log("Author Name Debug - authorName:", authorName)} {/* <-- Keep this for debugging */}
                {authorName && (
                    console.log("PostCard Debug - authorName:", authorName), // <-- Keep this
                    <div className="flex justify-end bottom-4 text-grey-200 text-sm px-3 py-1 rounded-lg opacity-90">
                        Published by - {authorName}
                    </div>
                )}
            </div>
        </Link>
    );
}

export default PostCard;