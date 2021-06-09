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
  // if not send error alert and a list of invalid input

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
            .then(()=>alert("success"))
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
        <TouchableOpacity onPress={()=>Linking.openURL("https://google.com/")}>
          <Text style={{color:"blue"}}> Login here</Text>
        </TouchableOpacity>                
      </Text>      
    </ThemeProvider>  
  )
}