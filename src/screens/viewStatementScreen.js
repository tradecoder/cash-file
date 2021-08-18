import React, { useState, useEffect } from 'react';
import { ThemeProvider, Text, Input, Button } from 'react-native-elements';
import { TouchableOpacity, FlatList } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { firebase } from '../firebase/config';



export default function ViewStatementScreen() {
    const uid = firebase.auth().currentUser.uid;
    const [accountData, setAccountData] = useState([]);
    const [accountList, setAccountList] = useState([]);

    const currentUserProfile = firebase.firestore().collection("users").doc(uid);


    // display existing account list
    useEffect(() => {
        currentUserProfile.get()
            .then((doc) => {
                const accounts = doc.data().accountList;
                setAccountList([...accounts]);
            })
            .catch((err) => { alert("Error loading account list!") })
    }, []);

    // Generate statement

    function generateStatement(e){
        currentUserProfile.collection(e).get()
        .then((snapshot)=>{
            let contents = [];
            snapshot.forEach((doc)=>{
                let data = doc.data();
                
                // retrieve account data and update accountData state.
                // we will view data from the accountData
            
                if(data.cashIn>0){
                    contents.push({
                        Date: data.createdAt.toDate().toLocaleDateString(),
                        Received: data.cashIn,
                        From: data.customerAccount,
                    })
                } else if(data.cashOut>0){
                    contents.push({
                        Date:data.createdAt.toDate().toLocaleDateString(),
                        Sent:data.cashOut,
                        To:data.customerAccount
                    })
                }
                else{
                    return;
                }                
                
            })
            setAccountData(contents);
            console.log(accountData)
        })
        .catch((err)=>err)
    }


    // Generate account list for FlatList

    const showAccounts = (e) => {
        return (
            <TouchableOpacity onPress={() => generateStatement(e.item)}>
                <Text>{`${e.index + 1}. Account: ${e.item}`}</Text>
            </TouchableOpacity>
        )
    }

    

    return (
        <ThemeProvider>
            <Text h4>Select an account</Text>
            <Text style={{ paddingLeft: 15, paddingTop: 0 }}>
                <FlatList data={accountList} renderItem={showAccounts} keyExtractor={(e, i) => i.toString()} />
            </Text>
        </ThemeProvider>
    )
}