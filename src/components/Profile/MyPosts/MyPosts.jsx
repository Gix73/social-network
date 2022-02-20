import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';

const MyPosts = () => {
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div className="">
                    <textarea name=""></textarea>
                </div>
                <div className="">
                    <button>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                <Post message='Hi, how are you?' likesCount="like's 12" />
                <Post message="It's my first post" likesCount="like's 15" />
            </div>
        </div>
    );
}

export default MyPosts;