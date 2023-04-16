import React, { useEffect, useState } from "react";
import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteMyProfile, getMyPosts, logoutUser } from "../../Actions/User";
import Post from "../Post/Post";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import User from "../User/User";
import { toast, ToastContainer } from "react-toastify";

const Account = () => {
  const dispatch = useDispatch();
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.myPosts);
  const {
    error: likeError,
    message,
    loading: deleteLoading,
  } = useSelector((state) => state.like);

  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);

  const logoutHandler = () => {
    dispatch(logoutUser());
    alert.success("Logged out successfully");
  };

  const deleteProfileHandler = async () => {
    await dispatch(deleteMyProfile());
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  useEffect(() => {
    if (likeError) {
      toast.error(likeError);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      if (message == "Post Liked") {
        toast.success(message);
      } else if (message == "Post Unliked") {
        toast.error(message);
      }
      dispatch({ type: "clearMessage" });
    }
  }, [alert, likeError, message, dispatch]);

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
      />
      <div className="account">
        <div className="accountleft">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Post
                key={post?._id}
                // postImage="https://picsum.photos/200"
                postId={post?._id}
                caption={post?.caption}
                postImage={post?.image?.url}
                likes={post?.likes}
                comments={post?.comments}
                ownerImage={post?.owner?.avatar?.url}
                ownerName={post?.owner?.name}
                ownerId={post?.owner?._id}
                isAccount={true}
                isDelete={true}
              />
            ))
          ) : (
            <Typography variant="h6">You have not added any posts</Typography>
          )}
        </div>
        <div className="accountright">
          <Avatar
            src={user?.avatar?.url}
            sx={{ height: "8vmax", width: "8vmax" }}
          />
          <Typography variant="h5">{user?.name}</Typography>
          <div>
            <button onClick={() => setFollowersToggle(!followersToggle)}>
              <Typography>Followers</Typography>
            </button>
            <Typography>{user?.followers?.length}</Typography>
          </div>
          <div>
            <button onClick={() => setFollowingToggle(!followingToggle)}>
              <Typography>Following</Typography>
            </button>
            <Typography>{user?.following?.length}</Typography>
          </div>
          <div>
            <Typography>Posts</Typography>
            <Typography>{user?.posts?.length}</Typography>
          </div>

          <Button variant="contained" onClick={logoutHandler}>
            Logout
          </Button>

          <Link to="/update/profile">Edit Profile</Link>
          <Link to="/update/password">Change Password</Link>

          <Button
            variant="text"
            style={{ color: "red", margin: "2vmax" }}
            onClick={deleteProfileHandler}
            disabled={deleteLoading}
          >
            Delete My Profile
          </Button>

          <Dialog
            open={followersToggle}
            onClose={() => setFollowersToggle(!followersToggle)}
          >
            <div className="DialogBox">
              <Typography variant="h4">Follower(s)</Typography>

              {user && user.followers.length > 0 ? (
                user?.followers?.map((item) => (
                  <User
                    key={item._id}
                    userId={item?._id}
                    name={item?.name}
                    avatar={item?.avatar?.url}
                  />
                ))
              ) : (
                <Typography style={{ marginTop: "2vmax" }}>
                  You have no followers
                </Typography>
              )}
            </div>
          </Dialog>

          <Dialog
            open={followingToggle}
            onClose={() => setFollowingToggle(!followingToggle)}
          >
            <div className="DialogBox">
              <Typography variant="h4">Following</Typography>

              {user && user.following.length > 0 ? (
                user?.following?.map((item) => (
                  <User
                    key={item._id}
                    userId={item?._id}
                    name={item?.name}
                    avatar={item?.avatar?.url}
                  />
                ))
              ) : (
                <Typography style={{ marginTop: "2vmax" }}>
                  You are not following anyone
                </Typography>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default Account;
