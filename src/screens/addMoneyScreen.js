import React, {useState} from 'react';
import {ThemeProvider, Text, Input, Button } from 'react-native-elements';
import { firebase } from '../firebase/config';


export default function AddMoneyScreen(){
    const uid = firebase.auth().currentUser.uid;
    
    const [mobileAccount, setMobileAccount] = useState("");
    const [amount, setAmount] =  useState();
    const [accountType, setAccountType] = useState("");
    const [senderAccount, setSenderAccount] = useState("");
    function onChangeAmount(e){
        setAmount(e.replace(/[^0-9]/g,''))
    }
    function onPressAddMoney(e){
        e.preventDefault();

    } 

    return(
        <ThemeProvider>
            <Text h2>Add money</Text>
            <Input placeholder="Account Type / service name" value={accountType} onChangeText={(e)=>setAccountType(e)}/>
            <Input placeholder="Mobile Account" value={mobileAccount} onChangeText={(e)=>setMobileAccount(e)}/>
            <Input placeholder = "Amount" keyboardType="numeric" value={amount} onChangeText={onChangeAmount}/>
            <Input placeholder="Sender Account / From" value={senderAccount} onChangeText={(e)=>setSenderAccount(e)}/>
            <Button title ="Add now" onPress={onPressAddMoney}/>
           
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