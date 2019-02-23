import React from 'react';
import { AuthSession } from 'expo';

const SPOTIFY_APP_ID = "5b65b983663c4e3bab1b85c4cb9bd5f7"
const SCOPES = 'user-read-private user-read-email'

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>JamStack</Text>
        </View>
        <View>
          <Text>Quick, pass the aux!</Text>
          <Text>Create a new room by logging in with Spotify</Text>
          <Button 
            title="Login with Spotify"
            onPress={this._handleLogin}/>
        </View>
      </View>
    );
  }

  _handleLogin = () => {
    let redirectUrl = AuthSession.getRedirectUrl()
    console.log(redirectUrl)
    let result = AuthSession.startAsync({
      authUrl:
        `https://accounts.spotify.com/authorize?response_type=code` +
        `&client_id=${SPOTIFY_APP_ID}` +
        `&scope=${encodeURIComponent(SCOPES)}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`
    })
    this.setState({ result })
  }
  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loginButton: {

  },

});
