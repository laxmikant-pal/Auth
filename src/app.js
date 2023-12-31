const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const brandRoutes = require('./routes/brandRoutes');
const Category = require('./models/categoryModel');
const subcategoryRoutes = require('./routes/subcategoryRoutes')
const categoryRoutes = require('./routes/categoryRoutes');
const paymentRoute = require('./routes/paymentRoute');
const orderRoutes = require('./routes/orderRoutes');
require('./config/multerSetup');
dotenv.config();
require('./config/passport');
const app = express();
const PORT = process.env.PORT;

// Serve static files from the 'public' folder
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', paymentRoute);


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api', productRoutes);
app.use('/api', brandRoutes);
app.use('/api', categoryRoutes);
app.use('/api', subcategoryRoutes);
app.use('/api', orderRoutes)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
