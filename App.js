import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignupScreen, LoginScreen, HomeScreen, AddMoneyScreen, SendMoneyScreen, ReceiveLoanScreen, GiveLoanScreen, AddAccountScreen } from './src/screens/screensLib';
import { firebase } from './src/firebase/config';

// ignore yellow error 'setting a timer ...'
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);


const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef.doc(user.uid)
          .get()
          .then(doc => {
            const userData = doc.data()         
            setUser(userData);
          })
          .catch(() => {
           setLoading(false)
          });
      } else {
       setLoading(false)
      }
    });
  }, []);
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user?(
          <>
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="AddMoney" component={AddMoneyScreen} />
          <Stack.Screen name="SendMoney" component={SendMoneyScreen}/>
          <Stack.Screen name="ReceiveLoan" component={ReceiveLoanScreen} />
          <Stack.Screen name="GiveLoan" component={GiveLoanScreen} />
          <Stack.Screen name="Account" component={AddAccountScreen} />
          </>

        ):(
        <>
        <Stack.Screen name="Login" component={LoginScreen} />                
        <Stack.Screen name="Signup" component={SignupScreen} />
        
        </>
         )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
