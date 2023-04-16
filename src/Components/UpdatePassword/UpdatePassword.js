import React, { useEffect, useState } from "react";
import "./UpdatePassword.css";
import "react-toastify/dist/ReactToastify.css";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../Actions/User";
import { useAlert } from "react-alert";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, message } = useSelector((state) => state.like);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updatePassword(oldPassword, newPassword));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, alert, error, message]);
  return (
    <div className="updatePassword">
      <form className="updatePasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3">Social App</Typography>

        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          className="updatePasswordInputs"
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          className="updatePasswordInputs"
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Button type="submit" disabled={loading}>
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
