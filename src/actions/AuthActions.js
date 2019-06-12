import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILD,
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILD,
    SAVE_USER_INFO,
} from './types';


export const login = (email, password) => {
    return (dispatch) => {
        if (validateEmail(email)) {
            if (email !== '' && password !== '') {
                dispatch({ type: LOGIN_START });
                firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
                    const id = user.user._user.uid;
                    const user_info = { email: email, password: password, _id: id };
                    getUserData(user, dispatch, user_info);
                }).catch(error => {
                    console.log('Error:', error);
                    Alert.alert('Your password or email was wrong!')
                    dispatch({ type: LOGIN_FAILD });
                });
            } else {
                Alert.alert('Please fill all of inputs!')
            }
        } else {
            Alert.alert('You should real e-mail address :)')
        }
    }
}

export const register = (username, email, password) => {
    return (dispatch) => {
        if (password.length >= 6) {
            if (validateEmail(email)) {
                if (email !== '' && password !== '' && username !== '') {
                    dispatch({ type: REGISTER_START });
                    firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
                        console.log('Register Başarılı: ', user.user._user.uid);
                        dispatch({ type: REGISTER_SUCCESS });
                        const id = user.user._user.uid;
                        firebase.database().ref('users').child(id).set({ name: username, email: email, password: password, _id: id, avatar: 'https://firebasestorage.googleapis.com/v0/b/kodluyoruz-firechat.appspot.com/o/person-generic.png?alt=media&token=10bbb5f5-8a2b-4b0e-b1eb-9a509d2d5833' }).then(success => {
                            console.log("Kayıt başarılı: ", success);
                        }).catch(error => {
                            console.log("Kayıt başarısız: ", error);
                        });

                        Actions.login();
                    }).catch(error => {
                        console.log('Register Hatalı:', error);
                        // Alert.alert('');
                        dispatch({ type: REGISTER_FAILD });
                    });
                } else {
                    Alert.alert('Please, you should fill all of inputs!')
                }
            } else {
                Alert.alert('Heey! You must type a validate email address!')
            }
        } else {
            Alert.alert('We are in 21th century! You should type minimum 6-digits password!')
        }
    }
}

const getUserData = async (user, dispatch, user_info) => {
    const id = user.user._user.uid;
    firebase.database().ref('users').child(id).once('value').then(function (snapshot) {
        AsyncStorage.setItem(SAVE_USER_INFO, JSON.stringify(user_info));
        dispatch({ type: LOGIN_SUCCESS, payload: snapshot.val() });
        Actions.main({ type: 'reset' });
    }).catch(error => {
        console.log(error);
        dispatch({ type: LOGIN_FAILD });
    })
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}