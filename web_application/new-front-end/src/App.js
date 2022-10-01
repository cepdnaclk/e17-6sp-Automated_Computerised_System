import './App.css';
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import DmPage from './pages/DmPage';

function App() {
  return (
    <div className="App">
      {/*<h1>Main Page</h1>*/}
      <Switch>
        <Route path='/' exact><Redirect to='/login'/></Route>
        <Route path='/login' exact>
          <LoginPage />
        </Route>
        <Route path='/dm' exact>
          <DmPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
