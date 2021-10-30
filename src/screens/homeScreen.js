import React from 'react';
import { ThemeProvider, Text, Card, Icon, Button, withTheme } from 'react-native-elements';
import { TouchableOpacity, BackHandler} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { firebase } from '../firebase/config';



export default function HomeScreen({navigation}) {  
    const uid = firebase.auth().currentUser.uid;
    
  
    return (
        <ThemeProvider theme={theme}>
            <Text style={{textAlign:"center", padding:10, color:"gray"}}>CASH FILE by TRADE CODER</Text>      
            
            <Text h4 style={{textAlign:"center", padding:10}}>Select an Action</Text>
            <Grid>
                <Row size={20}>
                    <Col>
                        <TouchableOpacity >
                            <Card>                                          
                                <Button onPress={()=>navigation.navigate("AddMoney")} icon={<Icon reverse name="plus" type="font-awesome" color="green"/>} ></Button>
                                <Card.Title>Add money</Card.Title>           
                            </Card>
                        </TouchableOpacity>
                    </Col>
                    <Col>
                        <TouchableOpacity>
                            <Card>
                                <Button onPress={()=>navigation.navigate("SendMoney")} icon={<Icon reverse name="paper-plane" type="font-awesome" color="blue"/>} ></Button>
                                <Card.Title>Send money</Card.Title>
                            </Card>
                        </TouchableOpacity>
                    </Col>
                </Row>         
                <Row size={20}>
                   
                    <Col>
                        <TouchableOpacity>
                            <Card>
                                <Button onPress={()=>navigation.navigate("ViewStatement")} icon={<Icon reverse name="book" type="font-awesome" color="dodgerblue"/>} ></Button>
                                <Card.Title>View Statement</Card.Title>
                            </Card>
                        </TouchableOpacity>
                    </Col>

                    <Col>
                        <TouchableOpacity>
                            <Card>
                                <Button onPress={()=>navigation.navigate("Account")} icon={<Icon reverse name="gear" type="font-awesome" color="orange"/>} ></Button>
                                <Card.Title>Set Account</Card.Title>
                            </Card>
                        </TouchableOpacity>
                    </Col>
                </Row>
                <Row size={20}>
                    
                    <Col>
                        <TouchableOpacity>
                            <Card>
                                <Button onPress={()=>BackHandler.exitApp()} icon={<Icon reverse name="power-off" type="font-awesome" color="red"/>} ></Button>
                                <Card.Title>Exit</Card.Title>
                            </Card>

                        </TouchableOpacity>
                    </Col>
                    <Col>
                        <TouchableOpacity>
                            <Card>
                                <Button icon={<Icon reverse name="info" type="font-awesome" color="purple"/>} ></Button>
                                <Card.Title>Help</Card.Title>
                            </Card>

                        </TouchableOpacity>
                    </Col>
                </Row>
                <Row size={20} style={{padding:20}}>
                         

                </Row>
            </Grid>
           
        </ThemeProvider>
    )
}
const theme = {
    Card:{
        containerStyle:{
            borderColor:'white',
            elevation:0,
        }
    },
    
    Icon:{
        iconStyle:{
            color:"white",
        }
    },
    Button:{
       type:'clear'
    },

}