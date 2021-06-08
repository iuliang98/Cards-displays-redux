
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserGists from './pages/user_gists';
import{
  getGists,
} from "./redux/actions/gist.action"

const App = (props) => {  


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={UserGists} />
        </Switch>
      </Router>

    </div>
  );
};
export default App;
