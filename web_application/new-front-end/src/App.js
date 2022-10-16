import './App.css';
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import DmPage from './pages/DmPage';
import FmPage from './pages/FmPage';
import SaPage from './pages/SaPage';
import ManagerPage from './pages/ManagerPage';
import { useContext } from 'react';
import AuthContext from './store/AuthContext';

function App() {
  const authCtx = useContext(AuthContext);
  const isLogin = authCtx.isLogin;

  return (
    <div className="App">
      {/*<h1>Main Page</h1>*/}
      <Switch>
        <Route path='/' exact><Redirect to='/login'/></Route>
        <Route path='/login' exact>
            <LoginPage />
        </Route>
        {isLogin &&
          <>
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
          </>
        } 
        <Route path='/*' exact><Redirect to='/login'/></Route>
      </Switch>
    </div>
  );
}

export default App;
