import { useForm } from "react-hook-form";
import useAuth from "../../../../Hooks/useAuth";
import useDate from "../../../../Hooks/useDate";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Announcement = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const currentDateTime  = useDate(); 
    const axiosSecure = useAxiosSecure();

    // handle announcement create
    const handleAnnouncement = async(data) => {
        const  title = data.title;
        const description = data.description;

        const announcement = {
            authorName: user?.displayName,
            authorImg: user?.photoURL,
            authorEmail: user?.email,
            announceTime: currentDateTime,
            title,
            description
        }
        const res = await axiosSecure.post('/announcements', announcement);
        console.log(res.data);
        if(res?.data._id){
            reset()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${title}  post successfull`,
                showConfirmButton: false,
                timer: 1500
            });
        }
       
        console.log(announcement);
    }
    return (
        <div className="my-8 p-4 bg-gray-100">
            <h3 className="text-2xl font-bold mb-4">Make any announcement</h3>
            <form onSubmit={handleSubmit(handleAnnouncement)} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-lg mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter announcement title"
                        {...register('title', { required: true })}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                    />
                    {errors.title && <span className="text-red-500">This field is required</span>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description" className="text-lg mb-1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        placeholder="Write description "
                        {...register('description', { required: true })}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                    />
                    {errors.description && <span className="text-red-500">This field is required</span>}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Submit
                </button>
            </form>
    
        </div>
    );
};

export default Announcement;






