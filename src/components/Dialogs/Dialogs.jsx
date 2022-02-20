import React from 'react';
import s from './Dialogs.module.css';

const Dialogs = (props) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <div className={s.dialog + " " + s.active}>Dima</div>
                <div className={s.dialog}>Kostya</div>
                <div className={s.dialog}>Ivan</div>
                <div className={s.dialog}>Max</div>
                <div className={s.dialog}>Vlad</div>
            </div>
            <div className={s.messages}>
                <div className={s.message}>Hi</div>
                <div className={s.message}>How are you?</div>
                <div className={s.message}>Fine</div>
            </div>
        </div>
    );
}

export default Dialogs;