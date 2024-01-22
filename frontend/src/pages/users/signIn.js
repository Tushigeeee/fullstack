import React from "react";
import { Header } from "../../components/header/Header";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { useUserContext } from "../../context/UserContext";
import { useNotificationContext } from "../../context/NotificationContext";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const { signIn } = useUserContext();
  const { successNotification, errorNotification } = useNotificationContext();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        // `http://localhost:8080/users/sign-in"/users/sign-in`,
        "http://localhost:8080/users/sign-in",
        {
          email: values.email,
          password: values.password,
        }
      );

      const data = response.data;
      localStorage.setItem("user", JSON.stringify(data));

      if (data) {
        signIn(data);
        successNotification("Sign in successful");
        navigate("/");
      } else {
        errorNotification("Sign in failed, please try again");
      }
    } catch (err) {
      errorNotification(err?.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Form submission failed:", errorInfo);
  };

  return (
    <div
      style={{
        height: "95vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Header />

      <h1
        style={{
          paddingTop: "200px",
          color: "#81B2D9",
        }}
      >
        Login
      </h1>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          paddingTop: "20px",
          maxWidth: 600,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          style={{ color: "white" }}
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
