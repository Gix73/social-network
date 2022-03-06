import { rerenderEntireTree } from './../render';

let state = {
    profilePage: {
        posts: [
            { id: 1, message: 'Hi, how are you?', likesCount: 1 },
            { id: 2, message: 'It\'s my first post', likesCount: 1 }
        ],
        newPostText: "Hello!"
    },
    messagesPage: {
        dialogs: [
            { id: 1, name: 'Dima' },
            { id: 2, name: 'Max' },
            { id: 3, name: 'Kostya' },
            { id: 4, name: 'Ivan' },
            { id: 5, name: 'Vlad' }
        ],
        messages: [
            { id: 1, message: 'Hi' },
            { id: 2, message: 'How are you?' },
            { id: 3, message: 'Fine' }
        ]
    }

}

export let addPost = (postMessage) => {
    let newPost = {
        id: 5,
        message: state.profilePage.newPostText,
        likesCount: 2
    };
    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = '';
    rerenderEntireTree(state);
}

export let updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText;
    rerenderEntireTree(state);
}

export default state;