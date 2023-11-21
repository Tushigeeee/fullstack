const express = require("express");


const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json([
    {
        id: 1,
        name: "Product1",
      },
      {
        id: 2,
        name: "Product2",
      },
  ]);
});

module.exports = router;
