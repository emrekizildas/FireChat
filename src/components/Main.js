import React, { Component } from 'react'
import { Dimensions, StyleSheet, ActivityIndicator } from 'react-native'
import { Icon, Container, Input, Content, Button, Text, Form, Item, Label, View, Header, Left, Body, Title, Toast, Root } from 'native-base';
import { iOSUIKit, material, materialColors, iOSColors, systemWeights } from 'react-native-typography';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { chatStart } from '../actions';

const { width, height } = Dimensions.get('window');

class Main extends Component {
    state = {
        chatid: ''
    }
    render() {
        return (
            <Root>
                <Container style={{ alignItems: 'center' }}>
                    <Content style={{ flexDirection: 'row' }}>
                        {
                            this.props.loading ?
                                <View style={{ flex: 9, justifyContent: 'center' }}>
                                    <ActivityIndicator size="large" color={iOSColors.blue} />
                                    <Text>{this.props.message}</Text>
                                </View>
                                :
                                <Form style={styles.form}>
                                    <Icon style={{ marginBottom: 20, fontSize: 80, color: iOSColors.tealBlue }} name="aperture" ></Icon>
                                    <Text style={styles.title}>Grup kodunuz nedir?</Text>
                                    <Text style={{ marginBottom: 5, color: 'gray' }}>Lütfen 6 haneli grup kodunuzu giriniz.</Text>
                                    <Item rounded>
                                        <Icon name="keypad"></Icon>
                                        <Input
                                            value={this.state.chatid}
                                            onChangeText={(chatid) => { this.setState({ chatid }) }}
                                            maxLength={6} keyboardType='number-pad' />
                                    </Item>
                                    <Button
                                        onPress={() => {this.props.chatStart(this.state.chatid, this.props.user._id); this.state.chatid = '';}}
                                        block iconLeft style={{ marginTop: 10 }}>
                                        <Icon name="paper-plane"></Icon>
                                        <Text>Sohbete Başla !</Text>
                                    </Button>
                                </Form>
                        }
                    </Content>
                </Container>
            </Root>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        ...material.headline,
        ...systemWeights.bold,
        color: iOSColors.blue,
        marginBottom: 10
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.9
    }
});

const mapStatsToProps = ({ chatResponse, authResponse }) => {
    return { loading: chatResponse.loading, user: authResponse.user, message: chatResponse.message }
}
export default connect(mapStatsToProps, { chatStart })(Main)