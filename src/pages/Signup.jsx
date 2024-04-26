
import React, { useState } from 'react';
import authService from '../appwrite/auth.js';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice.js';
import Input from '../components/Input.jsx';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import services from '../appwrite/services.js';

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    try {
      const userData = await authService.createAccount(data);
      if (!userData) {
        setError('No user data found');
        return;
      }
      const currentUserData = await services.getCurrentuser();
      if (currentUserData) {
        dispatch(login(currentUserData));
        navigate('/all-posts');
      }
    } catch (error) {
      setError('An error occurred while creating the account');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center"></div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create an account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline">
            Log in
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              name="userName"
              placeholder="Enter your full name"
              {...register('userName', { required: true })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              name="email"
              {...register('email', {
                required: true,
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Email address must be a valid address',
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              name="password"
              placeholder="Enter your password"
              {...register('password', { required: true })}
            />
            <button type="submit" className="w-full bg-blue-800 text-white font-bold py-[10px] rounded-lg">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
