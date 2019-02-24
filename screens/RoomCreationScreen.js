import React from 'react';

import { View, Text, Dimensions, StyleSheet, AsyncStorage } from 'react-native'
import { Input, Button } from 'react-native-elements'

const { width, height } = Dimensions.get('window')

class RoomCreationScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { room: "" }
  }

  _handleCreateRoom = async () => {
    const userID = this.props.navigation.getParam("userID")
    const title = this.state.room

    let req = await fetch('http://localhost:4000/api/parties', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        party: {
          title, 
          owner_id: userID
        }
      })
    })

    let { data: { join_code } } = await req.json()
    
    let _res = await AsyncStorage.multiSet([
      ["joinCode", join_code], 
      ["roomTitle", title]
    ])

    const { navigate } = this.props.navigation
    navigate("RoomCode", { roomID: join_code })
  }

  render() {
    return (
      <View>
        <View>
          <Text>Enter in a room name:</Text>
          <Input 
            containerStyle={styles.roomCreation}
            onChangeText={(text) => this.setState({room: text})}/>
        </View>
        <Button 
          title="Create Room"
          onPress={this._handleCreateRoom}
          style={{ borderRadius: 40, width: width/2}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  roomCreation: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default RoomCreationScreen