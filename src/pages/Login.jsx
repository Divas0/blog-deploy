import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login as authlogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function Login() {
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const [loading, setLoading]=useState(false)
    const [error, setError]=useState("")
    
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
   
  } = useForm();


  const onSubmit =  async ({email, password}) => {
    setError("")
  setLoading(true)
     try {
        const session= await authService.login({email, password});
     if (session){
        const userData= await authService.getCurrentuser();
        console.log(userData)
        
        if (userData){
         dispatch(authlogin(userData));
         navigate("/")
         toast.success("succesfully logged in ", {
          position:"top-right"
         })
         
        }
    }
     } catch (error) {
         setError(error.message);
     } finally{
      setLoading(false)
     }
  };
  if (loading==true){
    return <> <Loader/></>
  }

  return (
    <div className=" flex flex-col  w-full  mt-[60px]  h-screen  items-center    ">
      <div className="w-[400px] flex flex-col gap-[15px]  ">
        <p className="font-bold text-xl ml-[120px] "> Login</p>
        {error &&  <p className="text-red-500 text-wrap"> {error}</p> }
       
      <Input
        {...register("email")}
        className="py-[9px] px-[7px]  rounded-md "
        type="email"
        placeholder=" eg:email@email.com"
      />
     {errors.email && (
        <p className="text-red-500 ">{`${errors.email.message}`}</p>
      )}

      <Input
        {...register("password")}
        className="py-[9px] px-[7px] border   "
        type="password"
        placeholder=" eg:password"
      />
      {errors.password && (
        <p className="text-red-500"> {`${errors.password.message}`}</p>
      )}
      <button
        onClick={handleSubmit(onSubmit)}
        className="py-[9px] px-[6px] w-[300px] border-black rounded-lg text-white  bg-blue-600  "
        disabled={isSubmitting}
      >
        submit
      </button>
      </div> 
    </div>
  );
}

export default Login;
