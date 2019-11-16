import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { Reservations } from './Reservations.tsx';

//Apollo setup
const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'http://localhost:4000/',
});
const client = new ApolloClient({
    cache: cache,
    link: link
});

export const App = () => {
    return (
        <ApolloProvider client={client}>
            <Container>
                <Jumbotron fluid>
                    <Container>
                        <h1>Hotel Reservation System</h1>
                        <p>GraphQL backed, React reservation management tool</p>
                    </Container>
                </Jumbotron>
                <Row>
                    <Col xs={1} md={2} lg={2}></Col>
                    <Col xs={10} md={8} lg={8}>
                        <Reservations />
                    </Col>
                    <Col xs={1} md={2} lg={2}></Col>
                </Row>
            </Container>
        </ApolloProvider>
    );
};
