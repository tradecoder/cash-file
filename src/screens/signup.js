import React from 'react';
import {ThemeProvider, Header, Text, Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Signup(){
  return(
    <ThemeProvider>
      <Input placeholder='Name' leftIcon={{type:'font-awesome', name:'user'}}/>
      <Input placeholder='Email Address' leftIcon={{ type: 'font-awesome', name:'envelope' }}/>    
    </ThemeProvider>
    
  )
}