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
6. Install Keyboard Aware Scrollview. This will help to display the input field up to the keyboard when typing 
```node
npm install react-native-keyboard-aware-scrollview
```

7. Now replace all your codes in `App.js` with the following codes for this time only

```javascript
import React from 'react';
import {ThemeProvider, Header,  Text} from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
// we will keep our header still but scroll the body only if necessary 
// so, we will add KeyboardAwareScrollView outside the Header
// to make it available for all components/screens we will add it only on App.js file
// which will contain/render all other screens. Hence, we do not need to add it on every screen.
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
    },
    rightComponent:{size:30}
  },
  Button: {raised: true},
  Text:{
    style:{fontSize:22}
  }
};
```

5. Run your app and see if it's ok. You must have installed latest android emulator (Android Virtual Device- AVD) on your system. If you don't have, see the instruction [here]("#")
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

## Create Screen components
1. Create a folder named `screens` inside the `src` folder
2. Create a file named `signup.js` inside the `screens` folder
3. Add the below code to `signup.js`

```javascript
import React, {useState} from 'react';
import {ThemeProvider, Text, Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native';
import {firebase} from '../firebase/config';


export default function Signup({nav}){
  const [firstName, setFirstName]= useState("");
  const [lastName, setLastName] =  useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [errorList, setErrorList] =  useState([]);
  const validFirstName = /../.test(firstName);
  const validLastName = /../.test(lastName);
  const validEmail = /.....@gmail.com/.test(email);
  const validMobile = /01[3-9]......../.test(mobile);
  const validPassword =()=> {
    if((/......../).test(password) 
    && (/[A-Z]/).test(password)
    && (/[a-z]/).test(password)
    && (/[0-9]/).test(password)){
      return true;
    } else{
      return false;
    }
    }

    // Check if all data is valid
    const isDataValid = ()=>{
      if(validFirstName && validLastName && validEmail && validMobile && validPassword()){
        return true;
      } else {
        return false
      }
    }
  
    // On change input event handlers 
  function onChangeFirstName(e){
    setFirstName(e.replace(/[^A-Za-z]/g, ''));
   }
  function onChangeLastName(e){
    setLastName(e.replace(/[^A-Za-z]/g, '')); 
  }
  function onChangeEmail(e){
    setEmail(e)
  }
  function onChangeMobile(e){    
    setMobile(e.replace(/[^0-9]/g, ''));  
  }
  function onChangePassword(e){
    setPassword(e);
  }

  // check invalid input data and make a list of them
  function inputDataCheckPoint(){

    let invalidData =[];
    if(!validFirstName){
      invalidData.push("Invalid first name")     
    }
    if(!validLastName){
      invalidData.push("Invalid last name")  
    }
    if(!validEmail){
      invalidData.push("Invalid gmail address") 
    }

    if(!validMobile){
      invalidData.push("Invalid mobile number") 
    }
    if(!validPassword()){
      invalidData.push("Use password longer than 8, combining capital and small letters and numbers")    
    }
    setErrorList(invalidData);
  }

  // Show list of invaid input data if any
  function showInvalidDataList(){  
    return (errorList.map((e,i)=>{
      return(<Text key={i} style={{color:"red"}}>{i+1}. {e}.{"\n"}</Text>)
    }))
  } 

  // Send data to firebase if all information is given
  // if not, send error alert and a list of invalid input

  function onPressSignup(){
    
    //check and send input error if any
    inputDataCheckPoint();

    // send data to firebase if everything is ok
    if(isDataValid()){          
          firebase.auth()
          .createUserWithEmailAndPassword(email, password)
          .then(response=>{
            const uid = response.user.uid;
            const data = {_id:uid, firstName, lastName, email, mobile};
      
            const usersRef= firebase.firestore().collection('users');
            usersRef.doc(uid)
            .set(data)
            .then(()=>{
              alert("success");
              nav.navigate("Home", {user:data})
            })
            .catch(()=>alert("System Error! Please try again later."))
          })
          .catch(()=>alert("Could not connect to server! Please try again later"))
        }else{
          alert("Please provide correct information!")
        }
  } 

  return(
    <ThemeProvider>
      <Text h2>Please Signup</Text>
      <Text>{showInvalidDataList()}</Text>
      <Input placeholder='First name' value={firstName} onChangeText={onChangeFirstName} />
      <Input placeholder='Last name' value={lastName} onChangeText={onChangeLastName} />
      <Input placeholder='Gmail address' onChangeText={onChangeEmail} maxLength={35} leftIcon={{ type: 'font-awesome', name:'envelope' }}/>
      <Input placeholder='Mobile number' value={mobile} keyboardType="number-pad" maxLength={11} onChangeText={onChangeMobile} leftIcon={{ type: 'font-awesome', name:'phone' }}/>
      <Input placeholder='Password' onChangeText={onChangePassword} secureTextEntry={true} leftIcon={{ type: 'font-awesome', name:'lock'}}/>  
      <Button title="Signup" onPress={onPressSignup}/>
      <Text>
        <Text> Have an account?</Text>
        <TouchableOpacity onPress={()=>nav.navigate("Login")}>
          <Text style={{color:"blue"}}> Login here</Text>
        </TouchableOpacity>                
      </Text>      
    </ThemeProvider>  
  )
}
```


