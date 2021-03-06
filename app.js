const express = require("express");
const logger = require("morgan");

const CMSRoutes = require("./routes/cmsRoute");
const database = require("./config/databaseConfig");

//Initialize the express application
const app = express();

//Connect the database
database.connect(err => {
  if (err) throw err;
  console.log(`MySql database is connected...`);
});

//Middlewares
app.use(logger("dev"));

//Routes
app.use("/api/cms", CMSRoutes);

//Catch 404 Errors and forwards them to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//Error handler
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status;

  //Respond to client
  res.status(status).json({
    error: {
      message: error.message
    }
  });

  //Respond to server
  console.error(err);
});

//Port
const PORT = process.env.PORT || 4000;

//Start the server
app.listen(PORT, console.log(`Application is running on port ${PORT}`));
