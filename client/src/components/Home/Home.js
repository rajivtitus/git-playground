import React, { useState, useEffect } from "react";
//Import Material UI
import { Grow, Grid } from "@material-ui/core";
//Import Styles
import useStyles from "./styles";
//Import Components
import PostsList from "../PostsList/PostsList";
import Form from "../Form/Form";
//Import Dispatch & Actions
import { useDispatch } from "react-redux";
//Import Actions
import { fetchPosts } from "../../actions/postAction";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Grow in>
      <Grid className={classes.mainContainer} container justify="space-between" align-items="stretch" spacing={3}>
        <Grid item xs={12} sm={8}>
          <PostsList setCurrentId={setCurrentId} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
      </Grid>
    </Grow>
  );
};

export default Home;
