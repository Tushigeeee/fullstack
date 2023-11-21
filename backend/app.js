require("dotenv").config();
const express = require("express");
const usersRoutes = require("./routes/users");
const productsRoutes = require("./routes/products"); 

//Express app
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

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

//middleware --> error handling
app.use((req, res, next) => {
  res.status(404).json({
    message: "Page not found",
  });
  next();
});

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});