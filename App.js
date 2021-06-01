import React from 'react';
import {ThemeProvider, Header,  Text} from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Signup} from './src/screens/screens';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  return(
    <SafeAreaProvider>
      <ThemeProvider theme={theme}> 
      <Header
        placement="left"
        leftComponent={{ icon: 'menu', color: '#fff'}}
        centerComponent={{ text: 'Cash File', style: { color: '#fff'} }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
      <Text>Our app is ready to start with your code</Text>
      <Signup/>
    </ThemeProvider>
    </SafeAreaProvider>
  ) 
}

const theme = {
  Header:{
    leftComponent:{size:30},
    centerComponent:{
      style:{fontSize:26}
    }
    ,
    rightComponent:{size:30}
  }
  ,
  Button: {raised: true},
  Text:{
    style:{fontSize:22}
  }
};