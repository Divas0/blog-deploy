import React, {useState, useEffect} from 'react'
import services from '../appwrite/services'
import PostCard from '../components/PostCard'
import Loader from '../components/Loader'

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading , setLoading]=useState(true)
    useEffect(() => {
        
        services.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
                
            }
        }).finally(()=>setLoading(false))
        
    }, [posts])

    if (loading==true){
        return <Loader/>
    }
  
  return (
    <div className='w-full   py-8'>
        <div>
        <p className="text-3xl text-gray-300 text-center font-bold"> All Posts</p>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </div>
    </div>
  )
}

export default AllPosts