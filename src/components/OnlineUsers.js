import React, { Component } from 'react';
import { View, Text, Dimensions, NativeModules } from 'react-native';
import { Container, Content, List, ListItem, Button } from 'native-base';
// window.navigator.userAgent = 'ReactNative';
import io from 'react-native-socketio';
const SocketIO = require('react-native-socketio');


// const io = require('socket.io-client/dist/socket.io');

const connectionConfig = {
    jsonp: false,
    reconnection: false,
    reconnectionDelay: 100,
    reconnectionAttempts: 100000,
};

const height = Dimensions.get('window').height;
class OnlineUsers extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.navigation.state.params.id
        };

        console.log(SocketIO);

        this.socket = new SocketIO('http://node.aait.sa:3000?id=' + this.state.id, {});
        this.socket.connect();
    }

    componentDidMount(){
        // this.socket.on('connect', function(data) {
        //     console.log('Server emitted ping: ' + data);
        // });
        //
        // this.socket.on('test_socket', function(data) {
        //     console.log('Server emitted ping: ' + data);
        // });
    }

    onEmit(){
        // console.log(this.socket.emit('newMessage', { name: 'shams' }));
        // this.socket.emit('newMessage', { name: 'shams' })
    }

    render(){
        return(
            <Container style={{ backgroundColor: '#191f32' }}>
                <Content style={{ flex: 1 }}>
                    <View style={{ alignItems: 'center', height: height, padding: 20 }}>
                        <List style={{ width: '100%' }}>
                            <ListItem onPress={() => this.props.navigation.navigate('inbox', { f_id: this.state.id, t_id: 251, socket: this.socket })}>
                                <Text style={{ color: '#fff' }}>shams</Text>
                            </ListItem>
                            <ListItem onPress={() => this.props.navigation.navigate('inbox')}>
                                <Text style={{ color: '#fff' }}>taha</Text>
                            </ListItem>
                            <ListItem onPress={() => this.props.navigation.navigate('inbox')}>
                                <Text style={{ color: '#fff' }}>memy</Text>
                            </ListItem>
                        </List>

                        <Button onPress={() => this.onEmit()}><Text>click</Text></Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default OnlineUsers;