import * as test from 'tape';
import { MongoClient } from 'mongodb';
import { getReservations, addReservation } from '../resolvers/reservationsResolver';

const DB_NAME = 'mydb';
const URL = `mongodb://localhost:27017/${DB_NAME}`;
const trueForAll = (arr, fn) => {
  return arr.reduce((acc,cur) => {
    return acc && fn(cur);
  }
    ,true);
};

//Cleanup
test.onFinish(async () => {
  const client = await MongoClient.connect(URL, { useUnifiedTopology: true });
  const dbo = client.db(DB_NAME);
  await dbo.collection('reservations').deleteMany({});
  await client.close();
});

test('reservationsResolver', async (t) => {

  t.test('getReservations', async (q) => {
    //setup
    const client = await MongoClient.connect(URL, { useUnifiedTopology: true });
    const dbo = client.db(DB_NAME);
    await dbo.collection('reservations').deleteMany({});
    //Insert default reservations
    await dbo.collection('reservations').insertMany([
      {
        'guestName': 'Joe',
        'hotelName': 'Hilton Roanoke',
        'arrivalDate': '10/11/2019',
        'departureDate': '10/15/2019'
      },
      {
        'guestName': 'Sally',
        'hotelName': 'Hilton New York',
        'arrivalDate': '03/29/2019',
        'departureDate': '04/15/2019'
      },
    ]);
    await client.close();
    const reservations = await getReservations(null, {});
    q.equal(reservations.length, 2,'reservations count equals 2');
    q.assert(trueForAll(reservations,(x) => {
      return Object.keys(x).indexOf('id') != -1;
    }), 'all reservations have id prop');

    const firstReservation = reservations[0];
    const singleReservationSelect = await getReservations(null, { id: firstReservation.id });

    q.equal(singleReservationSelect.length, 1,
      'get reservations by id results in single item array');

    q.end();
  });

  t.test('addReservation', async (q) => {
    //Insert default reservations
    const client = await MongoClient.connect(URL, { useUnifiedTopology: true });
    const dbo = client.db(DB_NAME);
    await dbo.collection('reservations').deleteMany({});
    await client.close();
    const inputReservation = {
      'guestName': 'Jimmy',
      'hotelName': 'Hilton B',
      'arrivalDate': '03/29/1991',
      'departureDate': '04/15/2019'
    };
    const insertedReservation = await addReservation(null, inputReservation);
    const { id, ...reservationMinusId } = insertedReservation;
    q.deepEqual(
      reservationMinusId,
      inputReservation,
      'input reservation and returned are equal (except for id field)'
    );
    q.end();
  });

  t.end();
});
