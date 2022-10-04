import './App.css';
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import DmPage from './pages/DmPage';
import FmPage from './pages/FmPage';
import SaPage from './pages/SaPage';
import ManagerPage from './pages/ManagerPage';

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
        <Route path='/fm' exact>
          <FmPage />
        </Route>
        <Route path='/sa' exact>
          <SaPage />
        </Route>
        <Route path='/ma' exact>
          <ManagerPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
