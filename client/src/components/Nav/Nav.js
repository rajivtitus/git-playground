import React, { useState, useEffect } from "react";
//Import Material UI
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
//Import Styles
import useStyles from "./styles";
//Import Images
import logo from "../../images/logo.png";
//Import Dispatch and Routing
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { LOGOUT } from "../../constants/actionTypes";
import decode from "jwt-decode";

const Nav = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userProfile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("userProfile")));
  }, [location]);

  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
    history.push("/auth");
    setUser(null);
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
          Capture
        </Typography>
        <img className={classes.image} src={logo} alt="memories" height="50" width="50" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar src={user.result.imageUrl} alt={user.result.name}>
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button className={classes.logout} variant="contained" color="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button className={classes.login} component={Link} to="/auth" varaint="contained">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
