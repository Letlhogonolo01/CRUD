const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");

// const { urlencoded } = require("express");
// const bodyParser = require("body-parser");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  }
  );

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//Parser requests of content-type application/json
// app.use(bodyParser.urlencoded({extended: true}));
// const dbConfig = require("./config/db.config.js");


  app.get('/',(req,res) => {
    res.json({message: "welcome to Letlhogonolo's server"})
  });
  
const PORT = process.env.PORT || 8080;

require('./routes/tutorial.routes')(app);

app.listen(PORT, () => {
    console.log('Express Server up and running on port ' + PORT);
});