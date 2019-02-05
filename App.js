import React from 'react';
import Route from './src/routes'
window.navigator.userAgent = 'react-native';
import io from 'socket.io-client/dist/socket.io';
import './ReactotronConfig';

export default class App extends React.Component {

  constructor(props){
      super(props);
  }

  render() {
    return (
      <Route />
    );
  }
}
