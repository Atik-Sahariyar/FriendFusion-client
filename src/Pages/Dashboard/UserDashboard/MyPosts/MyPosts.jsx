import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const MyPosts = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();
    const { data : posts, isPending,  refetch } = useQuery({
        queryKey: [user?.email],
        queryFn: async () => {
            const res =  await axiosSecure.get(`/posts/myposts/${user?.email}`);
            return res.data
        }
    });
    
    if(isPending){
        return <p className=" text-center my-16">Loading...</p>
    }
    refetch();
    const handleDeletePost = async(id) => {
    
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`posts/myposts/delete/${id}`)
                    .then(res => {
                        if (res.data)
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your post has been deleted.",
                                icon: "success"
                            });
                        refetch();
                    })
            }
        });
    }
    return (
        <div>
        <div className=" flex  justify-evenly my-">
            <h2 className=" text-3xl">All posts</h2>
            <h2 className=" text-3xl">Total Posts : {posts?.length}</h2>

        </div>
        <div className="overflow-x-auto w-full">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Post Title</th>
                        <th>Like</th>
                        <th>Dislike</th>
                        <th>Share</th>
                        <th>Comments</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row  */}
                    { 
                        posts?.map((post, index) => <tr key={post._id}>
                            <th>{index + 1}</th>
                            <td>{post.postTitle}</td>
                            <td>{post.upVote}</td>
                            <td>{post.downVote}</td>
                            <td>{post.share}</td>
                            <td>
                                <button className=" btn btn-sm bg-blue-500 text-white hover:bg-blue-700">Comment</button>
                            </td>
                           
                            <td>
                                <button onClick={() => handleDeletePost(post._id)} className="btn btn-ghost btn-lg">
                                    <FaTrashAlt className=" text-red-600"></FaTrashAlt>
                                </button>
                            </td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    </div>
    );
};

export default MyPosts;