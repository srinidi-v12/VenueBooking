const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'VenueBooking';

// Create Venue
async function createVenue(venueData) {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  const db = client.db(dbName);
  const venueCollection = db.collection('venues'); // Access the 'venues' collection
  const result = await venueCollection.insertOne(venueData); // Insert the venue data
  return result.insertedId; // Return the inserted venue's ID
}

// Get All Venues
async function getAllVenues() {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  const db = client.db(dbName);
  const venueCollection = db.collection('venues');
  const venues = await venueCollection.find().toArray(); // Fetch all venues
  return venues;
}

// Delete Venue
async function deleteVenue(venueId) {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  const db = client.db(dbName);
  const venueCollection = db.collection('venues');
  const result = await venueCollection.deleteOne({ _id: new ObjectId(venueId) }); // Delete by venueId
  return result.deletedCount === 1;
}

// Update Venue
async function updateVenue(venueId, updatedData) {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  const db = client.db(dbName);
  const venueCollection = db.collection('venues');
  const result = await venueCollection.updateOne(
    { _id: new ObjectId(venueId) },
    { $set: updatedData }
  );
  return result.matchedCount === 1;
}



module.exports = router;


module.exports = {
  createVenue,
  getAllVenues,
  deleteVenue,
  updateVenue
};

// export interface Venue {
//   _id?: string;
//   name: string;
//   description: string;
//   imageUrl: string;
// }
const express = require('express');
const router = express.Router();
const { createVenue } = require('../db/venueController'); // ✅ Adjust path if needed

router.post('/venues', async (req, res) => {
  try {
    const insertedId = await createVenue(req.body); // ✅ use your DB logic
    res.status(201).json({ _id: insertedId, ...req.body }); // return full venue
  } catch (error) {
    console.error('Error adding venue:', error); // Debug here
    res.status(500).json({ message: 'Failed to add venue' });
  }
});

module.exports = router;
