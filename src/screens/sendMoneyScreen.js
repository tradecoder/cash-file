import React, {useState} from 'react';
import {ThemeProvider, Text, Input, Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';


export default function SendMoneyScreen(){

    const [mobileAccount, setMobileAccount] = useState("");
    const [amount, setAmount] =  useState();
    const [accountType, setAccountType] = useState("");
    function onChangeAmount(e){
        setAmount(e.replace(/[^0-9]/g,''))
    }
    function onPressAddMoney(e){
        e.preventDefault();

    } 
    
    return(
        <ThemeProvider>
            <Text h2>Send money</Text>
            <Input placeholder="Account Type / service name" value={accountType} onChangeText={(e)=>setAccountType(e)}/>
            <Input placeholder="Mobile Account" value={mobileAccount} onChangeText={(e)=>setMobileAccount(e)}/>
            <Input placeholder = "Amount" keyboardType="numeric" value={amount} onChangeText={onChangeAmount}/>
            <Button title ="Send now" onPress={onPressAddMoney}/>
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