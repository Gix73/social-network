import React from 'react';
import './../App.css';
import banner from './../img/banner.webp';
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
            <div>
                My posts
                <div>
                    new post
                </div>
                <div className={s.posts}>
                    <div className={s.item}>
                        post 1
                    </div>
                    <div className={s.item}>
                        post 2
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Profile;