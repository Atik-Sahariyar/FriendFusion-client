import { useState, useEffect } from 'react';
import useAuth from '../../../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import useGenerateImgURL from '../../../../Hooks/useGenerateImgURL';
import useDate from '../../../../Hooks/useDate';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const AddPost = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [authorDetails, setAuthorDetails] = useState({
        photoURL: '',
        name: '',
        email: '',
    });
    const axiosSecure = useAxiosSecure();
    const currentDateTime = useDate()
      const [showMembershipButton, setShowMembershipButton] = useState(false);
    const { user } = useAuth();
    const [img, setImg] = useState();
    const [postImg, setPostImg] = useState();
    const imgURL = useGenerateImgURL(img);
    const navigate = useNavigate();
    const { data: postCount } = useQuery({
        queryKey: [user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/postCount/${user?.email}`);
            return res?.data[0]?.postCount
        }
    })
 
    
    useEffect(() => {
        try {
            imgURL.then(url => {
                setPostImg(url)
            })
        } catch (error) {
            console.log(error);

        }

    }, [imgURL])


    useEffect( () => {
        const authorInfo = {
            photoURL: user.photoURL,
            name: user?.displayName,
            email: user?.email,
        }
        setAuthorDetails(authorInfo);
        setShowMembershipButton(postCount >= 5);

    }, [user,axiosSecure, postCount]);



    const handleBecomeMember = () => {
        // Simulated redirection to the Membership Page
        console.log('Redirecting to Membership Page...');
    };

    const onSubmit = async (data) => {
        // console.log('cliked');
        const postTitle = data.postTitle;
        const postDescription = data?.postDescription
        const imageFiile = { image: data?.postImage[0] }
        setImg(imageFiile);
        // console.log(postTitle,postDescription);
        const photo  = await postImg && postImg ;
        const postInfo = await {
            authorInfo: authorDetails,
            postTitle,
            postDescription,
            postImg: photo ? photo : '',
            postTime: currentDateTime,
            upVote: 0,
            dounVote: 0,
            share: 0,
            comments: []
        }
    
        const res = await axiosSecure.post('/posts', postInfo);
        if (res.data._id) {
            reset()
            navigate('/dashboard/my-posts')
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.postTitle}  post successfull`,
                showConfirmButton: false,
                timer: 1500
            });
        }

    }

    return (
        <div className="add-post-container">
            {showMembershipButton ? (
                <div className="membership-cta">
                    <p>Oops! You have reached the maximum number of posts allowed.</p>
                    <Link to ="/membership">  <button onClick={handleBecomeMember} className=' btn'>Become a Member</button></Link>
                </div>
            ) : <div className="max-w-md mx-auto bg-white rounded-md p-4 shadow-md">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Post Title</span>
                        </label>
                        <input type="text" {...register('postTitle', { required: true })} /* name="postTitle" */ placeholder="Enter post title" className="input input-bordered" />
                        {errors.name && <span className=" text-red-500">Post title is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Post description</span>
                        </label>
                        <textarea type="text" {...register('postDescription')} name="postDescription" placeholder="post description" className="input input-bordered" />

                    </div>
                    <div className="  form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Choose Photo</span>
                        </label>
                        <input
                            {...register('postImage')}
                            type="file"
                            className=" file-input input-bordered w-full"
                            accept='image/*'
                            required
                        />
                    </div>

                    <div className="form-control mt-6">
                        <input type="submit" className="btn bg-blue-500 text-white text-xl" value="Post" />
                    </div>
                </form>
            </div>}
        </div>
    );
};

export default AddPost;
