

import React, { useCallback, useEffect, useState } from 'react'
import RTE from "./RTE"
import Select from "../Select"
import Input from '../Input'
import services from '../../appwrite/services'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import authService from '../../appwrite/auth'
import {toast} from "react-toastify"

function PostForm({ post }) {
    const [loading, setLoading] = useState(false)
    const [userData, setUserData]=useState("")
    const navigate = useNavigate()

    const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
           
        }
    });
    useEffect(() => {
        authService
          .getCurrentuser()
          .then((Data) => {
            if (Data) {
              setUserData(Data)
              
            }})
          
    }, []);
   
//    const userData = useSelector(state => state.auth.userData)
   
    
  

    const submit = async (data) => {
        console.log(data)
        setLoading(true)
        if (post) {
            const file = data.image[0] ? await services.uploadFile(data.image[0]) : null
            if (file) {
                services.deleteFile(post.featuredImage)
            }
            const dbPost = await services.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })
            if (dbPost) {
                setLoading(false)
                toast({
                    message:"succesfully posted"
                })
                navigate(`/post/${post.$id}`)
            }
        } else {
            const file = await services.uploadFile(data.image[0])
            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId
                try {
                    let dbPost = await services.createPost({
                        ...data,
                        userId: userData.$id
                    })
                    if(dbPost){
                        navigate(`/post/${dbPost.$id}`)
                    }
                } catch (error) {
                    prompt(error.message)
                } finally {setLoading(false)}
            }

        }
    }
    
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";

    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-full lg:w-2/3 px-2">
                <Input
                    label={<>Title <span className='text-red-500'>*</span>:</>}
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label={<>Slug <span className='text-red-500'>*</span>:</>}
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                {/* <Input 
                    label="Author :"
                    placeholder="Author"
                    className="mb-4"
                    {...register("author")}
                /> */}
            </div>
            <div className="w-full lg:w-1/3 px-2">
                <Input
                    label={<>Featured Image <span className='text-red-500'>*</span>:</>}
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={services.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                {loading? 
                    <div className='w-full grid place-items-center'> Loading...</div>
                    :
                <button type="submit" bgColor={post ? "bg-green-500" : "bg-red-800"} className= {` ${post? "  hover:shadow-green-500 text-black " : " hover:shadow-red-200 text-white "} shadow-sm hover:cursor-pointer duration-200 hover:drop-shadow-2xl rounded-lg w-full`} >
                    {post ? "Update" : "Submit"}
                </button>}
            </div>
        </form>
    )
}

export default PostForm