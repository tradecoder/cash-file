import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import { ThemeProvider, Text, Input, Button } from 'react-native-elements';
import { firebase } from '../firebase/config';


export default function AddAccountScreen(props) {
  const uid = firebase.auth().currentUser.uid;

  const [mobileAccount, setMobileAccount] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountList, setAccountList] = useState([0,5])

  const accountRef = firebase.firestore().collection('users').doc(uid).collection(`${mobileAccount}-${accountType}`);
  
 
  async function onPressAddAccount(e) {
    e.preventDefault();
    const accountData = {
      uid,
      mobileAccount,
      accountType,
      cashIn: 0,
      cashOut: 0
    };

    // check if the collection has a
    const snapshot = await accountRef.get();
    
    if(snapshot.size>0){
      alert("Account already exist")
    } else{

      accountRef.add(accountData)
      .then(doc => {
        alert(`Congratulations! ${mobileAccount}-${accountType} account registered successfully.`);
      })
      .catch(err => err) 
    }

  }
  

  const showAccounts =(e)=>{
    return(
    <TouchableOpacity>
      <Text>{`Account-${e.index+1}: ${e.item}`}</Text>
    </TouchableOpacity>
    )
  }

  
  return (
    <ThemeProvider>      
      <Text h2>Add an account</Text>
      <Input placeholder="Account Type / service name" value={accountType} onChangeText={(e) => setAccountType(e)} />
      <Input placeholder="Account/Mobile number" value={mobileAccount} onChangeText={(e) => setMobileAccount(e)} />
      <Button title="Add now" onPress={onPressAddAccount} />

      <Text>
        <FlatList data={accountList} renderItem={showAccounts} keyExtractor={(e, i)=>i.toString()}/>
      </Text>
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