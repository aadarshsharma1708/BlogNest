import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout, Login } from './components/index.js'
import App from './App.jsx'
import Home from'./pages/Home.jsx'
//import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import MyPosts from './pages/MyPosts.jsx'
import EditPost from './pages/EditPost.jsx'
import AddPost from './pages/AddPost.jsx'
import Post from './pages/Post.jsx'
import FeaturesPage from './pages/Features.jsx'
import AboutPage from './pages/AboutPage.jsx'
import TeamPage from './pages/TeamPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import HelpPage from './pages/HelpPage.jsx'
import TnCPage from './pages/TnCPage.jsx'
import PrivacyPage from './pages/PrivacyPolicyPage.jsx'
import FAQsPage from './pages/FAQsPage.jsx'
import ViewProfile from './pages/ViewProfile.jsx'
import EditProfile from './pages/EditProfile.jsx'
const router = createBrowserRouter([
  {
    path:'/',
    element : <App/>,
    children :[
      {
        path : '/',
        element : <Home/>
      },
      {
        path : '/viewProfile',
        element : <ViewProfile/>
      },
      {
         path : '/editProfile',
        element : <EditProfile/>
      },
      {
        path : '/login',
        element :(
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path : '/signup',
        element : (
          <AuthLayout authentication ={false}>
            <Signup/>
          </AuthLayout>
        )
      },
      {
        path : '/my-posts',
        element :(
          <AuthLayout authentication>
            {""}
            <MyPosts/>
          </AuthLayout>
        )
      },
      {
        path : '/add-post',
        element : (
          <AuthLayout authentication>
            {""}
            <AddPost/>
          </AuthLayout>
        )
      },
      {
        path : '/edit-post/:slug',
        element : (
          <AuthLayout authentication>
            {""}
            <EditPost/>
          </AuthLayout>
        )
      },
      {
        path : '/post/:slug',
        element : <Post/>
      },
      {
        path : '/features',
        element : <FeaturesPage/>
      },
      {
        path :'/about',
        element: <AboutPage/>
      },
      {
        path :'/team',
        element: <TeamPage/>
      },
      {
        path :'/faqs',
        element: <FAQsPage/>
      },
      {
        path :'/contact',
        element: <ContactPage/>
      },
      {
        path :'/help',
        element: <HelpPage/>
      },
      {
        path :'/terms',
        element: <TnCPage/>
      },
      {
        path :'/privacy',
        element: <PrivacyPage/>
      },
      

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
  </StrictMode>
)
