import React, { Component } from 'react'
import { Router, Scene, Tabs, Stack, Drawer, Actions, Modal } from 'react-native-router-flux';


import FirstScreen from './components/FirstScreen';
import Register from './components/Register';
import Login from './components/Login';
import Main from './components/Main';
import Chat from './components/Chat';

export default class Routerim extends Component {
    render() {
        return (
            <Router>
                <Stack key="root" hideNavBar>
                    <Scene key="onboarding" modal={false} >
                        <Scene key="firstscreen"
                            hideNavBar
                            component={FirstScreen}
                            initial
                        />

                        <Scene key="register"
                            hideNavBar
                            component={Register}
                        />

                        <Scene key="login"
                            hideNavBar
                            component={Login}
                        />
                    </Scene>

                    <Scene key="main" component={Main} ></Scene>
                    <Scene key="chat" component={Chat} ></Scene>
                </Stack>
            </Router>
        )
    }
}