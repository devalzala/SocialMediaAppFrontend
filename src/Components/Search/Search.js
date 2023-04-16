import React, { useState } from "react";
import "./Search.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Actions/User";
import User from "../User/User";

const Search = () => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const { users, loading } = useSelector((state) => state.allUsers);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(name));
  };

  // users api call on change function

  const onChangeHandler = (e) => {
    e.preventDefault();
    setName(e.target.value);

    dispatch(getAllUsers(name));
  };

  return (
    <div className="search">
      <form className="searchForm" onSubmit={submitHandler}>
        <Typography variant="h3">Social App</Typography>

        <input
          type="text"
          placeholder="Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          //   onChange={onChangeHandler}
        />

        <Button type="submit" disabled={loading}>
          Search
        </Button>

        <div className="searchResults">
          {users &&
            users?.map((user) => (
              <User
                key={user?._id}
                userId={user?._id}
                name={user?.name}
                avatar={user?.avatar?.url}
              />
            ))}
        </div>
      </form>
    </div>
  );
};

export default Search;
