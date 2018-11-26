import React, { Component } from 'react';
import axios from 'axios';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import { DRUPAL_URL } from '../drupalSetup.js';

class LoginForm extends Component {
  state = {email: '', password: '', error: '', loading: false};

  onButtonPress(){
    const { email, password } = this.state;

    this.setState({ error: '', loading: true});
    axios.defaults.withCredentials = true;
    var self = this;
    //Login
    axios.post(
      DRUPAL_URL + "/user/login?_format=json",
      JSON.stringify({
        'name': email,
        'pass': password
    }), {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }).then(function (response) {
      const userData = response.data;
      self.setState({
        email: '',
        password: '',
        loading: false,
        error: '',
      });
      self.props.container.setState({loggedIn: true, logoutToken: response.data.logout_token});
    }).catch(function(response){
      self.props.container.setState({loggedIn: false});
      self.setState({ error: 'Authentication Failed.', loading: false})
    });


  }

  renderButton(){
    if(this.state.loading){
      return <Spinner size="small" />;
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log in
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
           placeholder="user@gmail.com"
           label = "Email"
           value = {this.state.email}
           onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input
           secureTextEntry
           placeholder="password"
           label = "Password"
           value = {this.state.password}
           onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          { this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
