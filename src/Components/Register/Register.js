import { Avatar, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Actions/User";
import { useAlert } from "react-alert";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error } = useSelector((state) => state.user);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (avatar === "" || avatar === undefined) {
      toast.error("Please select a avatar");
    } else if (name === "" || name === undefined) {
      toast.error("Please enter your name");
    } else if (email === "" || email === undefined) {
      toast.error("Please enter your email");
    } else if (password === "" || password === undefined) {
      toast.error("Please enter your password");
    } else {
      dispatch(registerUser(name, email, password, avatar));
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, alert, error]);

  return (
    <div className="register">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
      />
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography variant="h3">Social App</Typography>

        <Avatar
          src={avatar}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input type="file" accept="image/" onChange={handleImageChange} />

        <input
          type="text"
          placeholder="Name"
          value={name}
          className="registerInputs"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          className="registerInputs"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          className="registerInputs"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/">
          <Typography variant="h6">Already Signed Up? Login Now</Typography>
        </Link>

        <Button type="submit" disabled={loading}>
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Register;
