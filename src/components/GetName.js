import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Content } from 'native-base';

class getName extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return(
            <Container style={{ backgroundColor: '' }}>
                <Content style={{ flex: 1 }}></Content>
            </Container>
        );
    }
}