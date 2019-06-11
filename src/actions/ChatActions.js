import { Alert } from 'react-native';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

import {
    CHAT_FAILD,
    CHAT_SUCCESS,
    CHAT_LISTEN,
    CHAT_LOGOUT,
    CHAT_START
} from './types';

var users = [];

export const chatStart = (chatid, userid) => {
    return (dispatch) => {
        if (chatid.trim().length == 6) {
            dispatch({ type: CHAT_START });
            firebase.database().ref('chats').child(chatid).once('value').then(async (snapshot) => {
                await getUsers();
                if (snapshot.val() != null) {
                    dispatch({ type: CHAT_SUCCESS, message: 'Başlatılıyor...', chatid });
                    chatListen(chatid, dispatch);
                } else {
                    dispatch({ type: CHAT_SUCCESS, message: chatid + ' grubu oluşturuluyor...', chatid });
                    firebase.database().ref('chats').child(chatid).push({ text: 'Grubun ilk mesajı!', createdAt: new Date(), userid });
                    chatListen(chatid, dispatch);
                }
            }).catch(error => {
                dispatch({ type: CHAT_FAILD });
                console.log('Hatalı:', error);
            });
        } else {
            Alert.alert('Dikkat!', 'Lütfen 6 haneli grup kodunu giriniz!')
        }
    }
}

export const messageSend = (chatid, message, userid) => {
    return (dispatch) => {
        if (message.trim().length >= 3) {
            firebase.database().ref('chats').child(chatid).push({ text: message, createdAt: new Date(), userid: userid });
        } else {
            Alert.alert('Hata!', 'Lütfen en az 3 karakterli mesaj gönderiniz!');
        }
    }
}

export const logoutChat = () => {
    return (dispatch) => {
        dispatch({ type: CHAT_LOGOUT });
        Actions.pop();
    }
}
async function chatListen(chatid, dispatch) {
    var messages = [];
    firebase.database().ref('chats').child(chatid).on('value', (snapshot) => {
        snapshot.forEach((messageItem) => {
            var userData = getUserInfo(messageItem.val().userid);
            var item = { text: messageItem.val().text, _id: messageItem.key, createdAt: messageItem.val().createdAt, user: userData };
            messages = [...messages, item];
        });
        dispatch({ type: CHAT_LISTEN, payload: messages });
        messages = [];
    });
    Actions.push('chat');
}

function getUsers() {
    firebase.database().ref('users').on('value', (snapshot) => {
        users = [];
        snapshot.forEach((userItem) => {
            users.push(userItem.val());
        });
    });
}

function getUserInfo(userid){
    var userData = {};
    users.forEach((item) => {
        if(item._id == userid){
            userData = item;
        }
    });
    return userData;
}