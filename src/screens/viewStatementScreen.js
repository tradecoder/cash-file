import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { firebase } from '../firebase/config';
import { Table, Row, TableWrapper} from 'react-native-table-component';
import { NativeBaseProvider, VStack, Box, ScrollView, Heading, Divider, Button } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from "react-native-modal-datetime-picker";




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
    const [statementStartDate, setStatementStartDate] = useState(new Date() -(30*24*60*60*1000));
    const [statementEndDate, setStatementEndDate] = useState(new Date());

    const tableHead = ["Date", "Client", "Received", "Sent", "Balance"];


    const currentUserProfile = firebase.firestore().collection("users").doc(uid); 
    
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setStatementStartDate(new Date(date))
    hideDatePicker();
  };

    // display existing account list
    useEffect(() => {
        
        currentUserProfile.get()
            .then((doc) => {
                const accounts = doc.data().accountList;
                setAccountList([...accounts]);
            })
            .catch((err) => { alert("Error loading account list!") })
    }, []);

    function onChangeStartDate(e, selectedDate){
        setStatementStartDate(selectedDate)
    }

    function onChangeEndDate(e, selectedDate){
        setStatementEndDate(selectedDate)
    }

   

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
             <Box pl='2'>{`From ${new Date(statementStartDate).toDateString()} to ${new Date(statementEndDate).toDateString()}`} </Box>
             <Box>
      <Button onPress={showDatePicker} >Change</Button>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Box>
             <Table style={{ padding:5}} borderStyle={{borderWidth:1, borderColor:'silver'}}>
                 <Row data={tableHead} flexArr={[1,1.5,1,1,1]} style={{height:35, backgroundColor:'pink'}} textStyle={{textAlign:'center', fontWeight:'bold'}}/>
                 <TableWrapper style={{flex:1}}>
               {accountData.map((e, i)=>{
                    const trxdata = [];
                    // trxdata -- transaction data
                    if(new Date(e.Date)>=statementStartDate && new Date(e.Date)<=statementEndDate){
                    trxdata.push(e.Date)
                    trxdata.push(e.Client)
                    trxdata.push(e.CashIn)
                    trxdata.push(e.CashOut)
                    trxdata.push(e.Balance)
                }
                   
                    return (
                        <Row data={trxdata} flexArr={[1,1.5,1,1,1]} style={[{height:25},i%2 && {backgroundColor: '#EBF5FB'}]} textStyle={{textAlign:'right'}} />
                    )

                })}
                </TableWrapper>
            </Table>
             </>):(
             <>
             <Heading size="sm" p='3'>Select an account</Heading>
             <Divider/>
            <ScrollView>
               {accountList.map((e,i)=>(<TouchableOpacity onPress={()=>{ return generateStatement(e)}}><Box key={i} p={2}>{`${i+1}. ${e}`}</Box></TouchableOpacity>))}
            </ScrollView>
             </>)}
             </VStack>
             </KeyboardAwareScrollView>
        </NativeBaseProvider>
        
    )
}
