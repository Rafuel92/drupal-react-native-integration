import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import axios from 'axios';
import { Header, Button, Spinner, Card, CardSection } from './components/common';
import LoginForm from './components/LoginForm';
import {
  DRUPAL_URL
} from './drupalSetup.js';

class App extends Component {
  state = { loggedIn: null, logoutToken: '58MIx5tB_bQrFC5GMIXmdETYB-qz28AA-Qpo-Kj2DDo' };

  componentWillMount() {
       this.setState({ loggedIn: false });
  }

  performLogout(){
    axios.defaults.withCredentials = true;
    var self = this;
    // logout
    axios.post(
      DRUPAL_URL + "/user/logout?_format=json&token=" + this.state.logoutToken, {}, {
        headers: {
          'Content-Type': 'application/hal+json'
        },
        withCredentials: true
      }
    ).
    then(function (response) {
      self.setState({ loggedIn: false });
    }).catch(function(response){
      self.setState({loggedIn: false});
    });
  }

  renderContent(){
    switch(this.state.loggedIn){
      case true:
        return (
          <Card>
            <CardSection>
              <Button onPress={() => this.performLogout()}>
                Log Out
              </Button>
            </CardSection>
          </Card>
        );
      case false:
        return <LoginForm container={this} />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    )
  }
}

export default App;
