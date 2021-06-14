import 'react-native-gesture-handler';
import React, {useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Signup, Login, Home } from './src/screens/screensLib';
import { ThemeProvider, Header } from 'react-native-elements';

const Stack = createStackNavigator();

export default function App() {
const [user, setUser] = useState(null)

  return (
    <SafeAreaProvider>
    <ThemeProvider theme={theme}>
    <Header
        placement="left"
        leftComponent={{ text: 'Cash File', style: { color: '#fff'} }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
  
      <NavigationContainer>
        <Stack.Navigator>
          { user ? (
            <Stack.Screen name="Home">
              {(props) => <Home {...props} userData={user} />}
            </Stack.Screen>
          ) : (
          <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
          </>
          )}        
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
    </SafeAreaProvider>
  );
}

const theme = {
  Header:{
    leftComponent:{size:30},
    centerComponent:{
      style:{fontSize:26}
    },
    rightComponent:{size:30}
  },
  Button: {raised: true},
  Text:{
    style:{fontSize:22}
  }
};