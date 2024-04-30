
import React, { useState } from 'react';
import authService from '../appwrite/auth.js';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice.js';
import Input from '../components/Input.jsx';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import services from '../appwrite/services.js';
import { toast } from 'react-toastify';
import Loader from '../components/Loader.jsx';

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading]=useState(false)
  
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setLoading(true)
    try {
      const userData = await authService.createAccount(data);
      if (!userData) {
        setError('No user data found');
        return;
      }
      const currentUserData = await authService.getCurrentuser();
      if (currentUserData) {
        dispatch(login(currentUserData));
        
        toast.success(
          " succesfully created"
        )
        navigate('/all-posts');
        setLoading(false)
        
      }
    } catch (error) {
      console.log(error)
      toast.error(
        "error occured during creation"
      );
    }
  };
  if (loading==true){
    return <> <Loader/></>
  }

  return (
    <div className="flex  justify-center h-screen">
      <div className=" w-full max-w-lg rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center"></div>
        <h2 className="text-2xl ml-[140px] font-bold leading-tight">Sign up </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline">
            Log in
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">toast.error({error})</p>}
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-4 ml-[40px]">
            <Input
            
              name="userName"
              placeholder="Enter your full name"
              className="py-[11px]"
              {...register('userName', { required: true })}
            />
            <Input
             
              placeholder="Enter your email"
              type="email"
              name="email"
              className="py-[11px]"
              {...register('email', {
                required: true,
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Email address must be a valid address',
                },
              })}
            />
            <Input
              
              type="password"
              name="password"
              placeholder="Enter your password"
              className="py-[11px]"
              {...register('password', { required: true })}
            />
            <button type="submit" className="w-[300px] bg-blue-800 text-white font-bold py-[11px] rounded-lg">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
