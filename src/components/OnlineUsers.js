import React, { Component } from 'react';
import { View, Text, Dimensions, NativeModules } from 'react-native';
import { Container, Content, List, ListItem, Button } from 'native-base';
window.navigator.userAgent = 'ReactNative';
import SocketIOClient from 'socket.io-client';

const height = Dimensions.get('window').height;
class OnlineUsers extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.navigation.state.params.id,
            phone: this.props.navigation.state.params.phone,
            onlineUsers: []
        };


        this.socket = SocketIOClient('http://node.aait.sa:3000?id=' + this.state.id, {jsonp: false});
        this.socket.on('onlineUsers', (data) => this.setOnlineUser(data));

        this.socket.on('connect', () =>  this.emitJoinUser());
    }

    emitJoinUser(){
        this.socket.emit('joinUser');
        console.log(this.socket.id);
    }


    setOnlineUser(data){
        console.log(data);
        this.setState({ onlineUsers: data.users });
    }

    onEmit(){
        this.socket.emit('newMessage', { name: 'shams' })
    }


    render(){
        return(
            <Container style={{ backgroundColor: '#191f32' }}>
                <Content style={{ flex: 1 }}>
                    <View style={{ alignItems: 'center', height: height, padding: 20 }}>
                        <List style={{ width: '100%' }}>
                            {
                                this.state.onlineUsers.map((user, i) => (
                                    <ListItem key={i} onPress={() => this.props.navigation.navigate('inbox', { from: user.mobile, to: this.state.phone, socket: this.socket })}>
                                        <Text style={{ color: '#fff' }}>{ user.username }</Text>
                                    </ListItem>
                                ))
                            }
                        </List>

                        <Button onPress={() => this.onEmit()}><Text>click</Text></Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default OnlineUsers;