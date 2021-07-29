import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import { ThemeProvider, Text, Input, Button } from 'react-native-elements';
import { firebase } from '../firebase/config';


export default function AddAccountScreen(props) {
  const uid = firebase.auth().currentUser.uid;

  const [mobileAccount, setMobileAccount] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountList, setAccountList] = useState([]);

  const accountRef = firebase.firestore().collection('users').doc(uid).collection(`${mobileAccount}-${accountType}`);
  const currentUserProfile = firebase.firestore().collection('users').doc(uid);


  // display existing account list
  useEffect(()=>{
    currentUserProfile.get()
    .then((doc)=>{
      const accounts = doc.data().accountList;
      setAccountList([...accounts]);     
    })
    .catch((err)=>err)
  }, []);
 
  async function onPressAddAccount(e) {
    e.preventDefault();
    const accountData = {
      uid,
      mobileAccount,
      accountType,
      cashIn: 0,
      cashInFrom:"",
      cashOut: 0,
      cashOutTo:"",
      accountName:`${mobileAccount}-${accountType}`,
      refId:""
    };


    // check if the collection already exist
    const snapshot = await accountRef.get();
     if(mobileAccount.length <11 || accountType.length<4){
      alert("Please provide required information")
    } else if(snapshot.size>0){
      alert("Account already exist")
    } else{
      accountRef.add(accountData)
      .then(doc => {
        // add doc id to the document as a field
        accountRef.doc(doc.id).set({refId:doc.id}, {merge:true});

        // add every mobileAccount name created by the current user 
        // in the accountList array field in the main user profile-document
        currentUserProfile.set({accountList: firebase.firestore.FieldValue.arrayUnion(`${mobileAccount}-${accountType}`)}, {merge:true});

        alert(`Congratulations! ${mobileAccount}-${accountType} account registered successfully.`);
        
      })
      .catch(err => err) 
    }

  }
  

  const showAccounts =(e)=>{
    return(
    <TouchableOpacity>
      <Text>{`${e.index+1}. Account: ${e.item}`}</Text>
    </TouchableOpacity>
    )
  }

  
  return (
    <ThemeProvider>      
      <Text h4>Add an account</Text>
      <Input placeholder="Account Type / service name" value={accountType} onChangeText={(e) => setAccountType(e)} />
      <Input placeholder="Account/Mobile number" value={mobileAccount} onChangeText={(e) => setMobileAccount(e)} />
      <Button title="Add now" onPress={onPressAddAccount} />
      <Text style={{color:"red", padding:15, fontSize:20}}>Your existing account list</Text>

      <Text style={{paddingLeft:15, paddingTop:0}}>        
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