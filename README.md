# BlogNest 📝

**A personal blogging platform built with React.js and Appwrite, empowering users to effortlessly read and write captivating articles.**

---

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/[YourGitHubUsername]/BlogNest/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/[YourGitHubUsername]/BlogNest.svg?style=social)](https://github.com/[YourGitHubUsername]/BlogNest/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/[YourGitHubUsername]/BlogNest.svg?style=social)](https://github.com/[YourGitHubUsername]/BlogNest/network/members)

## 📖 Table of Contents

* [🌟 About the Project](#-about-the-project)
* [✨ Features](#-features)
* [🚀 Tech Stack](#-tech-stack)
* [🤝 Getting Started](#-getting-started)
    * [Prerequisites](#prerequisites)
    * [Appwrite Backend Setup](#appwrite-backend-setup)
    * [Frontend Setup](#frontend-setup)
    * [Running the Application](#running-the-application)
* [📚 Usage](#-usage)
* [🏗️ Project Structure](#️-project-structure)
* [💡 Contributing](#-contributing)
* [📄 License](#-license)
* [📞 Contact](#-contact)
* [🙏 Acknowledgements](#-acknowledgements)

---

## 🌟 About the Project

BlogNest is a modern, responsive, and intuitive personal blogging application designed to provide users with a seamless experience for publishing and consuming written content. Built on the robust combination of **React.js** for a dynamic frontend and **Appwrite** as a powerful open-source backend, BlogNest offers features like user authentication, rich text editing, image uploads, and full CRUD (Create, Read, Update, Delete) functionality for articles.

Whether you're a seasoned writer looking to share your thoughts or an avid reader seeking engaging content, BlogNest provides a clean and efficient platform for all your blogging needs.

### 📸 Screenshots (Optional)

Add screenshots or GIFs here to showcase your application.

![Homepage Screenshot]([PATH_TO_YOUR_SCREENSHOT_1])
*Caption for Screenshot 1*

![Create Post Screenshot]([PATH_TO_YOUR_SCREENSHOT_2])
*Caption for Screenshot 2*

---

## ✨ Features

* **User Authentication:** Secure user registration, login, and logout functionalities.
* **Create Posts:** Authenticated users can create new blog posts with a title, content, and a featured image.
* **Rich Text Editor (RTE):** Seamlessly write and format your articles using an integrated rich text editor.
* **Image Uploads:** Upload featured images for your blog posts with Appwrite Storage.
* **Read Articles:** Browse and read existing articles with a clean and responsive UI.
* **Update Posts:** Authors can edit their own published articles.
* **Delete Posts:** Authors have the ability to remove their own articles.
* **Slug Generation:** Automatic and editable slug generation for SEO-friendly URLs.
* **Post Status Management:** Set articles as 'active' (published) or 'inactive' (draft).
* **Responsive Design:** Optimized for seamless experience across various devices (desktop, tablet, mobile).
* **State Management:** Efficient state handling using Redux Toolkit.
* **Form Management:** Utilizes `react-hook-form` for robust form validation and submission.

---

## 🚀 Tech Stack

**Frontend:**
* **React.js:** A JavaScript library for building user interfaces.
* **Vite:** A fast build tool for modern web projects.
* **Redux Toolkit:** For efficient and scalable state management.
* **React Hook Form:** For flexible and performant forms with easy validation.
* **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
* **TinyMCE (or similar):** Integrated Rich Text Editor.
* **React Router DOM:** For declarative routing in React applications.

**Backend:**
* **Appwrite:** An open-source backend-as-a-service platform that provides:
    * **Authentication:** User management.
    * **Databases:** Store blog post data.
    * **Storage:** Handle image uploads for featured images.
    * **Functions (Future/Advanced):** Could be used for email notifications, advanced data processing, etc.

---

## 🤝 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js** (LTS version recommended)
* **npm** (comes with Node.js) or **Yarn**
* **Appwrite Instance:** You need a running Appwrite instance (local Docker setup or a hosted solution). Refer to the [Appwrite Documentation](https://appwrite.io/docs/installation) for installation instructions.

### Appwrite Backend Setup

1.  **Access Appwrite Console:**
    * If running locally, navigate to `http://localhost/` in your browser.
    * Log in or create a new account.
2.  **Create a New Project:**
    * From the dashboard, click "Create project" and give it a name (e.g., `BlogNest`).
    * **Copy your Project ID** from the project settings; you'll need this for your frontend.
3.  **Setup Database:**
    * Go to **Databases** on the left sidebar.
    * Click "Create database" (e.g., `blogNestDB`).
    * **Copy your Database ID.**
4.  **Create Collections:**
    * Inside your `blogNestDB` (or whatever you named it), click "Create collection".
    * **Create a `posts` collection:**
        * **Collection ID:** Copy this ID.
        * **Attributes:** Add the following attributes with appropriate types and required settings:
            * `title` (String, Required)
            * `slug` (String, Required) - Must be unique
            * `content` (String, Required)
            * `featuredImage` (String, Required) - This will store the File ID from Appwrite Storage
            * `status` (String, Required) - e.g., 'active', 'inactive'
            * `userId` (String, Required) - Stores the ID of the user who created the post
            * `authorName` (String, Required) - Stores the name or email of the author for display
        * **Permissions:** Set **Create** and **Update** permissions for `role:member` (so only logged-in users can create/update posts). Set **Read** permission for `role:any` (so anyone can read posts).
5.  **Setup Storage:**
    * Go to **Storage** on the left sidebar.
    * Click "Create bucket" (e.g., `post_images`).
    * **Copy your Bucket ID.**
    * **Permissions:** Set **Create** permission for `role:member` (to allow authenticated users to upload images). Set **Read** permission for `role:any` (so featured images can be displayed publicly).

### Frontend Setup

1.  **Clone the repository:**

    ```bash
    git clone [YOUR_REPO_LINK]
    cd BlogNest
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Create Environment Variables:**
    * In the root of your project, create a new file named `.env`.
    * Add the following variables, replacing the placeholder values with your actual Appwrite credentials:

    ```env
    VITE_APPWRITE_ENDPOINT=[YOUR_APPWRITE_ENDPOINT]
    VITE_APPWRITE_PROJECT_ID=[YOUR_APPWRITE_PROJECT_ID]
    VITE_APPWRITE_DATABASE_ID=[YOUR_DATABASE_ID]
    VITE_APPWRITE_COLLECTION_ID=[YOUR_COLLECTION_ID_FOR_POSTS]
    VITE_APPWRITE_BUCKET_ID=[YOUR_BUCKET_ID_FOR_IMAGES]
    ```
    * **Note:** For local development with Appwrite Docker, `VITE_APPWRITE_ENDPOINT` is typically `http://localhost/v1`.

4.  **Configure Appwrite SDK in your project:**
    * Ensure your `appwrite/config.js` (or similar file where you initialize Appwrite services) uses these environment variables. It should look something like this:

    ```javascript
    // src/appwrite/config.js
    import { Client, Databases, Storage, Query, ID, Account } from 'appwrite';

    const client = new Client()
        .setEndpoint(String(import.meta.env.VITE_APPWRITE_ENDPOINT))
        .setProject(String(import.meta.env.VITE_APPWRITE_PROJECT_ID));

    const account = new Account(client);
    const databases = new Databases(client);
    const storage = new Storage(client);

    const appwriteService = {
        client,
        account,
        databases,
        storage,
        // ... other methods like createPost, updatePost, etc.
        // Make sure databaseId, collectionId, bucketId are used from environment variables
        // e.g., process.env.VITE_APPWRITE_DATABASE_ID
    };

    export default appwriteService;
    ```
    * **Important:** Vite uses `import.meta.env` for environment variables, not `process.env`. Make sure your `appwrite/config.js` (or equivalent) reflects this if you are using Vite.

### Running the Application

1.  **Start the frontend development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

2.  Open your browser and navigate to `http://localhost:5173` (or the port indicated by your console).

---

## 📚 Usage

Once the application is running:

1.  **Register/Login:** New users can sign up for an account, or existing users can log in.
2.  **Browse Posts:** View all published blog posts on the homepage.
3.  **Create New Post:**
    * Navigate to the "Add Post" (or similar) section.
    * Fill in the title, write your content using the rich text editor, upload a featured image, and set the status (e.g., "active" to publish immediately).
    * Click "Submit".
4.  **Manage Your Posts:** Logged-in users can view and manage their own articles.
5.  **Edit/Delete Posts:** From your post management area or individual post view, you can update or delete your articles.

---

## 🏗️ Project Structure

A high-level overview of the project directory structure:

BlogNest/
├── public/                     # Static assets
├── src/
│   ├── App.jsx                 # Main application component
│   ├── main.jsx                # Entry point
│   ├── appwrite/               # Appwrite service configurations and SDK calls
│   │   └── config.js           # Appwrite client, database, storage setup
│   ├── components/             # Reusable UI components (AuthLayout, Button, Header, Footer, Input, Select, RTE, PostCard, etc.)
│   ├── pages/                  # Top-level page components (Home, AllPosts, AddPost, EditPost, Login, Signup, Post, etc.)
│   ├── store/                  # Redux Toolkit setup (authSlice, postSlice if needed)
│   │   └── authSlice.js
│   │   └── store.js
│   ├── assets/                 # Images, icons, etc.
│   ├── styles/                 # Tailwind CSS configuration or custom styles
│   └── index.css               # Main CSS file (Tailwind directives)
├── .env.example                # Example environment variables
├── .gitignore                  # Files/folders to ignore in Git
├── package.json                # Project dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
└── README.md                   # This file


---

## 💡 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. Don't forget to give the project a star! Thanks!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📞 Contact

Your Name - [Your Email Address]
Project Link: [YOUR_REPO_LINK]

---

## 🙏 Acknowledgements

* [Appwrite](https://appwrite.io/)
* [React](https://react.dev/)
* [Redux Toolkit](https://redux-toolkit.js.org/)
* [React Hook Form](https://react-hook-form.com/)
* [Tailwind CSS](https://tailwindcss.com/)
* [TinyMCE](https://www.tiny.cloud/) (if using for RTE)
* [Vite](https://vitejs.dev/)
