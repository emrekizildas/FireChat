import React, { Component } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { Icon, Container, Input, Content, Button, Text, Form, Item, Label, View, Header, Left, Body, Title } from 'native-base';
import { iOSUIKit, material, materialColors, iOSColors } from 'react-native-typography';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { register } from '../actions';



const { width, height } = Dimensions.get('window');

class Register extends Component {
    state = {
        email: '',
        password: '',
        username: '',
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header 
                noShadow 
                style={{ width, backgroundColor: iOSColors.red }}
                androidStatusBarColor={iOSColors.red}>
                    <Left>
                        <Button onPress={() => Actions.pop()} transparent>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Register</Title>
                    </Body>
                </Header>
                <Content style={styles.content}>
                    <Form style={styles.form}>
                        <Icon style={{ marginBottom: 20, fontSize: 80, color: iOSColors.red }} name="aperture" ></Icon>
                        <Item rounded style={{ marginBottom: 20 }}>
                            <Icon style={{ color: iOSColors.lightGray }} active name='at' />
                            <Label style={styles.labels}>Username:</Label>
                            <Input onChangeText={(username) => { this.setState({ username }) }} />
                        </Item>
                        <Item rounded style={{ marginBottom: 20 }}>
                            <Icon style={{ color: iOSColors.lightGray }} active name='mail' />
                            <Label style={styles.labels}>e-Mail:</Label>
                            <Input onChangeText={(email) => { this.setState({ email }) }} keyboardType="email-address" />
                        </Item>
                        <Item rounded style={{ marginBottom: 20 }}>
                            <Icon style={{ color: iOSColors.lightGray }} active name='key' />
                            <Label style={styles.labels}>Password:</Label>
                            <Input onChangeText={(password) => { this.setState({ password }) }} secureTextEntry keyboardType="number-pad" />
                        </Item>
                        <View style={styles.buttons}>
                            <Button
                                onPress={() => this.props.register(
                                    this.state.username,
                                    this.state.email,
                                    this.state.password,
                                    this.state.name
                                )
                                }
                                danger
                                block iconLeft>
                                <Icon name='log-in' />
                                <Text>Register</Text>
                            </Button>
                        </View>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    content: {
        flexDirection: 'row'
    },
    form: {
        alignItems: 'center',
        width: width * 0.95,
        flex: 8,
        justifyContent: 'center'
    },
    buttons: {
        ...material.titleWhite,
        color: materialColors.whitePrimary,
        flexDirection: 'column',
        width: width * 0.9,
    },
    labels: {
        ...material.caption,
        color: iOSColors.gray
    }
});

const mapStatsToProps = ({ authResponse }) => {
    return { loading: authResponse.loading }
}

export default connect(mapStatsToProps, { register })(Register)