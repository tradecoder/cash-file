import React, {useState} from 'react';
import {ThemeProvider, Text, Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity, Linking} from 'react-native';
import {firebase} from '../firebase/config';


export default function Signup({nav}){
  const [firstName, setFirstName]= useState("");
  const [lastName, setLastName] =  useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function onChangeFirstName(e){
    setFirstName(e.target.value)
  }
  function onChangeLastName(e){
    setLastName(e.target.value)
  }
  function onChangeEmail(e){
    setEmail(e.target.value)
  }
  function onChangePassword(e){
    setPassword(e.target.value)
  }

  function onPressSignup(e){
    firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(response=>{
      const uid = response.user.uid;
      const data = {firstName, lastName, email, password};

      const ref= firebase.firestore().collection('users');
      ref.doc(uid)
      .set(data)
      .then(()=>{
        nav.navigate('Home', {user:data})
      })
      .catch(err=>alert(err))

    })
  }
  
  return(
    <ThemeProvider>
      <Text h2>Please Signup</Text>
      <Input placeholder='First name' onChangeText={onChangeFirstName} />
      <Input placeholder='Last name' onChangeText={onChangeLastName} />
      <Input placeholder='Email Address' onChangeText={onChangeEmail} leftIcon={{ type: 'font-awesome', name:'envelope' }}/>
      <Input placeholder='Password' onChangeText={onChangePassword} secureTextEntry={true} leftIcon={{ type: 'font-awesome', name:'lock'}}/>  
      <Button title="Submit"/>
      <Text>
        <Text> Have an account?</Text>
        <TouchableOpacity onPress={()=>Linking.openURL("https://google.com/")}>
          <Text style={{color:"blue"}}> Login here</Text>
        </TouchableOpacity>                
      </Text>      
    </ThemeProvider>    
  )
}