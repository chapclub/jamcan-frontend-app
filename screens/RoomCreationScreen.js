import React from 'react';

import { View, Text, Dimensions, StyleSheet, AsyncStorage } from 'react-native'
import { Input, Button } from 'react-native-elements'

const { width, height } = Dimensions.get('window')

class RoomCreationScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {room: "", userID: ""}
  }

  async componentDidMount() {
    let userID = await AsyncStorage.getItem('userID')
    this.setState((prevState) => ({
      ...prevState,
      userID
    }))
  }

  _handleCreateRoom = () => {
    fetch(`http://localhost:8000/api/parties`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.room,
        owner_id: this.state.userID
      }),
    })
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