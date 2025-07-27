const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { createUser, findUser } = require('./models/User');
const { createBooking } = require('./models/Booking');
const express = require('express');
const router = express.Router();
const { createVenue } = require('./models/Venue'); // adjust path

const app = express();
const PORT = 6001;
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'VenueBooking';

app.use(cors());
app.use(express.json());
app.use("/img", express.static(path.join(__dirname, "img")));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/img/:imgName", (req, res) => {
  const imgName = req.params.imgName;
  res.sendFile(path.join(__dirname, "img", imgName));
});

// File Upload Setup
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// MongoDB Connection
let db;
MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    db = client.db(dbName);
    console.log('MongoDB connected');
  })
  .catch(err => console.error(err));

// Register Route
app.post('/register', upload.single('profile'), async (req, res) => {
  try {
    const data = {
      ...req.body,
      aesthetic: {
        chic: req.body['aesthetic.chic'] === 'true',
        modern: req.body['aesthetic.modern'] === 'true',
        trad: req.body['aesthetic.trad'] === 'true',
        trend: req.body['aesthetic.trend'] === 'true'
      },
      profile: req.file?.filename
    };

    const userId = await createUser(data);
    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  const user = await findUser(username);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({ message: 'Login successful', userId: user._id, username: user.username });
});


// Booking Route
app.post('/bookings', async (req, res) => {
  try {
    const bookingData = req.body;

    // Ensure required fields are provided
    if (!bookingData.name || !bookingData.venue || !bookingData.date || !bookingData.timeSlot || !bookingData.capacity || !bookingData.userId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Insert booking data into the database
    const bookingCollection = db.collection('bookings');
    await bookingCollection.insertOne(bookingData);
    res.status(201).json({ message: 'Booking confirmed successfully' });
    alert("Booking confirmed!");
  } catch (error) {
    console.error('Error during booking:', error); // Log the error for debugging
    res.status(500).json({ error: 'Booking failed', details: error.message });
  }
});


const express = require('express');

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


// Add Venue Route (Admin)
app.post('venues', async (req, res) => {
  const venue = req.body; // { name, description, imageUrl }
  const venueCollection = db.collection('venues');
  const result = await venueCollection.insertOne(venue);
  res.status(201).json(result);
});

// Delete Venue Route (Admin)
app.delete('venues/:id', async (req, res) => {
  const venueId = req.params.id;
  const venueCollection = db.collection('venues');
  const result = await venueCollection.deleteOne({ _id: new ObjectId(venueId) });
  if (result.deletedCount === 1) {
    res.status(200).send({ message: 'Venue deleted successfully' });
  } else {
    res.status(404).send({ message: 'Venue not found' });
  }
});

// Update Venue Route (Admin)
app.put('/api/venues/:id', async (req, res) => {
  const venueId = req.params.id;
  const updatedVenue = req.body; // { name, description, imageUrl }
  const venueCollection = db.collection('venues');
  const result = await venueCollection.updateOne(
    { _id: new ObjectId(venueId) },
    { $set: updatedVenue }
  );
  if (result.matchedCount === 1) {
    res.status(200).send({ message: 'Venue updated successfully' });
  } else {
    res.status(404).send({ message: 'Venue not found' });
  }
});

// Get All Venues Route (Admin & Users)
app.get('/api/venues', async (req, res) => {
  const venueCollection = db.collection('venues');
  const venues = await venueCollection.find().toArray();
  res.json(venues);
});



router.post('/venues', async (req, res) => {
  try {
    const id = await createVenue(req.body);
    res.status(201).json({ _id: id, ...req.body });
  } catch (error) {
    console.error('Error adding venue:', error);
    res.status(500).json({ message: 'Failed to add venue' });
  }
});


app.get('/mybookings', async (req, res) => {
  const userId = req.query.userId; // Get userId from query parameters
  try {
    const bookings = await db.collection('bookings').find({ userId }).toArray(); // Fetch bookings for the user
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
