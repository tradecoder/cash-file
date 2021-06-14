import React, { useState } from 'react';
import {ThemeProvider, Text, Input, Button} from 'react-native-elements';
import {TouchableOpacity } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Login({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function onChangeEmail(e){
        setEmail(e)
    }

    function onChangePassword(e){
        setPassword(e)
    }

    function onPressSingupLink(){
        navigation.navigate("Signup")
    }

    function onPressLogin(){
        firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(response=>{
            const uid= response.user.uid;
            const usersRef = firebase.firestore().collection("users");
            usersRef.doc(uid)
            .get()
            .then((documents)=>{
                if(!documents.exists){
                    alert("No record found!");
                    return;
                }
                const user = documents.data();
                navigation.navigate("Home", {user})

            })
            .catch(err=>alert(err))
        })
        .catch(err=>alert(err))

    }

    return (
        <ThemeProvider>
            <KeyboardAwareScrollView>
                <Input placeholder='Gmail address' onChangeText={onChangeEmail} value={email} maxLength={35} leftIcon={{ type: 'font-awesome', name:'envelope' }}/>
                <Input placeholder='Password' onChangeText={onChangePassword} value={password} secureTextEntry={true} leftIcon={{ type: 'font-awesome', name:'lock'}}/>  
                <Button title="Login" onPress={onPressLogin}/>
                <Text>
                    <Text> Don't Have an account?</Text>
                    <TouchableOpacity onPress={onPressSingupLink}>
                        <Text style={{color:"blue"}}> Signup here</Text>
                    </TouchableOpacity>                
                </Text>
            </KeyboardAwareScrollView>
        </ThemeProvider>
    )
}