import React, { useState, useEffect } from "react";
//Import Material UI
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./styles";
//Import FileBase for Photo-String Conversion
import FileBase from "react-file-base64";
//Import Dispatch & Actions
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/postAction";

const Form = ({ currentId, setCurrentId }) => {
  const post = useSelector((state) => (currentId ? state.posts.find((post) => post._id === currentId) : null));
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userProfile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    clearInput();
  };

  const clearInput = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create a post and like other posts!
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form className={`${classes.form} ${classes.root}`} onSubmit={submitHandler} autoComplete="off" noValidate>
        <Typography variant="h6">{currentId ? "Editing" : "Creating"} A Memory</Typography>
        <TextField
          variant="outlined"
          label="Title"
          name="title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          variant="outlined"
          label="Message"
          name="message"
          fullWidth
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />
        <TextField
          variant="outlined"
          label="Tags"
          name="tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          fullWidth
        >
          Submit
        </Button>
        <Button variant="contained" color="secondary" size="medium" fullWidth onClick={clearInput}>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
