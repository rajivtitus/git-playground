import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    }
  },
  heading: {
    color: "#00B7FF",
    fontFamily: "'Catamaran', 'sans-serif'",
    textDecoration: "none",
  },
  image: {
    marginLeft: "15px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    }
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'space-around',
    }
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
}));
