import React from 'react';
import {ThemeProvider, Header,  Text} from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Signup} from './src/screens/screens';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

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
      <KeyboardAwareScrollView>
        <Text>Our app is ready to start with your code</Text>
        <Signup/>
      </KeyboardAwareScrollView>
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