import React from 'react';
import s from './Post.module.css'
import avatar from './../../../../img/avatar.jpg'

const Post = (props) => {
    return (
        <div className={s.item}>
            <img src={avatar} alt="avatar" />
            {props.message}
            <div>
                <span>{props.likesCount}</span>
            </div>
        </div>
    );
}

export default Post;