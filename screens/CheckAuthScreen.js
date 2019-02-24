import React from 'react'
import { AsyncStorage, View, Text } from 'react-native'

class CheckAuthScreen extends React.Component {
  constructor(props) {
    super(props)
    this._checkRoom()
  }

  _checkRoom = async () => {
    const joinCode = await AsyncStorage.getItem("joinCode")
  
    const { navigate } = this.props.navigation
    navigate(joinCode ? "Room" : "NoRoom")
  }

  render() {
    return(
      <View>
        <Text>Loading</Text>
      </View>
    )
  }
}

export default CheckAuthScreen