import React, { useEffect } from "react";
import User from "../User/User";
import Post from "../Post/Post";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getFollowingPosts } from "../../Actions/User";
import Loader from "../Loader/Loader";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  // For like and unlike post
  const { error: likeError, message } = useSelector((state) => state.like);

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
  }, [dispatch]);

  // To show the like and unlike message
  useEffect(() => {
    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      if (message == "Post Liked") {
        alert.success(message);
      } else if (message == "Post Unliked") {
        alert.error(message);
      }
      dispatch({ type: "clearMessage" });
    }
  }, [alert, likeError, message, dispatch]);

  // For post of the following users
  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );

  // For all the users
  const { users, loading: usersLoading } = useSelector(
    (state) => state.allUsers
  );

  console.log(users, "USERSSSSSs")

  return loading === true || usersLoading === true ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="homeleft">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              // postImage="https://picsum.photos/200"
              postId={post?._id}
              caption={post?.caption}
              postImage={post?.image?.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
            />
          ))
        ) : (
          <Typography>No posts yet</Typography>
        )}
      </div>
      <div className="homeright">
        {users && users.length > 0 ? (
          users.map((user) => (
            <User
              key={user._id}
              userId={user?._id}
              name={user?.name}
              avatar={user?.avatar?.url}
            />
          ))
        ) : (
          <Typography>No users yet</Typography>
        )}
      </div>
    </div>
  );
};

export default Home;
