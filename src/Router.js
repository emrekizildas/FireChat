import React, { Component } from 'react'
import { Button, Icon, Header, Body, Title, Left, Right } from 'native-base'
import { Router, Scene, Stack } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { logoutChat } from './actions';

import FirstScreen from './components/FirstScreen';
import Register from './components/Register';
import Login from './components/Login';
import Main from './components/Main';
import Chat from './components/Chat';
import { iOSColors } from 'react-native-typography';

class Routerim extends Component {
    renderNavBar = () => {
        return (
            <Header 
            noShadow
            androidStatusBarColor={iOSColors.red}
            style={{backgroundColor: iOSColors.red}}
            >
                <Left>
                    <Button onPress={() => { this.props.logoutChat() }} transparent>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>FireChat</Title>
                </Body>
                <Right>
                    
                </Right>
            </Header>
        );
    }
    render() {
        return (
            <Router>
                <Stack key="root">
                    <Scene hideNavBar key="onboarding" modal={false} >
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

                    <Scene hideNavBar key="main" component={Main} ></Scene>
                    <Scene
                        key="chat"
                        component={Chat}
                        navBar={this.renderNavBar} ></Scene>
                </Stack>
            </Router>
        )
    }
}

export default connect(null, { logoutChat })(Routerim)