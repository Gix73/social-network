import React from 'react';
import s from './Post.module.css'
import avatar from './../../../../img/avatar.jpg'

const Post = () => {
    return (
        <div className={s.item}>
            <img src={avatar} alt="avatar" />
            post 1
            <div>
                <span>like</span>
            </div>
        </div>
    );
}

export default Post;