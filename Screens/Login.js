
import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';


export default function Login({navigation}) {
   
    return (
        <View style={styles.container}>
        <Input
             placeholder='Username'
             label="Your Email Address"
             labelStyle={{color:'black'}}
             leftIcon={{type:'material', name:"person"}}
        />

        <Input
            placeholder='Password'
            label="Password"    
            labelStyle={{color:'black'}}   
            leftIcon={{ type: 'material', name: 'lock' }}
        />
        <Button title="Login " 
        onPress={()=> navigation.navigate('Home')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3fb0ac',
      alignItems: 'center',
      justifyContent: 'center'
    }
});