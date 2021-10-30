import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignupScreen, LoginScreen, HomeScreen, AddMoneyScreen, SendMoneyScreen, ViewStatementScreen, AddAccountScreen } from './src/screens/screensLib';
import { firebase } from './src/firebase/config';

////////////////////////////////////////
// ignore yellow error 'setting a timer'
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);
// ignore child element key prop
LogBox.ignoreLogs(['Warning']);
/////////////////////////////////////////

const Stack = createStackNavigator();


export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  // if the device has ready-access to firebase because of previous successful login
  // set the user to firebase uid, this will help to load the app directly the home & other action pages 
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
  


  // if the user is logged in, display home screen with other action screens
  // if the user is not logged in, display login screen with signup page navigation
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'orange'}, headerTitleStyle:{color:'black'}, cardStyle:{backgroundColor:'white'} }}>
        {user?(
          <>
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="AddMoney" component={AddMoneyScreen} />
          <Stack.Screen name="SendMoney" component={SendMoneyScreen}/>          
          <Stack.Screen name="ViewStatement" component={ViewStatementScreen} />
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
