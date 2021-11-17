import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { NativeBaseProvider, VStack, Box, Heading, Text, Button, Input, ScrollView, Divider } from 'native-base';
import { firebase } from '../firebase/config';


export default function AddMoneyScreen() {
  const uid = firebase.auth().currentUser.uid;

  const [myAccount, setMyAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [customerAccount, setCustomerAccount] = useState("");
  const [accountList, setAccountList] = useState([]);
  const [balance, setBalance] = useState("");
  const [filteredAccountList, setFilteredAccountList] = useState([]);
  const [filterKey, setFilterKey] = useState("");

  const currentUserProfile = firebase.firestore().collection("users").doc(uid);
  const validCustomerAccount = /01[3-9]......../.test(customerAccount); // valid only for mobile operators in Bangladesh

  function onChangeAmount(e) {
    setAmount(e.replace(/[^0-9]/g, ''))
  }

  // filter the account to help find an existing account
  function filterAccount(elem) {
    setFilterKey(elem);
    const x = [...accountList].filter((e) => e.toLowerCase().includes(filterKey.toLowerCase()));
    setFilteredAccountList(x);
  }


  function onChangeCustomerAccount(e) {
    if (e.length > 12) {
      // for account identifier, one extra digit can be added at the last of mobile number
      // but if it exceeds the extra identifier it will return to 11 digit mobile number
      e = e.slice(0, 11)
    }
    setCustomerAccount(e.replace(/[^0-9]/g, ''))
  }

  function currentAccountBalance(e) {
    currentUserProfile.collection(myAccount).orderBy("createdAt", "desc").limit(1).get()
      .then((snapshot) => snapshot.forEach((doc) => { setBalance(doc.data().balance) }))
      .catch((err) => console.log(err))

  }
  if (myAccount) {
    currentAccountBalance();
  }


  function onPressAddMoney(e) {
    e.preventDefault();
    const accountData = {
      uid,
      myAccount,
      customerAccount,
      cashIn: parseInt(amount),
      cashOut: 0,
      refId: "",
      balance: (balance + parseInt(amount)),
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    if (myAccount && amount && customerAccount && validCustomerAccount) {
      currentUserProfile.collection(myAccount).add(accountData)
        .then((doc) => {
          currentUserProfile.collection(myAccount).doc(doc.id).set({ refId: doc.id }, { merge: true });
          alert(`Tk ${amount} added to ${myAccount} from ${customerAccount}.`);
          setAmount("");
          setMyAccount("");
          setCustomerAccount("");
          currentAccountBalance()

        })
        .catch((e) => { alert(`Sorry! Operation failed! Pls try again later.`) })
    } else {
      if (!amount) {
        alert("Please enter Amount")
      } else if (!customerAccount) {
        alert("Please enter Customer Account")
      } else if (!validCustomerAccount) {
        alert("Please enter a valid customer mobile")
      }
      else {
        alert("Please select Your Account")
      }
    }
  }

  // display existing account list
  useEffect(() => {
    currentUserProfile.get()
      .then((doc) => {
        const accounts = doc.data().accountList;
        setAccountList([...accounts]);
      })
      .catch((err) => err);
  }, []);

  return (
    <NativeBaseProvider>
      <VStack p={'5'} space={'2'}>
        <Heading size={'md'}>Add money</Heading>
        <Divider />
        <Box>
          <Text>Amount</Text>
          <Input size={'lg'} placeholder="Amount" keyboardType="numeric" value={amount} onChangeText={onChangeAmount} />
        </Box>
        <Box>
          <Text >From (customer mobile / name)</Text>
          <Input size={'lg'} placeholder="Customer mobile / name" keyboardType="numeric" value={customerAccount} onChangeText={onChangeCustomerAccount} />
        </Box>
        <Box>
          <Text>To my account: <Text bold>{myAccount}</Text></Text>
          <Input size={'lg'} placeholder="My account (Search and Select from the list)" onChangeText={filterAccount} />
        </Box>
        <Button size={'lg'} _text={{ fontSize: 18 }} mt={'5'} colorScheme={'yellow'} onPress={onPressAddMoney}>{`Add ${amount > 0 ? amount : 0} Taka`}</Button>
        <Heading size={'sm'}>Select an account from the list</Heading>
        <ScrollView>
          {filteredAccountList.map((e, i) => (<TouchableOpacity onPress={() => setMyAccount(e)}><Box key={i} pb={'3'}>{`${i + 1}. ${e}`}</Box></TouchableOpacity>))}
          <Box h={'400'} w={'100'}></Box>
        </ScrollView>
      </VStack>
    </NativeBaseProvider>
  )
}
