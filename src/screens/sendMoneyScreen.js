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
    const [balance, setBalance]  =  useState("");
    const validCustomerAccount = /01[3-9]......../.test(customerAccount); // valid only for mobile operators in Bangladesh

    const currentUserProfile = firebase.firestore().collection("users").doc(uid);    

    function onChangeAmount(e){
        setAmount(e.replace(/[^0-9]/g,''))
    }

    function onChangeCustomerAccount(e){
      if(e.length>12){ 
        // for account identifier, one extra digit can be added at the last of mobile number
        // but if it exceeds the extra identifier it will return to 11 digit mobile number
        e = e.slice(0,11)
      }
      setCustomerAccount(e.replace(/[^0-9]/g, ''))
    }


    function currentAccountBalance (e){
        currentUserProfile.collection(myAccount).orderBy("createdAt", "desc").limit(1).get()
        .then((snapshot)=>snapshot.forEach((doc)=>{setBalance(doc.data().balance)}))
        .catch((err)=>console.log(err))
  
      }
      if(myAccount){
        currentAccountBalance();     
      }
  
     function onPressSendMoney(e){
        e.preventDefault();
        const accountData = {
          uid,
          myAccount,
          customerAccount,
          cashIn:0,          
          cashOut:parseInt(amount),
          balance:(balance-parseInt(amount)),
          refId:"",
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        if(myAccount && amount && customerAccount && validCustomerAccount){
       currentUserProfile.collection(myAccount).add(accountData)
       .then((doc)=>{currentUserProfile.collection(myAccount).doc(doc.id).set({refId:doc.id}, {merge:true});
       alert(`Tk ${amount} sent to ${customerAccount} from ${myAccount}.`);
       setAmount("");
       setMyAccount("");
       setCustomerAccount("");
       setBalance("");
        
      })
       .catch((e)=>{alert(`Sorry! Operation failed! Pls try again later.`)})
    }else{
        if(!amount){
          alert("Please enter Amount")
        }else if(!customerAccount){
          alert("Please enter Customer Account")
        } else if(!validCustomerAccount){
          alert("Please enter valid customer mobile")
        }
        else{
          alert("Please select Your Account")
        }
      }

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
        <ThemeProvider theme={theme}>
            <Text h4 style={{padding:15}}>Send money</Text>
            <Input placeholder = "Amount" keyboardType="numeric" value={amount} onChangeText={onChangeAmount}/>      
            <Input placeholder="Customer mobile / to" value={customerAccount} onChangeText={onChangeCustomerAccount}/>            
            <Input placeholder="My Account / from (select from the list)" value={myAccount} onChangeText={(e)=>setMyAccount(e)} disabled/>
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
          height: 40
        },
        titleStyle: {
          fontSize: 20
        }
      },
      Text:{
        style:{
          paddingTop:10
        }
      }
}