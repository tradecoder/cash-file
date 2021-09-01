import React, { useState, useEffect } from 'react';
import { ThemeProvider, Text, Input, Button } from 'react-native-elements';
import { TouchableOpacity, FlatList } from 'react-native';
import { firebase } from '../firebase/config';
import { Table, Row, Rows } from 'react-native-table-component';



export default function ViewStatementScreen() {
    const uid = firebase.auth().currentUser.uid;
    const [accountData, setAccountData] = useState([]);
    const [accountList, setAccountList] = useState([]);
    const [statementFor, setStatementFor] = useState("");
    const tableHead = ["Date", "Client", "Received", "Sent"];

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
        setStatementFor(e);
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
                        CashIn: data.cashIn,
                        Client: data.customerAccount                   
                    })
                } else if(data.cashOut>0){
                    contents.push({
                        Date:data.createdAt.toDate().toLocaleDateString(),
                        CashOut:data.cashOut,
                        Client:data.customerAccount                    
                    })
                }
                else{
                    return;
                }                
                
            })
            setAccountData(contents);
           
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
             <Text h4 style={{ paddingLeft: 15, paddingTop: 0 }}>{statementFor}</Text> 
            <Table style={{ paddingLeft: 15, paddingTop: 0 }}>
                <Row data={tableHead} />
                {accountData.map((e)=>{
                    const adata = [];
                    adata.push(e.Date);
                    adata.push(e.Client)
                    adata.push(e.CashIn)
                    adata.push(e.CashOut)
                   
                    return (
                        <Row data={adata}/>
                    )

                })}
            </Table>
               
            <Text h4 style={{ paddingLeft: 15, paddingTop: 0 }}>Select an account</Text>
            <Text style={{ paddingLeft: 15, paddingTop: 0 }}>
                <FlatList data={accountList} renderItem={showAccounts} keyExtractor={(e, i) => i.toString()} />
            </Text>
        </ThemeProvider>
    )
}