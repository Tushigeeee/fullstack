import React from "react";
import { Modal } from "../../components/Modal/Modal";
import axios from "axios";

export const DeleteProductModal = ({
  open,
  handleClose,
  product,
  handleDeleteProduct,
}) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/products/${product._id}`);
      handleDeleteProduct(product._id);
    } catch (error) {
      console.error(error);
    }
    handleClose();
  };

  return (
    <Modal open={open} handleClose={handleClose}>
      <div className="modal-content">
        <p>Are you sure you want to delete ?</p>
      </div>
      <div className="modal-actions">
        <button onClick={handleClose}>Cancel</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </Modal>
  );
};
