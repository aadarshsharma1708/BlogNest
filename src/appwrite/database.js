import { Client, Databases, Query } from "appwrite";
import conf from "../conf/conf";

const client = new Client()
    .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
    .setProject(conf.appwriteProjectId); // Your Appwrite Project ID

const databases = new Databases(client);

/**
 * Get total posts created by a specific user
 * @param {string} userId - The Appwrite user ID
 * @returns {Promise<number>} Total post count
 */
export async function getUserPostCount(userId) {
    try {
        const res = await databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            [Query.equal("userId", userId)]
        );
        console.log("Total posts for user", userId, ":", res.total);
        
        return res.total;
    } catch (error) {
        console.error("Error getting post count:", error);
        return 0;
    }
}
