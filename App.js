import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {ThemeProvider, Header,  Text} from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Signup, Login, Home} from './src/screens/screensLib';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



const Stack = createStackNavigator();
export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
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
        <Signup/>
        <Login/>
        <Home/>
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