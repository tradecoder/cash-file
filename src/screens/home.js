import React, { useEffect, useState } from 'react';
import {ThemeProvider, Text, Input, Button, Card} from 'react-native-elements';
import {TouchableOpacity} from 'react-native';

export default function Home(){
    return(
        <ThemeProvider>
            <Text> Select what you want to do</Text>
            <Card>
                <Card.Title>Add money</Card.Title>                       
            </Card>
            <Card>
                <Card.Title>Send money</Card.Title>                         
            </Card>
            <Card>
                <Card.Title>Buy a product</Card.Title>                         
            </Card>
            <Card>
                <Card.Title>Sell a product</Card.Title>          
            </Card>
            <Card>
                <Card.Title>Receive Loan</Card.Title>
            </Card>
            <Card>
                <Card.Title>Give loan</Card.Title>
            </Card>
            <Card>
                <Card.Title>Exit</Card.Title>
            </Card>
        </ThemeProvider>
    )
}