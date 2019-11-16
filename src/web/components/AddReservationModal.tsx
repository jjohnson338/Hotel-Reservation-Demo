import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const ADD_RESERVATION = gql`
mutation (
      $guestName: String!,
      $hotelName: String!,
      $arrivalDate: Date!,
      $departureDate: Date!
    ){
  addReservation(
    guestName: $guestName,
    hotelName: $hotelName,
    arrivalDate: $arrivalDate,
    departureDate: $departureDate
  ) {
    id,
  }
}`;

export const AddReservationModal = ( { show, setShowModal, setRefresh } ) => {
    const [addReservation, { data }] = useMutation(ADD_RESERVATION);

    const [ guestName, setGuestName ] = React.useState("");
    const [ hotelName, setHotelName ] = React.useState("");
    const [ arrivalDate, setArrivalDate ] = React.useState("");
    const [ departureDate, setDepartureDate ] = React.useState("");
    const [ validated, setValidated ] = React.useState(false);

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        try {
            await addReservation({
                variables: {
                    guestName,
                    hotelName,
                    arrivalDate,
                    departureDate,
                },
            });
            setShowModal(false)
            setRefresh(true);
        } catch (e) {
            console.log(e);
        }
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
    <Modal show={show} onHide={handleClose}>
        <Form validated={validated} onSubmit={handleSubmit}>
            <Modal.Header closeButton>
            <Modal.Title>Add Reservation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Guest Name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        onChange={(e)=>{ setGuestName(e.target.value.trim()) }}
                        placeholder="Guest Name"
                        required
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Hotel Name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        onChange={(e)=>{ setHotelName(e.target.value.trim()) }}
                        placeholder="Hotel Name"
                        required
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Arrival/Departure Dates</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        onChange={(e)=>{ setArrivalDate(e.target.value.trim()) }}
                        placeholder="MM/DD/YYYY"
                        type="date"
                        required
                    />
                    <FormControl
                        onChange={(e)=>{ setDepartureDate(e.target.value.trim()) }}
                        placeholder="MM/DD/YYYY"
                        type="date"
                        required
                    />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="info" type="submit">
                Save Changes
            </Button>
            </Modal.Footer>
        </Form>
    </Modal>
    );
};
