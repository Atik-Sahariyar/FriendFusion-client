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
        path: "/register",
        element: <SignUp></SignUp>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
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
      }
    ]
  }
]);


export default router