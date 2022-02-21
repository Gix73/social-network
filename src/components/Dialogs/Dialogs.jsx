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

    let dialogs = [
        { id: 1, name: 'Dima' },
        { id: 2, name: 'Max' },
        { id: 3, name: 'Kostya' },
        { id: 4, name: 'Ivan' },
        { id: 5, name: 'Vlad' }
    ];

    let messages = [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Fine' }
    ];

    let dialogsElements = dialogs.map(d => {
        return <DialogItem name={d.name} id={d.id} />
    });

    let messagesElements = messages.map(m => <Message message={m.message} />)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>

                {dialogsElements}
                {/* <DialogItem name={dialogs[0].name} id={dialogs[0].id} />
                <DialogItem name={dialogs[1].name} id={dialogs[1].id} /> */}
                {/* <DialogItem name="Kostya" id="3" />
                <DialogItem name="Ivan" id="4" />
                <DialogItem name="Vlad" id="5" /> */}
            </div>
            <div className={s.messages}>
                {messagesElements}
                {/* <Message message={message[0].message} />
                <Message message={message[1].message} /> */}
                {/* <Message message={message[2].message} /> */}
            </div>
        </div>
    );
}

export default Dialogs;