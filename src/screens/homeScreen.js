import React from 'react';
import { NativeBaseProvider, Heading, Box, Text, Center, VStack, HStack, IconButton, Icon, SimpleGrid, Divider } from 'native-base';
import { TouchableOpacity, BackHandler } from 'react-native';
import { firebase } from '../firebase/config';
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
    const uid = firebase.auth().currentUser.uid;


    return (
        <NativeBaseProvider>
            <Center pt={5}>
                <Heading size={'sm'}>Select an action</Heading>
                <Divider m={5} />
                <SimpleGrid columns={2} space={10}>
                    <Box size={120} rounded='lg' pt={4} borderWidth={1} borderRadius='xl'>
                        <TouchableOpacity onPress={() => navigation.navigate("AddMoney")}>
                            <Center>
                                <FontAwesome name="plus" size={48} color="green"/>
                                <Divider m={2}/>
                                <Text bold>Add money</Text>
                            </Center>
                        </TouchableOpacity>
                    </Box>
                    <Box size={120} rounded='lg' pt={4} borderWidth={1} borderRadius='xl'>
                        <TouchableOpacity onPress={() => navigation.navigate("SendMoney")}>
                            <Center>
                                <FontAwesome name="send" size={48} color="blue" />
                                <Divider m={2}/>
                                <Text bold>Send money</Text>
                            </Center>
                        </TouchableOpacity>
                    </Box>
                    <Box size={120} rounded='lg' pt={4} borderWidth={1} borderRadius='xl'>
                        <TouchableOpacity onPress={() => navigation.navigate("ViewStatement")}>
                            <Center>
                                <FontAwesome name="book" size={48} color="dodgerblue" />
                                <Divider m={2}/>
                                <Text bold>View Statement</Text>
                            </Center>
                        </TouchableOpacity>
                    </Box>
                    <Box size={120} rounded='lg' pt={4} borderWidth={1} borderRadius='xl'>
                        <TouchableOpacity onPress={() => navigation.navigate("Account")}>
                            <Center>
                                <FontAwesome name="gear" size={48} color="orange" />
                                <Divider m={2}/>
                                <Text bold>Set Account</Text>
                            </Center>
                        </TouchableOpacity>
                    </Box>
                    <Box size={120} rounded='lg' pt={4} borderWidth={1} borderRadius='xl'>
                        <TouchableOpacity onPress={() => BackHandler.exitApp()}>
                            <Center>
                                <FontAwesome name="power-off" size={48} color="red" />
                                <Divider m={2}/>
                                <Text bold>Exit</Text>
                            </Center>
                        </TouchableOpacity>
                    </Box>
                    <Box size={120} rounded='lg' pt={4} borderWidth={1} borderRadius='xl'>
                        <TouchableOpacity>
                            <Center>
                                <FontAwesome name="info" size={48} color="blue" />
                                <Divider m={2}/>
                                <Text bold>Help</Text>
                            </Center>
                        </TouchableOpacity>
                    </Box>
                </SimpleGrid>
            </Center>

        </NativeBaseProvider>
    )
}