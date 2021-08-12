import React, {useState, useEffect} from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import {ThemeProvider, Text, Input, Button } from 'react-native-elements';
import { firebase } from '../firebase/config';


export default function SendMoneyScreen(){
    const uid = firebase.auth().currentUser.uid;
    
    const [customerAccount, setCustomerAccount] = useState("");
    const [amount, setAmount] =  useState("");   
    const [myAccount, setMyAccount] = useState("");
    const [accountList, setAccountList] = useState([]);

    const currentUserProfile = firebase.firestore().collection("users").doc(uid);    

    function onChangeAmount(e){
        setAmount(e.replace(/[^0-9]/g,''))
    }

     function onPressSendMoney(e){
        e.preventDefault();
        const accountData = {
          uid,
          myAccount,
          customerAccount,
          cashIn:0,          
          cashOut:parseInt(amount),         
          refId:"",
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

       currentUserProfile.collection(myAccount).add(accountData)
       .then((doc)=>{currentUserProfile.collection(myAccount).doc(doc.id).set({refId:doc.id}, {merge:true});
       alert(`Tk ${amount} sent to ${customerAccount} from ${myAccount}.`);
       setAmount("");
       setMyAccount("");
       setCustomerAccount("");
        
      })
       .catch((e)=>{alert(`Sorry! Operation failed! Pls try again later.`)})
    } 



    function onChangeAmount(e){
        setAmount(e.replace(/[^0-9]/g,''))
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
            <Text h2>Send money</Text>
            <Input placeholder = "Amount" keyboardType="numeric" value={amount} onChangeText={onChangeAmount}/>      
            <Input placeholder="Customer mobile / to" value={customerAccount} onChangeText={(e)=>setCustomerAccount(e)}/>            
            <Input placeholder="My Account / from" value={myAccount} onChangeText={(e)=>setMyAccount(e)}/>
            <Button title ="Submit" onPress={onPressSendMoney}/>
            
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