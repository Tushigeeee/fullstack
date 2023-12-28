import React, { useState } from "react";
import { Header } from "../../components/header/Header";
import { useParams } from "react-router-dom";
import { EditProductModal } from "./EditProductModal";
import "./product.css";
import { DeleteProductModal } from "./DeleteProductModal";
import { useProductContext } from "../../context/ProductsContext";
import { Button, Flex } from "antd";

export const SingleProduct = () => {
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const { products, productContextLoading } = useProductContext();

  const selectedProduct = products.find((product) => product._id === id);

  if (productContextLoading) {
    return <div>...Loading Products</div>;
  } else {
    return (
      <div
        style={{
          flexDirection: "column",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Header />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            paddingTop: "10x",
          }}
        >
          This is Single Product page
          <Flex style={{ gap: "10px", wrap: "wrap" }}>
            <Button block onClick={handleOpen}>
              {" "}
              Edit
            </Button>
            <Button block onClick={handleOpenDelete}>
              {" "}
              Delete
            </Button>
          </Flex>
        </div>
        {selectedProduct && (
          <div
            style={{
              backgroundColor: "whitesmoke",
              height: "50%",
              width: "80%",
              borderRadius: "10px",
              padding: "20px",
              margin: "20px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                width: "40%",
              }}
            >
              <h3>Name : {selectedProduct.name}</h3>
              <p>Description : {selectedProduct.description}</p>
              <p>Price : {selectedProduct.price}</p>
              <p>Category : {selectedProduct.category}</p>
            </div>
          </div>
        )}

        <EditProductModal
          handleClose={handleClose}
          open={open}
          selectedProduct={selectedProduct}
          id={id}
        />
        <DeleteProductModal
          handleCloseDelete={handleCloseDelete}
          openDelete={openDelete}
          selectedProduct={selectedProduct}
          id={id}
        />
      </div>
    );
  }
};
