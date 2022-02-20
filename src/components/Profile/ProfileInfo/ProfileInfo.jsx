import React from 'react';
import s from './ProfileInfo.module.css';
import banner from './../../../img/banner.webp';

const ProfileInfo = (props) => {
    return (
        <div className="">
            <div className={s.banner_wrapper}>
                <img className={s.banner} src={banner} alt='banner'></img>
            </div>
            <div className={s.descriptionBlock}>
                ava
                description
            </div>
        </div>

    );
}

export default ProfileInfo;