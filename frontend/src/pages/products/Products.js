import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import "./Products.css";
import { Header } from "../../components/header/Header";
import { CreateProductModal } from "./CreateProductModal";

export const Products = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/products");
        const data = await response.data;
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="products-container">
      <div>
        <Header />

        <div>
          <Button
            variant="outlined"
            onClick={handleOpen}
            className="create-product-button"
          >
            Create Product
          </Button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {loading ? (
            <p className="loading-message">Loading...</p>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="product-card"
                onClick={() => navigate(`/products/${product._id}`)}
              >
                <h3>Name: {product.name}</h3>
                <p>Description: {product.description}</p>
                <p>Price: {product.price}</p>
                <p>Category: {product.category}</p>
              </div>
            ))
          )}
        </div>
        <CreateProductModal open={open} handleClose={handleClose} />
      </div>
    </div>
  );
};
