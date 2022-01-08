import React from 'react';
import { NativeBaseProvider, VStack, Box, Heading, Text, Button, Input, ScrollView, Divider } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default function HelpScreen() {
    return (
        <NativeBaseProvider>
            <KeyboardAwareScrollView>
                <VStack p='5'>
                    <Heading size='md'>Helpline</Heading>
                    <Divider />
                    <Box pt='3' pb='2'>
                        <Text>Contact us for:</Text>
                        <Text>* Technical support</Text>
                        <Text>* Custom web and mobile apps</Text>
                        <Text>* Custom software</Text>
                        <Text>* And to design and build your websites</Text>
                    </Box>
                    <Divider />
                    <Box pt='3' pb='2'>
                        <Text>Email: joltoridigital@gmail.com</Text>
                        <Text>Skype: tradecoder</Text>
                    </Box>
                    <Divider /> 
                    <Box pt='3' pb='2'>
                        <Text>Website: tradecoder.com</Text>
                        <Text>Facebook: /tradecoder</Text>
                        <Text>LinkedIn: /tradecoder</Text>
                        <Text>Twitter: /tradecoder</Text>
                                                
                    </Box>
                    <Divider />                   
                    <Box pt='3' pb='2'>
                        <Text>Design and Developed by: Mamun Abdullah</Text>
                        <Text>Published by: Trade Coder Bangladesh</Text>
                        <Text>Support by: JOLTORI TRADE PORT</Text>
                        <Text>App idea: Shaikh Mosharaf Hossain (Sugandhi)</Text>
                    </Box>
                    <Divider />
                    

                </VStack>
            </KeyboardAwareScrollView>
        </NativeBaseProvider>
    )
}