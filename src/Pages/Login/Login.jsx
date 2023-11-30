import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import useAuth from '../../Hooks/useAuth';

const Login = () => {
    const { signIn } = useAuth()
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';


    // user login function
    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire('Login successfull')
                navigate(from, {replace: true})  
            })
    }


    return (
        <>
            <Helmet><title>FriendFusion | Login</title></Helmet>
             
            <div className="hero min-h-screen bg-base-200 ">
                <div className="hero-content mx-auto flex-col lg:w-1/2">
                <h3 className=" text-center my-6 text-3xl">Please Login</h3>  

                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input  type="submit" className="btn btn-primary" value="Login" />
                            </div>
                        </form>
                        <SocialLogin></SocialLogin>
                        <p className='text-center mb-5'>
                            <small> New here? <Link to="/register" className='underline text-blue-700'>Create an account</Link></small>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;