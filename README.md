# React Native (Expo) and Firebase App
A simple cash management android app built with expo and firebase


## Starting the project

1. Initialize the app using expo. If you don't have expo installed earlier, get it installed first. `npm install --global expo-cli` then run the below code in your terminal

```node
expo init cash-file
```

## Add Styles
We will style our app with `react-native-elements`. For documentation visit [React Native Elements](https://reactnativeelements.com/docs/)
1. Install react-native-elements

```node
npm install react-native-elements
```
2. Install react native vector icons

```node
npm install react-native-vector-icons
```
3. Link the vector icons dependency
```node
npx react-native link react-native-vector-icons
```

4. Install react-native-safe-area-context
```node
npm install react-native-safe-area-context
```

5. Link the safe-area-context
```node
react-native link react-native-safe-area-context
```

6. Now replace all your codes in `App.js` with the following codes for this time only

```javascript
import React from 'react';
import {ThemeProvider, Text} from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return(
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        // we will put our code/components  here
        <Text>Our app is ready to start with your code</Text>

      </ThemeProvider>
    </SafeAreaProvider>
  ) 
}
const theme = {
    Button: {
      raised: true,
      color: 'auto',
      titleStyle:{          
          fontSize:30,
      },
      Input:{
          color:'red',
      }
    },
  };
```

5. Run your app and see if it's ok
```javascript
npm run android
```

## Firebase configuration
1. Add firebase `npm install firebase` or `yarn add firebase`
2. Create a `src` folder in the root directory 
3. Create a `firebase` folder inside the `src` folder
4. Create a `config.js` file in the `firebase` folder
5. Add the following codes to the `config.js` file

```javascript
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };


firebase.initializeApp(firebaseConfig);

export { firebase };

```
* Rremember, we need to replace the `firebaseConfig={}` data. To get the valid data please follow the below steps now

## Register an app with firebase and configure
1. Signin on the  Firebase Console [https://console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project (you also can use your exising project) - click on `+ Add Project`
3. After creating it, the Project Overview screen, click on `</>` `web`  to register an app
4. Give a name to your app, click on `Register app` and complete it
5. Setup `Authentication` from the firebase menubar and for this time select `email and password` option
6. Now you will get the `firebaseConfig` data in the app console, there are two options, `CDN` and `Config`, select config and copy the full code like 

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDcCMBuqjQN_your_project_api_key_here",
  authDomain: "your_app_name.firebaseapp.com",
  databaseURL: "https://your_app_database_url_here.firebaseio.com",
  projectId: "your_project_id_here",
  storageBucket: "your_app_storage_bucket_here.appspot.com",
  messagingSenderId: "your_app_message_sender_id_here",
  appId: "your_app_id_here",
  measurementId: "your_app_measurement_id_here"
};

```
7. Then paste/replace the code to the `config.js` for the `const firebaseConfig={}`

## Create components
1. Create a folder named `screens` inside the `src` folder
2. Create a file named `signup.js` inside the `screens` folder
3. Add the below code to `signup.js`


