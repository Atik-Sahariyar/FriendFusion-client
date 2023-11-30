import { FaBell, FaBook, FaHome,  FaUpload, FaUser } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import { Helmet } from "react-helmet-async";


const Dashboard = () => {
    const [isAdmin] = useAdmin();
    return (
       <div>
        <Helmet><title>FriendFusion | Dashboard</title></Helmet>
         <div className="flex">
            <div className=" w-64  min-h-screen bg-blue-400 ">
                <ul className=" p-4">
                    {
                        isAdmin ? <>
                            {/* admin routes */}
                        
                            <li>
                                <NavLink to="/dashboard/admin-profile"> <span className=" flex gap-2 my-3 items-center hover:bg-blue-600 hover:text-white"><FaUser></FaUser><span>Admin Profile</span></span> </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manage-users"> <span className=" flex gap-2 my-3 items-center hover:bg-blue-600 hover:text-white"><FaUpload></FaUpload><span>Manage Users</span></span> </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/activities"> <span className=" flex gap-2  my-3 items-center hover:bg-blue-600 hover:text-white"> <FaBook></FaBook> <span>Reported Comments/Activities</span></span> </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/make-announcement"> <span className=" flex gap-2 my-3 items-center hover:bg-blue-600 hover:text-white"><FaBell></FaBell><span>Make Announcement</span></span> </NavLink>
                            </li>


                        </>
                            :

                            <>
                                {/* user routes */}
                                <li>
                                    <NavLink to="/dashboard/my-profile"> <span className=" flex gap-2 my-3 items-center hover:bg-blue-600 hover:text-white"><FaUser></FaUser><span>My Profile</span></span> </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/add-post"> <span className=" flex gap-2 my-3 items-center hover:bg-blue-600 hover:text-white"><FaUpload></FaUpload><span>Add Post</span></span> </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/my-posts"> <span className=" flex gap-2 my-3 items-center hover:bg-blue-600 hover:text-white"><FaBook></FaBook><span>My Posts</span></span> </NavLink>
                                </li>

                            </>
                    }


                    {/* Shaered Navlink */}
                    <div className=" divider"></div>
                    <li>
                        <NavLink to="/"> <span className=" flex gap-2 my-3 items-center hover:bg-blue-600 hover:text-white"><FaHome></FaHome><span>Go to Home</span></span> </NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-5">
                <Outlet></Outlet>
            </div>
        </div>
       </div>
    );
};

export default Dashboard;