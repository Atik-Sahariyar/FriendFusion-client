
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
import useUsers from "../../../../Hooks/useUsers";

const ManageUsers = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const axiosSecure = useAxiosSecure();
    const { users, totalUser ,  userLoading,  userRefetch} = useUsers(currentPage);
  
    console.log(users);

    if(userLoading){
    return <div className=" text-center">Loading...</div>
    }


 
    console.log('users', users);
    // make admin function
    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                userRefetch()
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


    const pageNumbers = Array.from({ length: Math.ceil(totalUser / 10) }, (_, index) => index + 1);
    
      const handlePagination = pageNumber => {
        setCurrentPage(pageNumber);
        userRefetch()
      };
  
      const handlePrevPage = () => {
        if (currentPage > 1) {
          setCurrentPage((prevPage) => prevPage - 1);
          userRefetch()
        }
      };
    
      const handleNextPage = () => {
        if (currentPage < Math.ceil(totalUser / 10)) {
          setCurrentPage((prevPage) => prevPage + 1);
          userRefetch()
        }
      };

      console.log(currentPage);

    return (
        <div>
            <div className=" flex justify-evenly my-">
                <h2 className=" text-3xl">All Users</h2>
                <h2 className=" text-3xl">Total Users : {totalUser}</h2>

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
                                        user.membership  ? 'Member' : 'Normal User'
                                    }
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            {
                pageNumbers?.length > 1 && <div className="flex justify-center mt-4">
                    <button onClick={handlePrevPage} className="mx-1 px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-700">
                        Prev
                    </button>
                    {pageNumbers.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePagination(index + 1)}
                            className={`mx-1 px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-700 ${currentPage === index + 1 ? 'bg-blue-700' : ''
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={handleNextPage} className="mx-1 px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-700">
                        Next
                    </button>
                </div>
            }
        </div>
    );
};

export default ManageUsers;


