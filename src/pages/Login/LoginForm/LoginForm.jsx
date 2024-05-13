import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./LoginForm.css";
import LoginButton from "../../../Components/Button/Button";
import { MdLogin, MdOutlinePassword } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [fetchCompleted, setFetchCompleted] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });


  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const res = await axios.post(
        "https://cors-anywhere.herokuapp.com/https://carxier-dev.tahrtech.in/api/v1/auth/signin",
        values,
      );
      setFetchCompleted(true);
      
      // if (res.data === "exist") {
      //  navigate('/employee');
      // } else if (res.data === "notexist") {
      //   setFieldError("email", "User is not signed up");
      // }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }console.log(fetchCompleted);

    setSubmitting(false);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-align with-background-image">
      <h3 className="sign_head">Admin Login</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form-login">
            <div className="login-space">
              <div className="input-container">
                <div style={{ position: "relative" }}>
                  <MdLogin
                    icon={faEnvelope}
                    className="input-icon"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "35px",
                      transform: "translateY(-50%)",
                    }}
                  />
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control pl-5"
                  />
                </div>
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>
            <div className="login-space relative-position">
              <div className="input-container">
                <div style={{ position: "relative" }}>
                  <MdOutlinePassword
                    icon={faEnvelope}
                    className="input-icon"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "35px",
                      transform: "translateY(-50%)",
                    }}
                  />
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="form-control"
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    className="input-icon"
                    onClick={togglePasswordVisibility}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "35px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>
            <LoginButton type="submit" disabled={isSubmitting}/>
             
          </Form>
        )}
      </Formik>
      <div className="sign-link">
        <p>By Proceeding, you agree to Terms and privacy</p>
      </div>
    </div>
  );
};

export default LoginForm;
