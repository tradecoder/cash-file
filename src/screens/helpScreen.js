import React from 'react';
import { NativeBaseProvider, VStack, Box, Heading, Text, Button, Input, ScrollView, Divider } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default function HelpScreen() {
    return (
        <NativeBaseProvider>
            <KeyboardAwareScrollView>
                <VStack p='5'>
                    
                    <Box pt='3' pb='3'>
                        <Heading size='sm'>Warning and Privacy Policy:</Heading>
                        <Text>
                            This app only keeps the submitted records by the user
                            and it will not be a legal document for any case. 
                            The app owners will not be liable for any data loss in any ways.
                            This app stores data in Google's Firebase/Firestore by free of charge.
                            So, all terms and conditions by Google will be applicable for storing data in Firebase/Firestore 
                            and using data from this source. If you start using this app, this privacy policy will be 
                            applicable for you automatically without any further notice.
                            
                        </Text>
                    </Box>
                    <Divider/>               
                    <Heading size='md'>Helpline</Heading>
                    <Divider />
                    <Box pt='3' pb='3'>
                        <Text>
                            You can keep your Personal or Business financial records here. Specially designed for
                            Mobile banking transaction records for agents or shop owners.
                        </Text>
                    </Box>
                    <Divider />
                    <Divider />
                    <Box pt='3' pb='3'>
                        <Heading size='sm'>Sign up:</Heading>
                        <Text>
                            Provide all valid information to signup.
                            Remember or keep it in a safe place. Email or password is not changeable.
                            Technical support is only available for Enterprise (paid) version.
                        </Text>
                        <Text>Or, just login if yor already have an account.</Text>
                    </Box>
                    <Divider />
                    <Box pt='3' pb='3'>
                        <Heading size='sm'>How to create an account?</Heading>
                        <Text>If you are logged in... </Text>
                        <Text>* Press on Set Account</Text>
                        <Text>* Give an account Name (like- yourName, customerName, yourShopName, uCash, bKash etc.)</Text>
                        <Text>* Provide a valid mobile number (remember- this mobile number will be your main account,
                            you can use same or multiple mobile numbers for multiple accounts.).</Text>
                        <Text>* Duplicate account is restricted. Do not create unnecessary account. You can see the existing account with the same mobile
                            number when you'll start typing few digits of the mobile number.</Text>
                        <Text>* Finally press Add- button if you want to create that account. Then go back screen and work it with AddMoney, SendMoney, ViewStatement</Text>
                    </Box>
                    <Divider />
                    <Box pt='3' pb='3'>
                        <Heading size='sm'>How to add money?</Heading>
                        <Text>* Go to Add Money screen</Text>
                        <Text>* Enter an amount</Text>
                        <Text>* Enter a customer mobile number or a number from where it's coming</Text>
                        <Text>* Enter your account number (start typing your mobile number,
                            you will see a list of your accouts, select one from there</Text>
                        <Text>* Press on Add button</Text>
                        <Text>* You can see this transaction from ViewStatement</Text>
                    </Box>
                    <Divider />
                    <Box pt='3' pb='3'>
                        <Heading size='sm'>How to send money?</Heading>
                        <Text>* Go to Send Money screen</Text>
                        <Text>* Enter an amount</Text>
                        <Text>* Enter a customer mobile number or a number to transfer to</Text>
                        <Text>* Enter your account number (start typing your mobile number,
                            you will see a list of your accounts, select one from there.
                        </Text>
                        <Text>* Press on Send button</Text>
                        <Text>* You can see this transaction from ViewStatement.</Text>
                    </Box>
                    <Divider />
                    <Box pt='3' pb='3'>
                        <Heading size='sm'>How to view account statement?</Heading>
                        <Text>* Go to View Statement screen. You will see your account list there</Text>
                        <Text>* Select an account</Text>
                        <Text>* By default it will show you the last one month's transaction statement</Text>
                        <Text>* You will see two date ranges at the top. Change it from left and right if you need old statement</Text>
                    </Box>
                    <Divider />
                    <Box pt='3' pb='3'>
                        <Heading size='sm'>Contact us for:</Heading>
                        <Text>* Technical support (for enterprise version)</Text>
                        <Text>* Custom software</Text>
                        <Text>* To design and build your Mobile apps</Text>
                        <Text>* And to design and build your websites</Text>
                    </Box>
                    <Divider />
                    <Box pt='3' pb='2'>
                        <Text>Email: joltoridigital@gmail.com</Text>
                        <Text>Skype: tradecoder</Text>
                        <Text>Mobile: Ask through email or skype</Text>
                    </Box>
                    <Divider />

                    <Divider />
                    <Box pt='3' pb='2'>
                        <Text>App idea: Sk Mosharaf (Sugandhi)</Text>
                        <Text>Design and Developed by: Mamun Abdullah</Text>
                        <Text>Published by: Trade Coder Bangladesh</Text>
                        <Text>Tech support: Joltori Digital</Text>
                        <Text>Powered by: Joltori Trade Max (JTM)</Text>
                    </Box>
                    <Divider />


                </VStack>
            </KeyboardAwareScrollView>
        </NativeBaseProvider>
    )
}