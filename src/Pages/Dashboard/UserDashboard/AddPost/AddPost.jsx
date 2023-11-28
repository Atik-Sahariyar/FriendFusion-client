import { useState } from 'react';
import useAuth from '../../../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import useDate from '../../../../Hooks/useDate';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import Select from 'react-select';
import useMember from '../../../../Hooks/useMember';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPost = () => {
    const [selectedTag, setSelectedTag] = useState(null); 
    const isMember = useMember();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const currentDateTime = useDate();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { data: postCount, refetch: refetchCount } = useQuery({
        queryKey: [user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/postCount/${user?.email}`);
            return res?.data[0]?.postCount
        }
    });
 
    console.log('total post: ', postCount);
        // Options for the dropdown
        const tagOptions = [
            { value: 'education', label: 'education' },
            { value: 'webDevelopment', label: 'webDevelopment' },
            { value: 'general', label: 'general' },
            { value: 'softwareDevelopment', label: 'softwareDevelopment' },
            { value: 'webDesgin', label: 'webDesgin' },
            { value: 'computer', label: 'computer' },
                   ];
        const handleTagChange = (selectedOption) => {
            setSelectedTag(selectedOption);
        };

    const onSubmit = async (data) => {
        // console.log('cliked');
        const postTitle = data.postTitle;
        const postDescription = data?.postDescription
        const imageFiile = { image: data?.postImage[0] }
        const selectedTagValue = selectedTag ? selectedTag.value : null;
        const url = await axios.post(image_hosting_api, imageFiile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        if (url?.data) {
           console.log(url?.data.data.display_url);
            const postInfo = {
                authorName: user?.displayName,
                authorImg: user?.photoURL,
                authorEmail: user?.email,
                postTitle,
                postDescription,
                tag: selectedTagValue,
                postImg:  url.data.data.display_url,
                postTime: currentDateTime,
                upVote: 0,
                downVote: 0,
                share: 0,
            }

            const res = await axiosSecure.post('/posts', postInfo);
            console.log(res.data);
            if (res.data._id) {
                reset()
                refetchCount()
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

    }
   

    console.log(isMember, postCount);
    return (
        <div className="add-post-container">
            <Helmet> <title>Post | FriemdFusion</title></Helmet>
            {(postCount === undefined || postCount >= 5) && !isMember ? (
                <div className="membership-cta">
                    <p>Oops! You have reached the maximum number of posts allowed.</p>
                    <Link to="/membership">  <button className=' btn'>Become a Member</button></Link>
                </div>
            ) :
                <div>

                    <SectionTitle heading={"Post anything"} subheading={"post any image"}></SectionTitle>
                    <div className="max-w-md mx-auto bg-white rounded-md p-4 shadow-md">
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
                            <div className="form-control mt-6">
                                <label className="label">
                                    <span className="label-text">Select Tag</span>
                                </label>
                                <Select
                                    options={tagOptions}
                                    value={selectedTag}
                                    onChange={handleTagChange}
                                    placeholder="Select a tag"
                                />
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
                    </div>
                </div>
            }
        </div>
    );
};

export default AddPost;
