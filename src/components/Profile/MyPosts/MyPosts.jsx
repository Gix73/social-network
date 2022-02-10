import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';

const MyPosts = () => {
    return (
        <div>
            My posts
            <div>
                new post
            </div>
            <div className={s.posts}>
                <Post message='Hi, how are you?' likesCount="like's 12" />
                <Post message="It's my first post" likesCount="like's 15" />
            </div>
        </div>
    );
}

export default MyPosts;