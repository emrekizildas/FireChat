import React, { Component } from 'react'
import { Dimensions, TouchableOpacity, StatusBar } from 'react-native'
import { Text, View, Container, Content, Header, Right, Icon, Button, Body, Title, Card, CardItem, Footer, Input, Left, Form, Item, Label } from 'native-base'
import { iOSColors } from 'react-native-typography'
import { GiftedChat } from 'react-native-gifted-chat'

import { connect } from 'react-redux';
import { messageSend, logoutChat } from '../actions';
import { Actions } from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');

class Chat extends Component {
    renderFooter = () => {
        return (
            <View style={{ marginBottom: 5, paddingBottom: 5 }}></View>
        );
    }
    state = {
        messageText: '',
        messages: []
    }

    onSend() {
        this.props.messageSend(this.props.chatid, this.state.messageText, this.props.userid);
    }
    render() {
        return (
            <GiftedChat
                messages={this.props.messages}
                user={{
                    _id: this.props.userid,
                    name: this.props.username
                }}
                text={this.state.messageText}
                onInputTextChanged={messageText => this.setState({ messageText })}
                placeholder="Type a 'secret' message..."
                onSend={() => this.onSend()}
                showUserAvatar={true}
                showAvatarForEveryMessage={true}
                renderFooter={this.renderFooter}
                renderCustomView={this.renderFooter}
                renderUsernameOnMessage={true}
                inverted={false}
            />
        )
    }
}

const mapStatsToProps = ({ chatResponse, authResponse }) => {
    return { loading: chatResponse.loading, userid: authResponse.user._id, username: authResponse.user.username, chatid: chatResponse.chatid, messages: chatResponse.messages }
}
export default connect(mapStatsToProps, { messageSend, logoutChat })(Chat)