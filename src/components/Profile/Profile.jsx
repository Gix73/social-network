import React from 'react';
import './../../App.css';
import banner from './../../img/banner.webp';
import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.css'

const Profile = () => {
    return (
        <div className={s.content}>
            <div className={s.banner_wrapper}>
                <img className={s.banner} src={banner} alt='banner'></img>
            </div>
            <div>
                ava
                description
            </div>
            <MyPosts />
        </div >
    );
}

export default Profile;