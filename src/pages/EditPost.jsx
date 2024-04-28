import React, {useEffect, useState} from 'react'
import PostForm from '../components/editor/PostForm';
import services from '../appwrite/services';
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            services.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <div>
            <PostForm post={post} />
        </div>
    </div>
  ) : null
}

export default EditPost 