import { FaBook, FaHome,  FaUpload, FaUser } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";


const Dashboard = () => {
    const [isAdmin] = useAdmin();
    return (
        <div className="flex">
            <div className=" w-64  min-h-screen bg-blue-400 ">
                <ul className=" p-4">
                    {
                        isAdmin ? <>
                            {/* admin routes */}
                        
                            <li>
                                <NavLink to="/dashboard/my-profile"> <span className=" flex gap-2 my-3 items-center"><FaUser></FaUser><span>My Profile</span></span> </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/add-post"> <span className=" flex gap-2 my-3 items-center"><FaUpload></FaUpload><span>Add Post</span></span> </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/my-posts"> <span className=" flex gap-2 my-3 items-center"><FaBook></FaBook><span>My Posts</span></span> </NavLink>
                            </li>


                        </>
                            :

                            <>
                                {/* user routes */}
                                <li>
                                    <NavLink to="/dashboard/my-profile"> <span className=" flex gap-2 my-3 items-center"><FaUser></FaUser><span>My Profile</span></span> </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/add-post"> <span className=" flex gap-2 my-3 items-center"><FaUpload></FaUpload><span>Add Post</span></span> </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/my-posts"> <span className=" flex gap-2 my-3 items-center"><FaBook></FaBook><span>My Posts</span></span> </NavLink>
                                </li>

                            </>
                    }


                    {/* Shaered Navlink */}
                    <div className=" divider"></div>
                    <li>
                        <NavLink to="/"> <span className=" flex gap-2 my-3 items-center"><FaHome></FaHome><span>Go to Home</span></span> </NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;