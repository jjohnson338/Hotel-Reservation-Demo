import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import gql from 'graphql-tag';
import Table from 'react-bootstrap/Table';
import { useQuery } from '@apollo/react-hooks';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const GET_RESERVATIONS = gql`
query($id: ID) {
    getReservations(id: $id) {
        id
        guestName
        hotelName
        arrivalDate
        departureDate
    }
}`;

export const ReservationsTable = (props) => {
    const options = {
            variables: props?.searchText ? { id: props.searchText, } : {},
        };
    const { loading, error, data, refetch } = useQuery(GET_RESERVATIONS, options);

    if(props?.refresh) {
        refetch();
        props.setRefresh(false);
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Guest Name</th>
                    <th>Hotel Name</th>
                    <th>Arrival Date</th>
                    <th>Departure Date</th>
                </tr>
            </thead>
            <tbody>
                {
                    (()=>{
                        if (!data.getReservations.length) {
                            return (
                                <tr key={'no-rows'}>
                                    <td colSpan={5}>No results</td>
                                </tr>
                            );
                        }
                        return data.getReservations.map((x) => {
                            return (
                                <tr key={x.id}>
                                    <td>{x.id}</td>
                                    <td>{x.guestName}</td>
                                    <td>{x.hotelName}</td>
                                    <td>{x.arrivalDate}</td>
                                    <td>{x.departureDate}</td>
                                </tr>
                            );
                        })
                    })()
                }
            </tbody>
        </Table>
    );
};
