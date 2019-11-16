import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ReservationsTable } from './ReservationsTable.tsx';
import { AddReservationModal } from './AddReservationModal.tsx';

export const Reservations = () => {
    const [ searchText, setSearchText ] = React.useState("");
    const [ idInputVal, setIdInputVal ] = React.useState("");
    const [ showModal, setShowModal ] = React.useState(false);
    const [ refresh, setRefresh ] = React.useState(false);

    return (
        <Container>
        <Row>
            <Col xs={8} md={8} lg={8}>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <Button
                            variant="outline-secondary"
                            onClick={() => { setSearchText(idInputVal) }}
                        >Search</Button>
                    </InputGroup.Prepend>
                    <FormControl
                        onChange={(e)=>{ setIdInputVal(e.target.value.trim()) }}
                        placeholder="Revervation Id"
                        aria-label="Revervation Id"
                        value={idInputVal}
                    />
                </InputGroup>
            </Col>
            <Col>
                <Button
                    className="float-right"
                    onClick={setShowModal.bind(null,true)}
                    variant="info"
                >
                New Reservation
                </Button>
            </Col>
        </Row>
        <ReservationsTable searchText={searchText} refresh={refresh} setRefresh={setRefresh} />
        <AddReservationModal show={showModal} setShowModal={setShowModal} setRefresh={setRefresh} />
    </Container>
    );
};

