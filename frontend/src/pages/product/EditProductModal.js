import React from "react";
import axios from "axios";
import { useProductContext } from "../../context/ProductsContext";
import { useUserContext } from "../../context/UserContext";
import { useNotificationContext } from "../../context/NotificationContext";
import { Modal } from "../../components/Modal/Modal";
import { Button, Form, Input, InputNumber } from "antd";

export const EditProductModal = (props) => {
  const { handleClose, open, selectedProduct, id } = props;
  const { Update_Product } = useProductContext();
  const { currentUser } = useUserContext();

  const { successNotification, warningNotification } = useNotificationContext();

  const handleEditButton = async (values) => {
    const updatedProduct = {
      name: values.name,
      description: values.description,
      price: values.price,
      category: values.category,
    };

    try {
      if (
        updatedProduct.name === selectedProduct.name &&
        updatedProduct.price === selectedProduct.price &&
        updatedProduct.description === selectedProduct.description &&
        updatedProduct.category === selectedProduct.category
      ) {
        warningNotification("Nothing changed");
        handleClose();
      } else {
        const response = await axios.put(
          `https://fullstack-backend-zsxe.onrender.com/products/${id}`,
          updatedProduct,
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );

        const data = await response.data;

        Update_Product(data);

        successNotification("Product edited successfully");
        handleClose();
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <Modal handleClose={handleClose} open={open}>
        {selectedProduct && (
          <Form
            initialValues={{
              name: selectedProduct.name,
              description: selectedProduct.description,
              category: selectedProduct.category,
              price: selectedProduct.price,
            }}
            name="trigger"
            onFinish={(values) => {
              handleEditButton(values);
            }}
            onFinishFailed={(errorInfo) => {
              console.log(errorInfo);
            }}
            style={{
              maxWidth: 600,
            }}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Required" },
                { min: 4, message: "must be more than 4 characters" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ min: 1, required: true, type: "number" }]}
            >
              <InputNumber
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input />
            </Form.Item>

            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                marginTop: "10px",
                gap: "10px",
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ width: "100%" }}
              >
                Submit
              </Button>
              <Button
                block
                onClick={() => {
                  handleClose();
                }}
                style={{ width: "100%" }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Modal>
    </div>
  );
};
