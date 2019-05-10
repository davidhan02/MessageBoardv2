const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');

const google = require('./routes/auth/google');
const profiles = require('./routes/api/profiles');
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');

const keys = require('./config/keys');
const port = process.env.PORT || 5000;
const app = express();

require('./services/passportSetup')(passport);
require('./services/passportLocal')(passport);
require('./services/passportGoogle')(passport);
require('./models/Profile');
require('./models/User');

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.secretKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth/google', google);
app.use('/api/profiles', profiles);
app.use('/api/users', users);
app.use('/api/posts', posts);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });
}

app.listen(port, () => console.log(`Server running on port ${port}`));
