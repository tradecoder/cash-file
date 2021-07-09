import React, {useState} from 'react';
import {ThemeProvider, Text, Input, Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';


export default function AddMoneyScreen(){
    const [mobileAccount, setMobileAccount] = useState("");
    const [amount, setAmount] =  useState(0);
    const [accountType, setAccountType] = useState("");
    function onPressAddMoney(e){
        e.preventDefault();

    } 
    
    return(
        <ThemeProvider>
            <Text h2>Add money</Text>
            <Input placeholder="Account Type / service name" value={accountType} onChangeText={(e)=>setAccountType(e)}/>
            <Input placeholder="mobile account" value={mobileAccount} onChangeText={(e)=>setMobileAccount(e)}/>
            <Input placeholder = "amount" value={amount} onChangeText={(e)=>setAmount(e)}/>
            <Button title ="Add now" onPress={onPressAddMoney}/>
        </ThemeProvider>
    )
}

const theme = {
    Button:{
        raised:true
    }

}