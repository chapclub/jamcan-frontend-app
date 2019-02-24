import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RoomCreationScreen from '../screens/RoomCreationScreen'
import RoomCodeScreen from '../screens/RoomCodeScreen'
import RoomScreen from '../screens/RoomScreen'
import CheckAuthScreen from '../screens/CheckAuthScreen'

const NoRoomStack = createSwitchNavigator({
  Home: HomeScreen,
  RoomCreation: RoomCreationScreen,
  RoomCode: RoomCodeScreen
});

const RoomStack = createStackNavigator({
  Room: RoomScreen
})

export default createSwitchNavigator({
    CheckAuth: CheckAuthScreen,
    NoRoom: NoRoomStack,
    Room: RoomStack
  }, {
    initialRouteName: "CheckAuth"
  }
)