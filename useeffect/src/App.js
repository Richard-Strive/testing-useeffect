import logo from "./logo.svg";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigationbar from "./components/Navigationbar.jsx";
import Main from "./components/Main.jsx";
import Favourites from "./components/Favourites.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeContext, initialState } from "./components/context/theme";

function App() {
  const [theme, setTheme] = useState(initialState);
  return (
    <Router>
      <ThemeContext.Provider value={[theme, setTheme]}>
        <Navigationbar />
        <Switch>
          <Route path="/" exact render={(props) => <Main {...props} />} />
          <Route
            path="/favourites"
            render={(props) => <Favourites {...props} />}
          />
        </Switch>
      </ThemeContext.Provider>
    </Router>
  );
}

export default App;
