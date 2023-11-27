import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import MyProfile from "../Pages/Dashboard/UserDashboard/MyProfile/MyProfile";
import AddPost from "../Pages/Dashboard/UserDashboard/AddPost/AddPost";
import MyPosts from "../Pages/Dashboard/UserDashboard/MyPosts/MyPosts";
import PostDetails from "../Pages/Home/Posts/PostDetails";
import AdminRoute from "./AdminRoute";
import AdminProfile from "../Pages/Dashboard/AdminDashboard/AdminProfile/AdminProfile";
import ManageUsers from "../Pages/Dashboard/AdminDashboard/ManageUsers/ManageUsers";
import Activites from "../Pages/Dashboard/AdminDashboard/Activities/Activites";
import Announcement from "../Pages/Dashboard/AdminDashboard/Announcment/Announcement";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "register",
        element: <SignUp></SignUp>
      },
      {
        path: 'postDetails/:id',
        element: <PrivateRoute><PostDetails></PostDetails></PrivateRoute>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      // normal user routes
      {
        path: 'my-profile',
        element: <MyProfile></MyProfile>
      },
      {
        path: 'add-post',
        element: <AddPost></AddPost>
      },
      {
        path: 'my-posts',
        element: <MyPosts></MyPosts>
      },
      // admin only routes
      {
        path: "admin-profile",
        element: <AdminRoute> <AdminProfile></AdminProfile></AdminRoute>
      },
      {
        path: "activities",
        element: <AdminRoute> <Activites></Activites> </AdminRoute>
      },
      {
        path: "manage-users",
        element: <AdminRoute> <ManageUsers></ManageUsers> </AdminRoute>
      },
      {
        path: "make-announcement",
        element: <AdminRoute> <Announcement></Announcement> </AdminRoute>
      },
   
    ]
  }
]);


export default router