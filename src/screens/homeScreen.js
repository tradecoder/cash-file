import React from 'react';
import { ThemeProvider, Text, Card, Icon, Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";


export default function HomeScreen({navigation}) {
 
    return (
        <ThemeProvider theme={theme}>
            <Text h4 style={{textAlign:"center"}}> Select what you want to do</Text>
            <Grid>
                <Row>
                    <Col>
                        <TouchableOpacity>
                            <Card>                                                 
                                <Button icon={<Icon reverse name="plus" type="font-awesome" color="green"/>} ></Button>
                                <Card.Title>Add money</Card.Title>           
                            </Card>
                        </TouchableOpacity>
                    </Col>
                    <Col>
                        <TouchableOpacity>
                            <Card>
                                <Button icon={<Icon reverse name="paper-plane" type="font-awesome" color="blue"/>} ></Button>
                                <Card.Title>Send money</Card.Title>
                            </Card>
                        </TouchableOpacity>
                    </Col>
                </Row>         
                <Row>
                    <Col>
                        <TouchableOpacity>
                            <Card>
                                <Button icon={<Icon reverse name="briefcase" type="font-awesome" color="black"/>} ></Button>
                                <Card.Title>Receive loan</Card.Title>
                            </Card>
                        </TouchableOpacity>
                    </Col>
                    <Col>
                        <TouchableOpacity>
                            <Card>
                                <Button icon={<Icon reverse name="cut" type="font-awesome" color="red"/>} ></Button>
                                <Card.Title>Give loan</Card.Title>
                            </Card>
                        </TouchableOpacity>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
                            <Card>
                                <Card.Title>Login</Card.Title>
                            </Card>
                        </TouchableOpacity>
                    </Col>
                    <Col>
                        <TouchableOpacity>
                            <Card>
                                <Card.Title>Exit</Card.Title>
                            </Card>
                        </TouchableOpacity>
                    </Col>
                </Row>
            </Grid>
        </ThemeProvider>
    )
}
const theme = {
    Card: {
        containerStyle: {
            backgroundColor: "orange",                
        } 
    },
    Icon:{
        iconStyle:{
            color:"white",
        }
    },
    Button:{
        buttonStyle:{
            backgroundColor:"orange"
        }
    }

}