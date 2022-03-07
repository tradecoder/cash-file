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
                    <Divider />
                    <Heading size='sm'>Helpline</Heading>
                    <Divider />
                    <Box pt='3' pb='3'>
                        <Text>
                            You can keep your Personal or Business financial records here. Specially designed for
                            Mobile banking transaction records for agents or shop owners.
                        </Text>
                        <Text>
                            এই এ্যাপের মাধ্যমে আপনার ব্যক্তিগত ও ব্যবসায়িক লেনদেনের তথ্য সংরক্ষণ করতে পারেন। তবে এটি মোবাইল ব্যাংক এজেন্ট ও দোকানের লেনদেনের জন্য বিশেষ ভাবে তৈরি করা হয়েছে।
                        </Text>
                    </Box>
                    <Divider />
                    <Divider />
                    <Box pt='3' pb='3'>
                        <Heading size='sm'>Sign up:</Heading>
                        <Text>
                            Provide all valid information to signup.
                            Remember or keep it in a safe place. Email or password is not changeable.
                            Technical support is only available for Enterprise (paid) version. This app does not allow users to delete/edit any data.
                            So, put only correct information. For any wrong records, make a reversed entry to solve it.
                        </Text>
                        <Text>Or, just login if yor already have an account.</Text>
                        <Text>
                            সাইনআপ করার সময় সঠিক তথ্য প্রদান করুন।
                            নিরাপদ স্থানে ইমেইল ও পাসওয়ার্ড এর তথ্য সংরক্ষণ করুন যেন প্রয়োজনের সময় তা ব্যবহার করতে পারেন। এই তথ্য পরিবর্তনের কোন সুযোগ নেই।
                            পরবর্তীতে লগইন করার সময় সঠিক ইমেইল ও পাসওয়ার্ড দিতে না পারলে ওই এ্যাকাউন্ট আর ব্যবহার করার সুযোগ থাকবেনা।
                            একবার সাইনআপ সফল হলে যেকোন সময় লগইন করে এটি ব্যবহার করতে পারবেন।
                        </Text>
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
                        <Text>সাইনআপ করার পর কিভাবে এ্যাকাউন্ট করবেন?</Text>
                        <Text>* Set Account এ যান</Text>
                        <Text>* এ্যাকাউন্ট এর নাম - যেমন uCash, bKash ইত্যাদি অথবা আপনার নাম অথবা দোকানের নাম অথবা অন্য কারো নাম সংক্ষেপে দিন।</Text>
                        <Text>* সঠিক মোবাইল নম্বর দিন।</Text>
                        <Text>* ডুপ্লিকেট এ্যাকাউন্ট গ্রহণযোগ্য নয়। মোবাইল নম্বর দেওয়ার সময় নিচের দিকে খেয়াল করন নতুন যে এ্যাকাউন্ট যুক্ত করতে চাচ্ছেন তা আগেই করা হয়েছে কিনা।</Text>
                        <Text>* এবার Add- বাটনে চেপে এ্যাকাউন্ট ওপেন নিশ্চিত করুন।</Text>
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
                        <Text>কিভাবে Add Money করবেন?</Text>
                        <Text>* Add Money পেজ এ যান</Text>
                        <Text>* টাকার অংক দিন। </Text>
                        <Text>* কাস্টমার মোবাইল নম্বর বা যে নম্বরে টাকা ট্রান্সফার হয়েছে সেই নম্বরটি দিন</Text>
                        <Text>* যে এ্যাকাউন্ট বা নম্বর থেকে টাকা গেছে সেই এ্যাকাউন্ট বাছাই করুন</Text>
                        <Text>* Add- বাটনে চেপে রেকর্ড নিশ্চিত করুন</Text>
                        <Text>* লেনদেনের রেকর্ড দেখার জন্য View Statement থেকে দেখে নিন।</Text>
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