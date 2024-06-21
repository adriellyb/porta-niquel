//require('./config/sequelize');
const cors = require('cors');

// express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// dotenv
require('./config/dotenv')();
const port = process.env.PORT;

// routes
const routes = require('./routes/routes');
app.use(routes);

// passport
const passport = require('passport');
require('./middlewares/passport')(passport);
app.use(passport.initialize());

// cors
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`${process.env.APP_NAME} app listening at http://localhost:${port}`);
});
    