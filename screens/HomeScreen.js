import React from 'react';
import { AuthSession, LinearGradient } from 'expo';

const SPOTIFY_APP_ID = "5b65b983663c4e3bab1b85c4cb9bd5f7"
const SCOPES = 'user-read-private user-read-email'

import {
  AsyncStorage,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Button } from 'react-native-elements'

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.banner}>
          <LinearGradient
            colors={['#0cebeb', '#29ffc6']}
            style={styles.gradientBackground}>
            <Text style={styles.title}>JamStack</Text>
          </LinearGradient>
        </View>
        <View style={styles.content}>
          <Text style={styles.subTitle}>Quick, pass the aux!</Text>
          <View>
            <Text>Create a new room by logging in with Spotify</Text>
            <Button 
              title="Login with Spotify"
              containerStyle={styles.loginButton}
              onPress={this._handleLogin}/>
          </View>
        </View>
      </View>
    );
  }

  _handleLogin = async () => {
    let redirectUrl = AuthSession.getRedirectUrl()
    let { params: { access_token } } = await AuthSession.startAsync({
      authUrl:
        `https://accounts.spotify.com/authorize?` +
        `&client_id=${SPOTIFY_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
        `&scope=user-read-email&response_type=token`
    })

    AsyncStorage.setItem("accessToken", access_token)
    
    let me_req = await fetch(`https://api.spotify.com/v1/me`, {
      headers: {
        "Authorization": `Bearer ${access_token}`
      }
    })

    const { id } = await me_req.json()

    AsyncStorage.setItem("userID", id)

    const { navigate } = this.props.navigation

    navigate("RoomCreation", { userID: id })
  }
}

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  loginButton: {
    borderRadius: 100
  },
  banner: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  gradientBackground: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  title: {
    fontSize: 40,
    padding: 20,
    color: 'white'
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
    color: 'red'
  },
  textBox: {
    alignItems: 'center'
  },
  subTitle: {
    fontSize: 25
  }
});
