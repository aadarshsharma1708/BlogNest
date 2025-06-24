import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import  appwriteService  from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
    console.log("PostForm component rendered with post:", post);

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const { register, handleSubmit, watch, control, getValues, setValue } = useForm({
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            slug: post?.slug || "",
            status: post?.status || "active",
            // IMPORTANT: Get authorName from 'post' if editing, otherwise from 'userData' for a new post
            authorName: post?.authorName || userData?.name || userData?.email || "",
        },
    })
    console.log("PostForm Debug - userdata" , userData); // <-- Keep this for debugging

    const submit = async (data) => {
    //Check if userData exists before proceeding ***
    if (!userData) {
        console.error("User data not available. Cannot submit post.");
        alert("Please log in to create a post.");
        navigate("/login"); // Redirect to login page
        return; // Stop the function execution here
    }
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                await appwriteService.deleteFile(post.featuredImage);
            }
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : post.featuredImage,
            })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            } else{
                alert("Failed to update post. Please try again.");
            }
        }
        else {

            // *** Ensure a file is provided for new posts if it's required ***
            if (!data.image || !data.image[0]) {
                alert("Please select a featured image for your new post.");
                return;
            }

            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId;  // Set the featuredImage to the file ID
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                } else{
                    alert("Failed to create post. Please try again.");
                    // Optionally, delete the uploaded file if post creation failed
                    await appwriteService.deleteFile(fileId);
                }
            } else{
                alert("Failed to upload featured image. Please try again.");
            }
        }

    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-")
        }
        return "";
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                const slug = slugTransform(value.title || '');
                setValue('slug', slug, {
                    shouldValidate: true
                });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-full px-2 mb-4 md:w-2/3 md:mb-0">
                <Input
                    label="Title :"
                    placeholder="Enter post title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />

                <Input
                    label="Slug :"
                    placeholder="Enter post slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                        });
                    }
                    }
                />
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="w-full px-2 md:w-1/3">
                <Input
                    type="file"
                    label="Featured Image :"
                    placeholder="Select featured image"
                    className="mb-4"
                    accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && post.featuredImage && (
                    <div className="mb-4 w-full">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                    type='submit'
                    bgColor={post ? "bg-green-500" : "bg-blue-600"}
                    className="w-full"

                >{post ? "Update" : "Submit"}</Button>
            </div>
        </form>
    );
}

export default PostForm;