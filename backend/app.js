const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

require("dotenv").config();
// app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
// app.use(express.json());
app.use(express.json({ limit: "10kb" }));
const cors = require("cors");
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
const router = require("./routes/allroute");
var cookieParser = require("cookie-parser");
app.use(cookieParser());
const hpp = require("hpp");
app.use(hpp());
// import helmet from "helmet";
// app.use(helmet());
// code du livereload
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

//connection de la base de doonnees
mongoose
  .connect(process.env.KEY_MONGODB)
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(router);
