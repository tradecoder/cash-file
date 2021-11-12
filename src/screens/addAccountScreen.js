import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { firebase } from '../firebase/config';
import {NativeBaseProvider, VStack, HStack, Box, Heading, Text, Button, Input, Icon, FlatList} from 'native-base';


export default function AddAccountScreen(props) {
  const uid = firebase.auth().currentUser.uid;

  const [mobileAccount, setMobileAccount] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountList, setAccountList] = useState([]);
  const accountRef = firebase.firestore().collection('users').doc(uid).collection(`${mobileAccount}-${accountType}`);
  const currentUserProfile = firebase.firestore().collection('users').doc(uid);


  // display existing account list one time
  useEffect(()=>{   
    currentUserProfile.get()
    .then((doc)=>{
      const accounts = doc.data().accountList;
      setAccountList([...accounts]);
    })
    .catch((err)=>{alert(`Sorry! System failed! Pls try again later.`)})
  },[]); // run useEffect only once to prevent memory leak error
 
  async function onPressAddAccount(e) {
    e.preventDefault();
    const accountData = {
      uid,
      myAccount:`${mobileAccount}-${accountType}`,
      customerAccount:"",
      cashIn: 0,      
      cashOut: 0,      
      refId:"",
      balance:0,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
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
        setMobileAccount("");
        setAccountType("");
        
        //////////////////////////////////////////
        // this code run manually again to prevent memory leak error in useEffect for dependancy array
        // showing update account list on submit info but without from useEffect
        currentUserProfile.get()
        .then((doc)=>{
          const accounts = doc.data().accountList;
          setAccountList([...accounts]);
        })
        .catch((err)=>{alert(`Sorry! System failed! Pls try again later.`)})
        //////////////////////////////////////////


      })
      .catch((err) => {alert(`Sorry! Operation failed. Pls try again later.`)}) 
    }

  }
  
// Show the user owned accounts
  const showAccounts =(e)=>{
    return(
    <TouchableOpacity>
      <Box p={'1'}>{`${e.index+1}. Account: ${e.item}`}</Box>
    </TouchableOpacity>
    )
  }

  
  return (
    <NativeBaseProvider>
      <VStack p={5} space={3}>
      <Heading size={'md'} mb={5}>Add an account</Heading>
      <Box>
      <Text>Account type / service name</Text>
      <Input size={'lg'} placeholder="Account Type / service name" value={accountType} onChangeText={(e) => setAccountType(e)} />
      </Box>
      <Box>
      <Text>Account / Mobile number</Text>
      <Input size={'lg'} keyboardType={'numeric'} placeholder="Account/Mobile number" value={mobileAccount} onChangeText={(e) => setMobileAccount(e)} />
      </Box>
      <Button size={'lg'} onPress={onPressAddAccount} _text={{fontSize:20}} mt={'5'} colorScheme={'yellow'}>Add now </Button>
      <Heading size={'sm'} my={2}>Your existing account list</Heading>

      <Box>  
        <FlatList data={accountList} renderItem={showAccounts} keyExtractor={(e, i)=>i.toString()}/>
      </Box>
      </VStack>
    </NativeBaseProvider>
  )
}