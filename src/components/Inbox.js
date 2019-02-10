import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Container, Content, List, ListItem, Input, Button } from 'native-base';
window.navigator.userAgent = 'react-native';
import io from 'socket.io-client/dist/socket.io';

const height = Dimensions.get('window').height;
class Inbox extends Component{
    constructor(props){
        super(props);
        this.state = {
            msg: '',
            messages: [],
            from: this.props.navigation.state.params.from,
            to: this.props.navigation.state.params.to,
            socket: this.props.navigation.state.params.socket,
            typingStatus: 0,
            isTyping: 0
        };

        this.state.socket.on('receiveMessage', (data) => this.getMessages(data));
        this.state.socket.on('typing', (data) => this.isTyping(data.status));
        this.state.socket.emit('joinRoom', { to: this.state.to, from: this.state.from });
    }

    getMessages(data){
        console.log('this is data', data);
        // this.setState({ messages : data.messages })
    }

    isTyping(status){
        this.setState({ isTyping: status });
    }

    sendMessage(){
        console.log(this.state.from, this.state.to);
        this.setState({ typingStatus: 0 });
        this.state.socket.emit('typing', { typingStatus: 0 });
        this.state.socket.emit('newMessage',
            {
                msg: this.state.msg,
                from: this.state.from,
                to: this.state.to,
            });
        this.setState({ msg: '' });
    }

    setMessage(msg){
        this.setState({ msg, typingStatus: 1 });
        this.state.socket.emit('typing', { typingStatus: 1 });
    }

    render(){
        return(
            <Container style={{ backgroundColor: '#191f32' }}>
                <Content style={{ flex: 1 }}>
                    <View style={{ alignItems: 'center', height: height, padding: 20 }}>
                        <List style={{ width: '100%' }}>
                            {
                                this.state.messages.map(( msg, i ) => {
                                    if (msg != null){
                                        return (
                                            <ListItem key={i}>
                                                <Text style={{ color: '#fff' }}>{ msg }</Text>
                                            </ListItem>
                                        );
                                    }
                                })
                            }
                        </List>
                        <Text>{ this.state.isTyping === 0 ? '' : 'typing ...' }</Text>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <Input onChangeText={(msg) => this.setMessage(msg)} value={ this.state.msg } style={{ color: '#fff' }}/>
                            <Button onPress={() => this.sendMessage()} style={{ backgroundColor: '#44a8ff', alignSelf: 'center', marginTop: 20, width: 60, justifyContent: 'center' }}>
                                <Text style={{ color: '#fff' }}>SEND</Text>
                            </Button>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default Inbox;