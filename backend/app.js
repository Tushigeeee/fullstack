require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/users");
const productsRoutes = require("./routes/products");
const accountsRoutes = require("./routes/accounts");
const cors = require("cors");

//Express app
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://fullstack-frontend-eight.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
  })
);
// middleware --> logging --> saving user activity

app.use((req, res, next) => {
  console.log(
    `This user has requested ${req.method} method from this ${
      req.path
    } path: ${new Date().toLocaleString()}`
  );
  next();
});

app.get("/", (req, res) => {
  res.status(200).json("You are requesting from the Root path");
});

app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/account", accountsRoutes);

//middleware --> error handling
app.use((req, res, next) => {
  res.status(404).json({
    message: "Page not found",
  });
  next();
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(
    console.log("connected to MongoBD successfully"),
    app.listen(port, () => {
      console.log(`server is running at http://localhost:${port}`);
    })
  )
  .catch((err) => console.log(err));
