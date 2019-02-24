import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import HomeStack from './MainTabNavigator';

export default createAppContainer(HomeStack);