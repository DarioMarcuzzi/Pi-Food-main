import './App.css';
import{ BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from '../src/component/home/Home.jsx';
import LandingPage from './component/landingPage/LandingPage.jsx';
import Detail from './component/reciteDetail/Detail.jsx';
import CreateRecite from './component/createRecite/CreateRecite.jsx';


function App() {
  return (
    <BrowserRouter>
          <div className="App">
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/recipes" component={Home} />
              <Route exact path="/recipes:id" component={Detail} />
              <Route exact path="/recipes/create" component={CreateRecite} />
            </Switch>
          </div>
    </BrowserRouter>
  );
}

export default App;
