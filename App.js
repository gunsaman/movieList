import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native'
import Login from './Screens/Login';
import Home from './Screens/Home';

export default function App() {
const stack = createStackNavigator();
  return(
    
    <NavigationContainer>
      <stack.Navigator initialRouteName="Login">
        <stack.Screen name="Login" component ={Login}/>
        <stack.Screen name="Home" component={Home}/>
      </stack.Navigator>
      
    </NavigationContainer>
  
  )
}

