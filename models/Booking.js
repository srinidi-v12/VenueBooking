const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'Venue Booking System';

let db;

// MongoDB Connection
const connectDB = async () => {
  if (!db) {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    db = client.db(dbName);
    console.log('MongoDB connected');
  }
  return db;
};

// Function to create a booking
const createBooking = async (bookingData) => {
  const bookingCollection = await connectDB().then(db => db.collection('bookings'));
  const result = await bookingCollection.insertOne(bookingData);
  return result.insertedId;
};

// Function to find a booking by ID
const findBookingById = async (bookingId) => {
  const bookingCollection = await connectDB().then(db => db.collection('bookings'));
  return await bookingCollection.findOne({ _id: bookingId });
};

// Function to find bookings by user name
const findBookingsByUserName = async (userName) => {
  const bookingCollection = await connectDB().then(db => db.collection('bookings'));
  return await bookingCollection.find({ name: userName }).toArray();
};

module.exports = {
  createBooking,
  findBookingById,
  findBookingsByUserName
};
