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

export const chatStart = (chatid, userid) => {
    return (dispatch) => {
        if (chatid.trim().length == 6) {
            dispatch({ type: CHAT_START });
            firebase.database().ref('chats').child(chatid).once('value').then((snapshot) => {
                if (snapshot.val() != null) {
                    dispatch({ type: CHAT_SUCCESS, message: 'Başlatılıyor...', chatid });
                    chatListen(chatid, dispatch);
                } else {
                    dispatch({ type: CHAT_SUCCESS, message: chatid + ' grubu oluşturuluyor...' });
                    firebase.database().ref('chats').child(chatid).push({ msg: 'Grubun ilk mesajı!', userid });
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
            firebase.database().ref('chats').child(chatid).push({ msg: message, userid: userid });
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

const chatListen = (chatid, dispatch) => {
    var messages = [];
    firebase.database().ref('chats').child(chatid).on('value', (snapshot) => {
        snapshot.forEach((messageItem) => {
            var item = { message: messageItem.val().msg, user: messageItem.val().userid };
            messages = [...messages, item];
        });
        dispatch({ type: CHAT_LISTEN, payload: messages });
        console.log('Mesajlar: ', messages);
        messages = [];
    });
    Actions.push('chat');
}