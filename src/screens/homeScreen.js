import React from 'react';
import { ThemeProvider, Text, Card } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import {firebase } from '../firebase/config';

export default function HomeScreen(props) {
    const userId = props.userData._id;
    return (
        <ThemeProvider theme={theme}>
            <Text h4 style={{textAlign:"center"}}> Select what you want to do</Text>
            <Grid>
                <Row>
                    <Col>
                        <TouchableOpacity>
                            <Card>
                                <Card.Title>Add money</Card.Title>
                            </Card>
                        </TouchableOpacity>
                    </Col>
                    <Col>
                        <TouchableOpacity>
                            <Card>
                                <Card.Title>Send money</Card.Title>
                            </Card>
                        </TouchableOpacity>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TouchableOpacity>
                            <Card>
                                <Card.Title>Buy a product</Card.Title>
                            </Card>
                        </TouchableOpacity>
                    </Col>
                    <Col>
                        <TouchableOpacity>
                            <Card>
                                <Card.Title>Sell a product</Card.Title>
                            </Card>
                        </TouchableOpacity>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TouchableOpacity>
                            <Card>
                                <Card.Title>Receive loan</Card.Title>
                            </Card>
                        </TouchableOpacity>
                    </Col>
                    <Col>
                        <TouchableOpacity>
                            <Card>
                                <Card.Title>Give loan</Card.Title>
                            </Card>
                        </TouchableOpacity>
                    </Col>
                </Row>
                <Row>
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
            backgroundColor: "orange"
        }
    }

}