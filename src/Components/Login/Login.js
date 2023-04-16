import React, { useEffect, useState } from "react";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/User";
import { useAlert } from "react-alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.like);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, dispatch, error, message]);

  const loginHandler = (e) => {
    e.preventDefault();

    if (email === "" || email === undefined) {
      toast.error("Please enter the email");
    } else if (password === "" || password === undefined) {
      toast.error("Please enter the password");
    } else {
      dispatch(loginUser(email, password));
    }
  };

  return (
    <div className="login">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
      />
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography variant="h3">Social App</Typography>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/forgot/password">
          <Typography variant="h6">Forgot Password</Typography>
        </Link>

        <Button type="submit">Login</Button>

        <Link to="/register">
          <Typography variant="h6">New User?</Typography>
        </Link>
      </form>
    </div>
  );
};

export default Login;
