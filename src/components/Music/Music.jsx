import React from 'react';
import s from './Music.module.css'

const searchMusic = () => {
    console.log("You are searching for " + currentSearch.current.value);
}

let currentSearch = React.createRef();

const Music = (props) => {
    return (
        <div className={s.wrapper}>
            <textarea ref={currentSearch}></textarea>
            <button onClick={searchMusic} className={s.searchButton}>Search</button>
        </div>
    )
}

export default Music;