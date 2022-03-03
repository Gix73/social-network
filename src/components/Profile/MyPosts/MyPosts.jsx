import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';

const MyPosts = (props) => {

    let newPostElement = React.createRef();

    let createPost = () => {

        props.addPost(newPostElement.current.value);
        newPostElement.current.value = "";
    }

    let postsElements = props.posts.map(p => {
        return <Post message={p.message} likesCount={p.likesCount} />
    });

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div className="">
                    <textarea ref={newPostElement} name=""></textarea>
                </div>
                <div className="">
                    <button onClick={createPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
                {/* <Post message={posts[0].message} likesCount={posts[0].likesCount} />
                <Post message={posts[1].message} likesCount={posts[1].likesCount} /> */}
            </div>
        </div>
    );
}

export default MyPosts;