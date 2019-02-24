import React from 'react'
import { View, Text, Button, AsyncStorage } from 'react-native'

import Spotify from 'rn-spotify-sdk'

const RoomScreen = async ({ navigation }) => {
  const _handleCloseRoom = async () => {
    await AsyncStorage.clear()
    
    const { navigate } = navigation

    navigate("NoRoom")
  }

  let hello = await Spotify.getMe()
  console.log(hello)

  return(
    <View>
      <Text>Hello</Text>
      <Button
        title="Close this fucking thing" 
        onPress={() => _handleCloseRoom()}/>
    </View>
  )
}

export default RoomScreen