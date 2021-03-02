import React, { useState } from "react";
//Import Styles
import { Avatar, Button, Container, Grid, Paper, TextField, Typography } from "@material-ui/core";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
//Import Components
import Input from "./Input";
import Icon from "./icon";
import { GoogleLogin } from "react-google-login";
//Import Dispatch and Actions
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUp, signIn } from "../../actions/authAction";
import { LOGIN } from "../../constants/actionTypes";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSignup) {
      dispatch(signUp(formData, history));
    } else {
      dispatch(signIn(formData, history));
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({
        type: LOGIN,
        payload: { result, token },
      });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccesful!");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  value={formData.firstName}
                  half
                />

                <Input name="lastName" label="Last Name" handleChange={handleChange} value={formData.lastName} half />
              </>
            )}
            <Input name="email" label="Email" type="email" handleChange={handleChange} value={formData.email} />
            <Input
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
              value={formData.password}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
                value={formData.confirmPassword}
              />
            )}
          </Grid>
          <Button className={classes.submit} type="submit" variant="contained" color="primary" fullWidth>
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="581228204538-nqpudjlrbccmt0o0ls6gjfddl1sie2u3.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                variant="contained"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                color="primary"
                startIcon={<Icon />}
                fullWidth
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? "Already have an account? Sign In" : "Don't have an account? Register here"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
