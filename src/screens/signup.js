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
  const [preventFirebase, setPreventFirebase] = useState(true);

  function onChangeFirstName(e){
    setFirstName(e.replace(/[^A-Za-z]/g, ''));
   }
  function onChangeLastName(e){
    setLastName(e.replace(/[^A-Za-z]/g, '')); 
  }
  function onChangeEmail(e){
    setEmail(e);   
  }
  function onChangeMobile(e){    
    setMobile(e.replace(/[^0-9]/g, ''));  
  }
  function onChangePassword(e){
    setPassword(e);
  }

  // validate user input data
  function userDataValidation(){

    let invalidData =[];
    if(firstName.length<2){
      invalidData.push("Invalid first name")
      setPreventFirebase(true)     
    }
    if(lastName.length<2){
      invalidData.push("Invalid last name")     
      setPreventFirebase(true)
    }

    const gmailRegex = /.....@gmail.com/;
    const mailValid = gmailRegex.test(email);
    if(!mailValid){
      invalidData.push("Invalid gmail address")      
      setPreventFirebase(true)
    }

    const mobileRegex = /01[3|4|5|6|7|8|9]......../;
    const mobileValid = mobileRegex.test(mobile);
    if(!mobileValid || mobile.length !==11){
      invalidData.push("Invalid mobile number")     
      setPreventFirebase(true)
    }
    
    const hasCapital = (/[A-Z]/).test(password);
    const hasSmall = (/[a-z]/).test(password);
    const hasNumber = (/[0-9]/).test(password);
    if(password.length<8 || !hasCapital || !hasSmall || !hasNumber ){
      invalidData.push("Use password longer than 8, combining capital and small letters and numbers")      
      setPreventFirebase(true)
    }
    setErrorList(invalidData);
    if(invalidData.length == 0){
      setPreventFirebase(false);
    }
  }

  function userDataCheckPoint(){  
    return (errorList.map((e,i)=>{
      return(<Text key={i} style={{color:"red"}}>{i+1}. {e}.{"\n"}</Text>)
    }))
  } 

  function onPressSignup(e){
    userDataValidation();
    if(firstName!="" || lastName !="" || mobile !="" || email !="" || password !=""){
      
    if(preventFirebase){
      alert("Failed! Please provide correct information.")
    } else{
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

    }else{
      alert("Please provide all the information. ")
    }
  } 

  return(
    <ThemeProvider>
      <Text h2>Please Signup</Text>
      <Text>{userDataCheckPoint()}</Text>
      <Input placeholder='First name' value={firstName} onChangeText={onChangeFirstName} />
      <Input placeholder='Last name' value={lastName} onChangeText={onChangeLastName} />
      <Input placeholder='Gmail address' onChangeText={onChangeEmail} leftIcon={{ type: 'font-awesome', name:'envelope' }}/>
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