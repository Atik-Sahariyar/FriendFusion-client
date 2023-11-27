
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import {  FaUser } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    // make admin function
    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                refetch()
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is Admin now!`,
                        showConfirmButton: false,
                        timer: 3000
                    });
                }

            })
    }


    return (
        <div>
        <div className=" flex justify-evenly my-">
            <h2 className=" text-3xl">All Users</h2>
            <h2 className=" text-3xl">Total Users : {users.length}</h2>

        </div>
        <div className="overflow-x-auto w-full">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>User Role</th>
                        <th>Subscription Status</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row  */}
                    {
                        users?.map((user, index) => <tr key={user._id}>
                            <th>{index + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                {
                                    user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className="btn btn-sm bg-blue-500 ">
                                        <FaUser className=" text-white text-2xl "></FaUser>
                                        Make Admin
                                    </button>
                                }
                            </td>
                            <td>
                               {
                                user?.membership === 'member' ? 'Member' : 'Normal User'
                               }
                            </td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    </div>
    );
};

export default ManageUsers;


