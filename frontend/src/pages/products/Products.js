import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd"; // Correct import statement
import "./Products.css";
import { Header } from "../../components/header/Header";
import { CreateProductModal } from "./CreateProductModal";
import { useProductContext } from "../../context/ProductsContext";

export const Products = () => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { products, productContextLoading } = useProductContext();

  if (productContextLoading) {
    return <div>...Loading Products</div>;
  }

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

        {products &&
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
          ))}
      </div>
      <CreateProductModal open={open} handleClose={handleClose} />
    </div>
  );
};
