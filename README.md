# React Native (Expo) and Firebase App
A simple cash management android app built with expo and firebase


## Starting the project

1. Initialize the app using expo 

```powershell
expo init cash-file
```

## Add Styles
We will style our app with `native-base`. For documentation visit [NativeBase.io](https://nativebase.io/)
1. Install native-base

```powershell
npm install native-base --save
```
2. Install expo font
 
```powershell
expo install expo-font
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
* Rremember, we need to replace the `firebaseConfig={}` data. To get the valid data follow the below steps now

## Register an app with firebase and configure
1. Signin on the  Firebase Console [https://console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project (you also can use your exising project) - click on `+ Add Project`
3. After creating it, the Project Overview screen, click on `</>` `web`  to register an app
4. Give a name to your app, click on `Register app` and complete it
5. Now you will get the `firebaseConfig` data in the app console, there are two options, `CDN` and `Config`, select config and copy the full code like 

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

6. Then paste/replace the code to the `config.js` for the `const firebaseConfig={}`

## Create components
1. Create a folder named `components` inside the `src` folder
1. Create a file named `signup.component.js` inside the `components` folder
2. Add the below code to `signup.component.js`

```javascript
import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

export default function Signup(){


    return(
        <div>
        </div>
    )
}

```



