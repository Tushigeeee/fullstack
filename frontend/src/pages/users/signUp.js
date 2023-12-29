import React, { useState } from "react";
import { Header } from "../../components/header/Header";
import axios from "axios";
import { Form, Input, Button, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useNotificationContext } from "../../context/NotificationContext";

const SignUp = () => {
  const [user, setUser] = useState({});
  const { signUp } = useUserContext();
  const { successNotification, errorNotification } = useNotificationContext();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        `https://fullstack-backend-zsxe.onrender.com/users/sign-up`,
        {
          name: values.name,
          email: values.email,
          password: values.password,
        }
      );

      const data = response.data;
      localStorage.setItem("user", JSON.stringify(data));

      if (data) {
        signUp(data);
        setUser(data.user);
        successNotification(`Sign Up successful, Hello ${user.email}`);
        navigate("/");
      } else {
        errorNotification("Sign up failed, please try again");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        errorNotification(err.response.data);
      } else {
        errorNotification("Unknown error");
      }
    }
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
          paddingTop: "100px",
          color: "#81B2D9",
        }}
      >
        Sign Up
      </h1>
      <Form
        name="register"
        onFinish={onFinish}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="User Name"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not a valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              symbols: true,
              message: "must include symbols!",
            },
            {
              min: 6,
              message: "minimum must include 6 characters",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered does not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept the agreement")),
            },
          ]}
        >
          <Checkbox>I have read the agreement</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
