import React from 'react'

import { Text, View, AsyncStorage, Button } from 'react-native'

const RoomCodeScreen = ({ navigation }) => {
  const _handleChangeScreen = () => {}
  const { navigate } = navigation 

  const roomID = navigation.getParam("roomID")

  return(
    <View>
      <Text>Your room code is:</Text>
      <Text>{ roomID }</Text>
      <Button
        title="Go to your room!"
        onPress={() => navigate("Room")}
      />
    </View>
  )
}

export default RoomCodeScreen