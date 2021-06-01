import React from 'react';
import {Text} from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return(
    <SafeAreaProvider>
    // we will put our codes/components  here
    <Text>Our app is ready to start with your code</Text>

    </SafeAreaProvider>
  ) 
}