import React, { Component } from 'react'
import { Dimensions, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Container, Input, Content, Button, Text, Form, Item, Label, View, Header } from 'native-base';
import { material, iOSColors, systemWeights } from 'react-native-typography';
import { Actions } from 'react-native-router-flux';
import { SAVE_USER_INFO } from '../actions/types';

import { connect } from 'react-redux';
import { login } from '../actions';

const { width, height } = Dimensions.get('window');



class FirstScreen extends Component {
    componentWillMount() {
        AsyncStorage.getItem(SAVE_USER_INFO)
            .then(req => JSON.parse(req))
            .then(json => {
                if (json !== null) {
                    this.props.login(json.email, json.password)
                } else {

                }
            }).done();
    }


    render() {
        if (this.props.loading) {
            return (
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '' }}>

                    <ActivityIndicator size="large" color={iOSColors.blue} />
                </SafeAreaView>
            )
        }

        return (
            <Container style={styles.container}>
                <Content style={styles.content}>
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                        <Icon style={{ paddingBottom: 20, fontSize: 80, color: iOSColors.tealBlue }} name="aperture" ></Icon>
                    </View>

                    <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <Text style={styles.textStyle}>Grup kodunuzu girin ve sohbete başlayın!</Text>
                        <Button onPress={() => Actions.register()} rounded iconLeft primary style={{ marginTop: 20 }}>
                            <Icon name="arrow-forward"></Icon>
                            <Text>Başla</Text>
                        </Button>
                        <View style={{ ...material.caption, marginTop: 20 }}>
                            <Text onPress={() => Actions.login()}>Zaten bir hesabın var mı? <Text style={{ color: iOSColors.blue }}>Giriş yap</Text></Text>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    content: {
        flex: 1,
        flexDirection: 'row',
    },
    textStyle: {
        ...material.display1,
        ...systemWeights.bold,
        color: iOSColors.blue,
        textAlign: 'left',
        width: width * 0.9
    }

});

const mapStataToProps = ({ authResponse }) => {
    console.log(authResponse);
    return { loading: authResponse.loading }
}

export default connect(mapStataToProps, { login })(FirstScreen)

