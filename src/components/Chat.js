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
    renderSend = (sendProps) => {
        if (sendProps.text.trim().length > 2) {
            return (
                <TouchableOpacity style={{ marginBottom: 8, marginRight: 5 }} onPress={() => { this.props.messageSend(this.props.chatid, this.state.messageText, this.props.userid); this.state.messageText = ''; }}>
                    <Icon name='send' />
                </TouchableOpacity>
            );
        }
        return null;
    }

    state = {
        messageText: ''
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
                onSend={() => this.props.messageSend(this.props.chatid, this.state.messageText, this.props.userid)}
                showUserAvatar={true}
                scrollToBottom={true}
                renderSend={this.renderSend}
                isLoadingEarlier={true}
                locale="tr-TR"
                showAvatarForEveryMessage={true}
                inverted={false}
                renderUsernameOnMessage={true}
                isAnimated={true}
            />
        )
    }
}

const mapStatsToProps = ({ chatResponse, authResponse }) => {
    return { loading: chatResponse.loading, userid: authResponse.user._id, username: authResponse.user.username, chatid: chatResponse.chatid, messages: chatResponse.messages }
}
export default connect(mapStatsToProps, { messageSend, logoutChat })(Chat)