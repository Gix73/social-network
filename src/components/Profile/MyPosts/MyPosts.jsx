import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';

const MyPosts = () => {

    let postsData = [
        { id: 1, message: 'Hi, how are you?', likesCount: 1 },
        { id: 2, message: 'It\'s my first post', likesCount: 1 },
        { id: 3, message: 'Kostya', likesCount: 1 },
        { id: 4, message: 'Ivan', likesCount: 1 },
        { id: 5, message: 'Vlad', likesCount: 1 }
    ]

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
                <Post message={postsData[0].message} likesCount={postsData[0].likesCount} />
                <Post message={postsData[1].message} likesCount={postsData[1].likesCount} />
            </div>
        </div>
    );
}

export default MyPosts;