import React, { useEffect, useState } from 'react';
import { ThemeProvider, Text, Input, Button, Card, Tab } from 'react-native-elements';
import { TouchableOpacity, View } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

export default function Home() {
       return (
        <ThemeProvider theme={theme}>
            <Text> Select what you want to do</Text>
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