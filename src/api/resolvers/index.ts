import GraphQLDate from './dateResolver';
import { addReservation, getReservations } from './reservationsResolver';

const Date = GraphQLDate;

const Query = {
    getReservations
};

const Mutation = {
    addReservation
};

export default {
    Date,
    Query,
    Mutation
};

