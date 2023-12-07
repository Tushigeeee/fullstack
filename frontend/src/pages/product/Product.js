import React, { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { EditProductModal } from "./EditProductModal";
import "./product.css";
import { DeleteProductModal } from "./DeleteProductModl";

export const SingleProduct = () => {
  const [product, setProduct] = useState();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/products/${id}`
        );
        const data = await response.data;
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleEditModalOpen = () => setEditModalOpen(true);
  const handleEditModalClose = () => setEditModalOpen(false);

  const handleEditProduct = (productId, updatedProduct) => {
    setProduct((prevProduct) => ({ ...prevProduct, ...updatedProduct }));
  };
  const handleDeleteOpen = () => setOpenDeleteModal(true);
  const handleDeleteClose = () => setOpenDeleteModal(false);

  const handleDeleteProduct = (productId) => {
    console.log(`Product has been deleted.`);
  };
  if (!product) {
    return <div>Item not found</div>;
  }
  return (
    <div className="product-single-container">
      <Header />
      <div className="product-single-content">
        <h2>This is Single Product Page</h2>
        {product && (
          <div className="product-details">
            <h3>Name: {product.name}</h3>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            <p>Category: {product.category}</p>
            <button onClick={handleEditModalOpen}>Edit</button>
            <button onClick={handleDeleteOpen}>Delete</button>
          </div>
        )}
      </div>
      <EditProductModal
        open={editModalOpen}
        handleClose={handleEditModalClose}
        product={product}
        handleEditProduct={handleEditProduct}
      />
      <DeleteProductModal
        open={openDeleteModal}
        handleClose={handleDeleteClose}
        product={product}
        handleDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
};
