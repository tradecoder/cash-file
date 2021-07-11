import React, {useState} from 'react';
import {ThemeProvider, Text, Input, Button } from 'react-native-elements';

export default function AddAccountScreen(){
    const [mobileAccount, setMobileAccount] = useState("");   
    const [accountType, setAccountType] = useState("");
   
  
    function onPressAddAccount(e){
        e.preventDefault();

    } 
    
    return(
        <ThemeProvider>
            <Text h2>Add an account</Text>
            <Input placeholder="Account Type / service name" value={accountType} onChangeText={(e)=>setAccountType(e)}/>
            <Input placeholder="Account/Mobile number" value={mobileAccount} onChangeText={(e)=>setMobileAccount(e)}/>                 
            <Button title ="Add now" onPress={onPressAddAccount}/>           
        </ThemeProvider>
    )
}

const theme = {
    Button: {
        raised: true,
        buttonStyle: {
          height: 60
        },
        titleStyle: {
          fontSize: 30
        }
      }
}