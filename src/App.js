import React from "react";
import "./styles.css";
import Meme from "./Meme/Meme";
import { Switch, Route } from "react-router-dom";
import MemeGenerated from "./Memegenerated/MemeGenerated";
export default function App() {
  return (
    <div>
      <h2>Meme Creator</h2>
      <Switch>
        <Route exact path="/">
          <Meme />
        </Route>
        <Route path="/generated">
          <MemeGenerated />
        </Route>
      </Switch>
    </div>
  );
}
