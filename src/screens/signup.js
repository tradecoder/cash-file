import React from 'react';
import {ThemeProvider, Text, Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Signup(){
  return(
    <ThemeProvider>
      <Text h2>Please Signup</Text>
      <Input placeholder='Name' leftIcon={{type:'font-awesome', name:'user'}}/>
      <Input placeholder='Email Address' leftIcon={{ type: 'font-awesome', name:'envelope' }}/>
      <Input placeholder='Password' secureTextEntry={true} leftIcon={{ type: 'font-awesome', name:'lock'}}/>  
      <Button title="Submit"/>
    </ThemeProvider>
    
  )
}