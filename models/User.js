const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'VenueBooking';

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

// Function to create a user
const createUser = async (userData) => {
  const userCollection = await connectDB().then(db => db.collection('users'));
  const result = await userCollection.insertOne(userData);
  return result.insertedId;
};

// Function to find a user by username or email
const findUser = async (username) => {
  const userCollection = await connectDB().then(db => db.collection('users'));
  return await userCollection.findOne({ $or: [{ username }, { email: username }] });
};

module.exports = {
  createUser,
  findUser
};
