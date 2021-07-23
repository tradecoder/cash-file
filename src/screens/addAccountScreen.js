import React, { useState } from 'react';
import { ThemeProvider, Text, Input, Button } from 'react-native-elements';
import { firebase } from '../firebase/config';
const uid = firebase.auth().currentUser.uid;

export default function AddAccountScreen(props) {
  const [mobileAccount, setMobileAccount] = useState("");
  const [accountType, setAccountType] = useState("");

  const accountRef = firebase.firestore().collection(`${mobileAccount}-${accountType}`);
  const uid = props.userData.id;


  function onPressAddAccount(e) {
    e.preventDefault();
    const accountData = {
      uid,
      mobileAccount,
      accountType,
      cashIn: [],
      cashOut: []
    }

    accountRef.add(accountData)
      .then(doc => {
        console.log(doc);
      })
      .catch(err => er)

  }

  return (
    <ThemeProvider>
      <Text h2>Add an account</Text>
      <Input placeholder="Account Type / service name" value={accountType} onChangeText={(e) => setAccountType(e)} />
      <Input placeholder="Account/Mobile number" value={mobileAccount} onChangeText={(e) => setMobileAccount(e)} />
      <Button title="Add now" onPress={onPressAddAccount} />
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