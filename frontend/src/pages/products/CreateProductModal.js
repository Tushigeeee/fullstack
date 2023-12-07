import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Modal } from "../../components/Modal/Modal";

const validationSchema = Yup.object().shape({
  productName: Yup.string().required("Product Name is required"),
  productDescription: Yup.string().required("Product Description is required"),
  productPrice: Yup.number()
    .typeError("Product Price must be a number")
    .positive("Product Price must be a positive number")
    .required("Product Price is required"),
  productCategory: Yup.string().required("Product Category is required"),
});

export const CreateProductModal = ({ open, handleClose }) => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const handleCreate = async () => {
    const newProduct = {
      name: productName,
      description: productDescription,
      price: parseInt(productPrice),
      category: productCategory,
    };

    try {
      await validationSchema.validate(newProduct, { abortEarly: false });
      const response = await axios.post(
        "http://localhost:8080/products",

        newProduct
      );

      const createdProduct = await response.data;

      console.log(createdProduct);
      setProductName("");
      setProductDescription("");
      setProductPrice("");
      setProductCategory("");
      handleClose();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {};
        error.inner.forEach((e) => {
          errors[e.path] = e.message;
        });
        setValidationErrors(errors);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <Modal open={open} handleClose={handleClose}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        {validationErrors.productName && (
          <div style={{ color: "red" }}>{validationErrors.productName}</div>
        )}
        <input
          type="text"
          placeholder="Product Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
        {validationErrors.productDescription && (
          <div style={{ color: "red" }}>
            {validationErrors.productDescription}
          </div>
        )}
        <input
          type="text"
          placeholder="Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        {validationErrors.productPrice && (
          <div style={{ color: "red" }}>{validationErrors.productPrice}</div>
        )}
        <input
          type="text"
          placeholder="Product Category"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
        />
        {validationErrors.productCategory && (
          <div style={{ color: "red" }}>{validationErrors.productCategory}</div>
        )}
      </div>

      <div>
        <button onClick={handleClose}>Cancel</button>
        <button onClick={handleCreate}>Create</button>
      </div>
    </Modal>
  );
};
