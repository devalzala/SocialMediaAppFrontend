import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { resetPassword } from "../../Actions/User";
import "./ResetPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { error, loading, message } = useSelector((state) => state.like);
  const alert = useAlert();
  const params = useParams();
  const token = params?.token;

  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(token, newPassword));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, dispatch, message]);

  return (
    <div className="resetPassword">
      <form className="resetPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3">Social App</Typography>

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          className="resetPasswordInputs"
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Link to="/">
          <Typography>Login</Typography>
        </Link>

        <Typography>Or</Typography>

        <Link to="/forgot/password">
          <Typography>Request Another Token</Typography>
        </Link>

        <Button type="submit" disabled={loading}>
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
