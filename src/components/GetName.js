import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button } from 'native-base';

const height = Dimensions.get('window').height;
class GetName extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            phone: ''
        };
    }

    static navigationOptions = {
        header: null,
    };

    navigationToOnlineUsers(){
        this.props.navigation.navigate('onlineUsers', { id: this.state.username, phone: this.state.phone });
    }

    render(){
        return(
            <Container style={{ backgroundColor: '#191f32' }}>
                <Content style={{ flex: 1 }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', height: height, padding: 20 }}>
                        <Form style={{ width: '100%', alignItems: 'center' }}>
                            <Item floatingLabel>
                                <Label style={{ color: '#4b5b89', marginBottom: 3 }}>Username</Label>
                                <Input onChangeText={(username) => this.setState({ username })} style={{ color: '#fff' }}/>
                            </Item>

                            <Item floatingLabel>
                                <Label style={{ color: '#4b5b89', marginBottom: 3 }}>Phone</Label>
                                <Input onChangeText={(phone) => this.setState({ phone })} style={{ color: '#fff' }}/>
                            </Item>

                            <Button onPress={() => this.navigationToOnlineUsers()} style={{ backgroundColor: '#44a8ff', alignSelf: 'center', marginTop: 20, width: 60, justifyContent: 'center' }}>
                                <Text style={{ color: '#fff' }}>NEXT</Text>
                            </Button>
                        </Form>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default GetName;