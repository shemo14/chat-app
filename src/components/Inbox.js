import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Container, Content, List, ListItem, Input, Button } from 'native-base';
window.navigator.userAgent = 'react-native';
import io from 'socket.io-client/dist/socket.io';

const connectionConfig = {
    jsonp: false,
    reconnection: false,
    reconnectionDelay: 100,
    reconnectionAttempts: 100000,
};

const height = Dimensions.get('window').height;
class Inbox extends Component{
    constructor(props){
        super(props);
        this.state = {
            msg: '',
            f_id: this.props.navigation.state.params.f_id,
            t_id: this.props.navigation.state.params.t_id,
            socket: this.props.navigation.state.params.socket
        };
    }

    sendMessage(){

        console.log(this.state.socket.emit('newMessage', { name: 'shams' }));

        this.state.socket.emit('newMessage', {
            f_id: this.state.f_id,
            t_id: this.state.t_id,
            msg: this.state.msg
        })
    }

    render(){
        return(
            <Container style={{ backgroundColor: '#191f32' }}>
                <Content style={{ flex: 1 }}>
                    <View style={{ alignItems: 'center', height: height, padding: 20 }}>


                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <Input onChangeText={(msg) => this.setState({ msg })} style={{ color: '#fff' }}/>
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