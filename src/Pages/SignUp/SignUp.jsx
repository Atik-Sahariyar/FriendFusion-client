import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {  useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import useGenerateImgURL from "../../Hooks/useGenerateImgURL";

const SignUp = () => {
    const [ photo, setPhoto ] = useState();
    const [ profilePic, setProfilePic] = useState(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const { createUser, updateUserProfiole } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const imgURL = useGenerateImgURL(photo || {});
    useEffect(() => {
       try{
        imgURL.then(url => {
            setProfilePic(url)
        })
       } catch (error){
         console.log(error);

       }
    },[imgURL]);
    
    // sign up sunftion
    const onSubmit = async(data) => {
        const email = data.email;
        const password = data.password;
        const imageFiile = { image: data.profilePic[0] }
        setPhoto(imageFiile);
        createUser(email, password)
            .then(async() => {
                  
              if(profilePic){
                updateUserProfiole(data.name, profilePic )
                .then(() => {
                    const userInfo = {
                        name: data.name,
                        email: data.email,
                        photo: profilePic
                    }
                    console.log('user info: ', userInfo);
                    axiosPublic.post('/users', userInfo)
                        .then(res => {
                            console.log(res.data);
                            if (res.data?._id) {
                                Swal.fire('Sign up successfull')
                                navigate('/');
                                reset();
                            }
                        })

                })
                .catch(error => {
                    console.log(error);
                })
              }
            })
    }
   

    return (
        <section className="signup-section">
            <Helmet><title>FriendFusion | SignUp</title></Helmet>

            <div className="hero min-h-screen bg-base-200">
         
                <div className="hero-content flex-col">      
                <h3 className=" text-center my-6 text-3xl">Please SignUp</h3>  
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register('name', { required: true })} name="name" placeholder="Enter your name" className="input input-bordered" />
                                {errors.name && <span className=" text-red-500">Name is required</span>}
                            </div>
                            <div className="  form-control w-full my-6">
                            <label className="label">
                                    <span className="label-text">Choose Photo</span>
                                </label>
                                <input {...register('profilePic')} type="file" className=" file-input input-bordered w-full" required />
                            </div>
                            {/*  <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register('photoURL', { required: true } )} name="photoURL" placeholder="Enter your name" className="input input-bordered" />
                                {errors.photoURL && <span className=" text-red-500">Photo URL is required</span>}
                            </div> */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register('email', { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className=" text-red-500">Email is required</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register('password', {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
                                })} name="password" placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <span className=" text-red-500">Password is required</span>}
                                {errors.password?.type === 'minLength' && <span className=" text-red-500">Password length must be 6 or more characters </span>}
                                {errors.password?.type === 'maxLength' && <span className=" text-red-500">Password length must be less then 20 characters</span>}
                                {errors.password?.type === 'pattern' && <span className=" text-red-500">Password must have one Uppercase, lowercase, spacial character and number</span>}
                            </div>

                            <div className="form-control mt-6">
                                <input type="submit" className="btn btn-primary" value="SignUp" />

                            </div>
                        </form>
                        <SocialLogin></SocialLogin>
                        <p className='text-center mb-5'>
                            <small> Already have an accoutn ? <Link to="/login" className='underline text-blue-700'>Login</Link></small>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;