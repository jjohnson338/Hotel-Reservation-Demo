const { gql } = require('apollo-server');

export default gql`
  scalar Date

  type Reservation {
    id: ID!
    guestName: String!
    hotelName: String!
    arrivalDate: Date
    departureDate: Date
  }

  type Query {
    getReservations(id: ID): [Reservation]
  }

  type Mutation {
    addReservation(
      guestName: String!,
      hotelName: String!,
      arrivalDate: Date!,
      departureDate: Date!):Reservation
  }
`;
