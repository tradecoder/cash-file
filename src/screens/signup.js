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
  const [errorList, setErrorList] =  useState([]);

  function onChangeFirstName(e){
    setFirstName(e.replace(/[^A-Za-z]/g, ''));
    if(firstName.length<2){
      setErrorList([...errorList, "Invalid first name"])
    }
  }
  function onChangeLastName(e){
    setLastName(e.replace(/[^A-Za-z]/g, ''));
    if(lastName.length<2){
      setErrorList([...errorList, "Invalid last name"])
    }
  }
  function onChangeEmail(e){
    setEmail(e);
    const gmailRegex = /.....@gmail.com/;
    let mailValid = gmailRegex.test(email);
    if(!mailValid){
      setErrorList([...errorList, "Invalid gmail address"])
    }
  }
  function onChangeMobile(e){    
    setMobile(e.replace(/[^0-9]/g, ''));
    if(mobile.length !==11){
      setErrorList([...errorList, "Invalid mobile number"])
    }  
  }
  function onChangePassword(e){
    setPassword(e);     
    if(password.lenth<8){
      setErrorList([...errorList, "Use longer than 8 char password"])
    }
  }

  function userDataCheckPoint(){  
    return (errorList.map(e=>{
      return(<Text>{e}</Text>)
    }))
  }

  function onPressSignup(e){    
    if(errorList.length !==0 || errorList[0] !==""){
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
  }else { 
    return alert("Failed! Please provide correct information.")  
  }
} 
  return(
    <ThemeProvider>
      <Text h2>Please Signup</Text>
      <Text>{userDataCheckPoint()}</Text>
      <Input placeholder='First name' value={firstName} onChangeText={onChangeFirstName} />
      <Input placeholder='Last name' value={lastName} onChangeText={onChangeLastName} />
      <Input placeholder='Email address' onChangeText={onChangeEmail} leftIcon={{ type: 'font-awesome', name:'envelope' }}/>
      <Input placeholder='Mobile number' value={mobile} keyboardType="number-pad" maxLength={11} onChangeText={onChangeMobile} leftIcon={{ type: 'font-awesome', name:'phone' }}/>
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