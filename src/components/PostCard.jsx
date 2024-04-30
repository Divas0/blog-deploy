import React from 'react'
import services from '../appwrite/services'
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full  rounded-xl p-4'>
            <div className='w-full object-cover justify-center mb-4'>
                <img src={services.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl h-auto ' />

            </div>
            <h2
            className='text-2xl font-bold text-gray-200 text-center '
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard