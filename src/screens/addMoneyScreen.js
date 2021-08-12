import React, {useEffect, useState} from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import {ThemeProvider, Text, Input, Button } from 'react-native-elements';
import { firebase } from '../firebase/config';


export default function AddMoneyScreen(){
    const uid = firebase.auth().currentUser.uid;

    const [myAccount, setMyAccount] = useState("");
    const [amount, setAmount] =  useState("");
    const [customerAccount, setCustomerAccount] = useState("");
    const [accountList, setAccountList] = useState([]);

    const currentUserProfile = firebase.firestore().collection("users").doc(uid);    

    function onChangeAmount(e){
        setAmount(e.replace(/[^0-9]/g,''))
    }

     function onPressAddMoney(e){
        e.preventDefault();
        const accountData = {
          uid,
          myAccount,
          customerAccount,
          cashIn: parseInt(amount),          
          cashOut: 0,          
          refId:"",
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

       currentUserProfile.collection(myAccount).add(accountData)
       .then((doc)=>{currentUserProfile.collection(myAccount).doc(doc.id).set({refId:doc.id}, {merge:true});
       alert(`Tk ${amount} added to ${myAccount} from ${customerAccount}.`);
       setAmount("");
       setMyAccount("");
       setCustomerAccount("");
        
      })
       .catch((e)=>{alert(`Sorry! Operation failed! Pls try again later.`)})
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

  const showAccounts =(e)=>{
    return(
    <TouchableOpacity onPress={()=>setMyAccount(e.item)}>
      <Text>{`${e.index+1}. Account: ${e.item}`}</Text>
    </TouchableOpacity>
    )
  }



  

    return(
        <ThemeProvider>
            <Text h4 style={{padding:15}}>Add money</Text>            
            <Input placeholder = "Amount" keyboardType="numeric" value={amount} onChangeText={onChangeAmount}/>
            <Input placeholder="Customer mobile / from" value={customerAccount} onChangeText={(e)=>setCustomerAccount(e)}/>
            <Input placeholder="My Account / to" value={myAccount} onChangeText={(e)=>setMyAccount(e)}/>
            <Button containerStyle={{margin:15}} title ={`Add ${amount>0?amount:0} Taka`} onPress={onPressAddMoney}/>
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