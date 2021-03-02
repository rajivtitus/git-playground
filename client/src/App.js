import React from "react";
//Import Material UI
import { Container } from "@material-ui/core";
//Import Routing
import { Switch, Route } from "react-router-dom";
//Import Components
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

function App() {
  return (
    <Container maxWidth="lg">
      <Nav />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
