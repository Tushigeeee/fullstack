const Product = require("../../models/product");

const createProduct = async (req, res) => {
  const { name, price, description, category, type } = req.body;
  const userId = req.user._id;

  if (!name || !price || !description || !category || !userId || !type) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const product = await Product.create({
      name,
      price,
      description,
      category,
      userId,
      type,
    });
    res.status(201).json(product);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createProduct,
};
