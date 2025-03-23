import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header, Footer, Home, Names, Trinkets, Characters, Loot, Happenstances } from "./components";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/names" exact component={() => <Names />} />
          <Route path="/trinkets" exact component={() => <Trinkets />} />
          <Route path="/characters" exact component={() => <Characters />} />
          <Route path="/loot" exact component={() => <Loot />} />
          <Route path="/happenstances" exact component={() => <Happenstances/>}/>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
