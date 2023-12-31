import { Helmet } from "react-helmet-async";
import {  useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
// import useGenerateImgURL from "../../Hooks/useGenerateImgURL";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const { createUser, updateUserProfiole } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
  


    // sign up sunftion
    const onSubmit = async(data) => {
        const email = data.email;
        const password = data.password;
        const imageFiile = { image: data.profilePic[0] }
      
        const url = await axios.post(image_hosting_api, imageFiile, {   
            headers: {
                'content-type': 'multipart/form-data'
            }
        }); 
        
        if(url?.data){
      
           const photoURL  =  url.data?.data?.display_url;
           console.log(photoURL);
        createUser(email, password)
            .then(async() => {
                  
         
                updateUserProfiole(data.name, photoURL )
                .then(() => {
                    const userInfo = {
                        name: data.name,
                        email: data.email,
                        photo: photoURL,
                        password
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
         
              
            )
        }
    }
   

    return (
        <section className="signup-section">
            <Helmet><title>FriendFusion | SignUp</title></Helmet>

            <div className="hero min-h-screen bg-base-200">
         
                <div className="hero-content flex-col">      
                <h3 className=" text-center my-6 text-3xl">Please Sign Up</h3>  
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