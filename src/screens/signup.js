import React, {useState} from 'react';
import {ThemeProvider, Text, Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity, Linking} from 'react-native';
import {firebase} from '../firebase/config';


export default function Signup({nav}){
  const [firstName, setFirstName]= useState("");
  const [lastName, setLastName] =  useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  function onChangeFirstName(e){
    setFirstName(e)
  }
  function onChangeLastName(e){
    setLastName(e)
  }
  function onChangeEmail(e){
    setEmail(e)
  }
  function onChangeMobile(e){
    setMobile(e)
  }
  function onChangePassword(e){
    setPassword(e)
  }

  function onPressSignup(e){
    firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(response=>{
      const uid = response.user.uid;
      const data = {_id:uid, firstName, lastName, email, mobile};

      const usersRef= firebase.firestore().collection('users');
      usersRef.doc(uid)
      .set(data)
      .then(()=>alert("success"))
      .catch(err=>alert(err))
    })
    .catch(err=>alert(err))
  }
  
  return(
    <ThemeProvider>
      <Text h2>Please Signup</Text>
      <Input placeholder='First name' onChangeText={onChangeFirstName} />
      <Input placeholder='Last name' onChangeText={onChangeLastName} />
      <Input placeholder='Email address' onChangeText={onChangeEmail} leftIcon={{ type: 'font-awesome', name:'envelope' }}/>
      <Input placeholder='Mobile number' onChangeText={onChangeMobile} leftIcon={{ type: 'font-awesome', name:'phone' }}/>
      <Input placeholder='Password' onChangeText={onChangePassword} secureTextEntry={true} leftIcon={{ type: 'font-awesome', name:'lock'}}/>  
      <Button title="Signup" onPress={onPressSignup}/>
      <Text>
        <Text> Have an account?</Text>
        <TouchableOpacity onPress={()=>Linking.openURL("https://google.com/")}>
          <Text style={{color:"blue"}}> Login here</Text>
        </TouchableOpacity>                
      </Text>      
    </ThemeProvider>    
  )
}