import React, { useState } from "react";

import axios from "axios";
import { Modal } from "../../components/Modal/Modal";

export const EditProductModal = ({
  open,
  handleClose,
  product,
  handleEditProduct,
}) => {
  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleEdit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/products/${product.id}`,
        editedProduct
      );
      const updatedProduct = response.data;
      handleEditProduct(product.id, updatedProduct);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };
  const handleCancel = () => {
    handleClose();
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <div>
        <h2>Edit Product</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={editedProduct.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={editedProduct.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={editedProduct.price}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={editedProduct.category}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={handleEdit}>Save Changes</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </Modal>
  );
};
