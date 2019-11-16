import { ObjectID, MongoClient} from 'mongodb';

const DB_NAME = 'mydb';
const URL = `mongodb://localhost:27017/${DB_NAME}`;

interface GetReservationsArgs {
  id?: String;
}
export async function getReservations(_, args: GetReservationsArgs) {
  const invalidFilterArgs = args?.id && !ObjectID.isValid(args?.id);
  if (invalidFilterArgs) {
    return [];
  }
  let reservations = [];
  try {
    const client = await MongoClient.connect(URL, { useUnifiedTopology: true });
    const filter = args?.id
      ? { '_id': ObjectID(args?.id) }
      : {};
    const dbo = client.db(DB_NAME);
    reservations = await dbo.collection('reservations')
      .find(filter).toArray();
    reservations = reservations.map((x) => {
      x = Object.assign(x, { 'id': x._id });
      const { _: _id, ...returnVal } = x;
      return returnVal;
    });
    await client.close();
  } catch (e) {
    throw new Error('Get reservations failed');
  }
  return reservations;
}

interface ReservationInput {
  guestName: String;
  hotelName: String;
  arrivalDate: String;
  departureDate: String;
}

export async function addReservation(_ , reservationInput: ReservationInput) {
  let reservation;
  try {
    const client = await MongoClient.connect(URL);
    const dbo = client.db(DB_NAME);
    const result = await dbo.collection('reservations').insertOne(reservationInput);
    if(result?.insertedId) {
      reservation = (await getReservations(null, { id: result.insertedId }))[0];
    } else {
      await client.close();
      throw new Error('Reservation insert failed');
    }
    await client.close();
  } catch (e) {
    throw new Error(`Reservation insert failed: ${e}`);
  }
  return reservation;
}
