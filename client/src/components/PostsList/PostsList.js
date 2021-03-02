import React from "react";
import useStyles from "./styles";
import { Grid, CircularProgress } from "@material-ui/core";
//Import Components
import Post from "./Post/Post";
//Import State From Store
import { useSelector } from "react-redux";

const PostsList = ({ setCurrentId }) => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid container className={classes.container} alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid item key={post._id} xs={12} sm={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PostsList;
