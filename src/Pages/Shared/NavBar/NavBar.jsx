import { Link, NavLink } from "react-router-dom";
import { FaBell} from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import useAnnouncements from "../../../Hooks/useAnnouncements";


const NavBar = () => {
    const { user, logOut } = useAuth();
    const { totalAnnouncements } = useAnnouncements();
   
    const handleLogOut = () => {
        logOut()
            .then(() => {

            })
            .catch(error => {
                console.log(error);
            })
    }
    const navLinks = <>
        <li> <NavLink to="/"> Home</NavLink> </li>
        <li><NavLink to="/membership">Membership</NavLink></li>
        {
            !user && <li><NavLink to="/login">Join Us</NavLink></li>
        }

       



    </>
    return (
        <div className="navbar  max-w-screen-xl mx-auto bg-blue-300">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <div className=" flex gap-1">
                    <img src="https://i.ibb.co/ydSCFSR/rsz-2firendfusion-logo2.jpg" className=" w-12  rounded-br-lg rounded-tl-lg" alt="" />
                    <h3 className="btn btn-ghost hidden md:block lg:block normal-case text-xl">FriendFusion</h3>
                </div>
            </div>
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                <div className="flex gap-3 items-center">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                {/* <FaNotif></FaNotif> */}
                                {
                                    totalAnnouncements > 0 ? <Link to ="/announcements"> <FaBell className=" text-2xl"></FaBell>
                                    <span className="badge badge-sm indicator-item">{ totalAnnouncements }</span>
                                    </Link> 
                                    : <>
                                    <FaBell></FaBell> 
        
                                    </> 
                                }
                               
                            </div>
                        </label>
                    </div>
                    {
                        user && <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="">
                                    <img className="w-16 rounded-full" alt="User image" src={user?.photoURL} />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <p>{user?.displayName}</p>
                                </li>
                                <li><Link to="/dashboard">Dashboard</Link></li>
                                <li><button onClick={handleLogOut}>Logout</button> </li>
                            </ul>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default NavBar;


