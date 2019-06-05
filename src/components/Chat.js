import React, { Component } from 'react'
import { Dimensions, FlatList } from 'react-native'
import { Text, View, Container, Content, Header, Right, Icon, Button, Body, Title, Card, CardItem, Footer, Input, Left, Form, Item, Label } from 'native-base'
import { iOSColors } from 'react-native-typography'

import { connect } from 'react-redux';
import { messageSend, logoutChat } from '../actions';
import { Actions } from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');

class Chat extends Component {
    state = {
        messageText: ''
    }
    render() {
        return (
            <Container>
                <Header noShadow>
                    <Body>
                        <Title>Sohbet</Title>
                    </Body>
                    <Right>
                        <Button onPress={() => {this.props.logoutChat()}} transparent>
                            <Icon name='log-out' />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <FlatList
                        data={this.props.messages}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) =>
                            <Card noShadow>
                                {
                                    item.user == this.props.userid ?
                                        <CardItem style={{ backgroundColor: iOSColors.gray }}>
                                            <Body style={{ alignItems: 'flex-end' }}>
                                                <Text style={{ color: 'white' }}>{item.message}</Text>
                                            </Body>
                                        </CardItem>
                                        :
                                        <CardItem style={{ backgroundColor: iOSColors.lightGray }}>
                                            <Body>
                                                <Text>{item.message}</Text>
                                            </Body>
                                        </CardItem>
                                }
                            </Card>
                        }
                    />

                </Content>
                <Footer>
                    <Left>
                        <Form>
                            <Item style={{ width: width * 0.85, marginLeft: 10, marginTop: 10 }}>
                                <Input value={this.state.messageText} onChangeText={(messageText) => { this.setState({ messageText }) }} placeholder='Mesajınız..' style={{ color: 'white' }} placeholderTextColor='lightgray' underlineColorAndroid='transparent' />
                            </Item>
                        </Form>
                    </Left>
                    <Right>
                        <Button
                            onPress={() => {this.props.messageSend(this.props.chatid, this.state.messageText, this.props.userid); this.state.messageText = ''; }}
                            iconRight transparent>
                            <Icon name='send' />
                        </Button>
                    </Right>
                </Footer>
            </Container>
        )
    }
}

const mapStatsToProps = ({ chatResponse, authResponse }) => {
    return { loading: chatResponse.loading, userid: authResponse.user.id, chatid: chatResponse.chatid, messages: chatResponse.messages }
}
export default connect(mapStatsToProps, { messageSend, logoutChat })(Chat)