import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigationbar from "./components/Navigationbar.jsx";
import Main from "./components/Main.jsx";
import Favourites from "./components/Favourites.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Navigationbar />
      <Switch>
        <Route path="/" exact render={(props) => <Main {...props} />} />
        <Route
          path="/favourites"
          render={(props) => <Favourites {...props} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
