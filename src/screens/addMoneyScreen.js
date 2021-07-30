import React, {useEffect, useState} from 'react';
import {ThemeProvider, Text, Input, Button } from 'react-native-elements';
import { firebase } from '../firebase/config';


export default function AddMoneyScreen(){
    const uid = firebase.auth().currentUser.uid;

    const [receiverAccount, setReceiverAccount] = useState("");
    const [amount, setAmount] =  useState();    
    const [senderAccount, setSenderAccount] = useState("");
    const [accountList, setAccountList] = useState([]);

    const currentUserProfile = firebase.firestore().collection("users").doc(uid);

    function onChangeAmount(e){
        setAmount(e.replace(/[^0-9]/g,''))
    }
    function onPressAddMoney(e){
        e.preventDefault();

    } 

 // display existing account list
 useEffect(()=>{
    currentUserProfile.get()
    .then((doc)=>{
      const accounts = doc.data().accountList;
      setAccountList([...accounts]);     
    })
    .catch((err)=>err)
  }, []);

  

    return(
        <ThemeProvider>
            <Text h4 style={{padding:15}}>Add money</Text>
            <Input placeholder="Receiver Account" value={receiverAccount} onChangeText={(e)=>setReceiverAccount(e)}/>
            <Input placeholder = "Amount" keyboardType="numeric" value={amount} onChangeText={onChangeAmount}/>
            <Input placeholder="Sender Account / From" value={senderAccount} onChangeText={(e)=>setSenderAccount(e)}/>
            <Button containerStyle={{margin:15}} title ={`Add ${amount>0?amount:0} Taka`} onPress={onPressAddMoney}/>
           
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