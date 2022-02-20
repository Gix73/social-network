import React from 'react';
import s from './Dialogs.module.css';
import { NavLink } from 'react-router-dom'

const DialogItem = (props) => {
    let path = "/dialogs/" + props.id;
    return (
        <div className={s.dialog + " " + s.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    );
}

const Message = (props) => {
    return (
        <div className={s.message}>
            {props.message}
        </div>
    );
}

const Dialogs = (props) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItem name="Dima" id="1" />
                <DialogItem name="Max" id="2" />
                <DialogItem name="Kostya" id="3" />
                <DialogItem name="Ivan" id="4" />
                <DialogItem name="Vlad" id="5" />
            </div>
            <div className={s.messages}>
                <Message message="Hi" />
                <Message message="How are you?" />
                <Message message="Fine" />
            </div>
        </div>
    );
}

export default Dialogs;