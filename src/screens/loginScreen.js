import React, { useState } from 'react';
import { ThemeProvider, Text, Input, Button, Card } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Icon from 'react-native-vector-icons/FontAwesome';
import { firebase } from '../firebase/config';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function onChangeEmail(e) {
        setEmail(e)
    }

    function onChangePassword(e) {
        setPassword(e)
    }

    function onPressLogin() {
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                const uid = response.user.uid;
                const usersRef = firebase.firestore().collection("users");
                usersRef.doc(uid)
                    .get()
                    .then(firebaseData => {
                        if (!firebaseData.exists) {
                            alert("No record found!");
                            return;
                        }
                        const user = firebaseData.data();
                        //navigate to Home page and send user data
                        navigation.navigate("Home", { user });
                    })
                    .catch(err => alert(err))
            })
            .catch(err => alert(err))

    }

    return (
        <ThemeProvider theme={theme}>
            <KeyboardAwareScrollView>
                <Card>
                    <Text h4>Login to continue</Text>
                </Card>
                <Card>
                    <Input placeholder='Gmail address' onChangeText={onChangeEmail} value={email} maxLength={35} leftIcon={{ type: 'font-awesome', name: 'envelope' }} />
                    <Input placeholder='Password' onChangeText={onChangePassword} value={password} secureTextEntry={true} leftIcon={{ type: 'font-awesome', name: 'lock' }} />
                    <Button title="Login" onPress={onPressLogin} />
                </Card>
                <Card>
                    <Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                            <Text style={{ color: "blue" }}>Not registered? Signup here</Text>
                        </TouchableOpacity>
                    </Text>
                </Card>
            </KeyboardAwareScrollView>
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
            fontSize: 20
        }
    },
    Text: {
        style: {
            fontSize: 20,
            padding: 10
        }

    }
}