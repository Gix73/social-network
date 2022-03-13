import React from 'react';
import './../../App.css';
import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo />
            <MyPosts posts={props.state.posts}
                dispatch={props.dispatch}
                newPostText={props.state.newPostText} />
        </div >
    );
}

export default Profile;