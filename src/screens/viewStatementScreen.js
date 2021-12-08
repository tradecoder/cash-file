import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { firebase } from '../firebase/config';
import { Table, Row} from 'react-native-table-component';
import { NativeBaseProvider, VStack, Box, ScrollView, Heading, Divider } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

////////////////////////////////////////
// ignore yellow error 'Warning Each Child '
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning']);
///////////////////////////////////////


export default function ViewStatementScreen() {
    const uid = firebase.auth().currentUser.uid;
    const [accountData, setAccountData] = useState([]);
    const [accountList, setAccountList] = useState([]);
    const [statementFor, setStatementFor] = useState("");
    const tableHead = ["Date", "Client", "Received", "Sent", "C.Balance"];
 

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
        currentUserProfile.collection(e).orderBy("createdAt", "desc").get()
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
                        Client: data.customerAccount,
                        Balance:data.balance               
                    })
                } 
                 if(data.cashOut>0){
                    contents.push({
                        Date:data.createdAt.toDate().toLocaleDateString(),
                        CashOut:data.cashOut,
                        Client:data.customerAccount,
                        Balance:data.balance
                    })
                }   
            })
            setAccountData(contents);
           
        })
        .catch((err)=>err)
    }


   return (
       
        <NativeBaseProvider>
            <KeyboardAwareScrollView>
            <VStack>
                     
             {accountData.length?(
             <>
             <Heading size={'sm'} p='3'>* Statement for {statementFor} *</Heading> 
             <Divider />
             <Table style={{ paddingLeft: 15, paddingTop: 2 }}>
                 <Row data={tableHead}/>
               {accountData.map((e)=>{
                    const trxdata = [];
                    // trxdata -- transaction data
                    trxdata.push(e.Date)
                    trxdata.push(e.Client)
                    trxdata.push(e.CashIn)
                    trxdata.push(e.CashOut)
                    trxdata.push(e.Balance)
                   
                    return (
                        <Row data={trxdata}/>
                    )

                })}
            </Table>
             </>):(
             <>
             <Heading size="sm" p='3'>Select an account</Heading>
             <Divider/>
            <ScrollView>
               {accountList.map((e,i)=>(<TouchableOpacity onPress={()=>{ return generateStatement(e)}}><Box key={i} p={3}>{`${i+1}. ${e}`}</Box></TouchableOpacity>))}
            </ScrollView>
             </>)}
             </VStack>
             </KeyboardAwareScrollView>
        </NativeBaseProvider>
        
    )
}
