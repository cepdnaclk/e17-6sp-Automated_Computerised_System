import React, { useState } from "react";

const AuthContext = React.createContext({
  isLogin: false,
  token: "",
  body: {},
  storeToken: (token) => {},
  storeBody: (body) => {},
  setLogout: () => {}
});


export const AuthContextProvider = (props) => {
  
  const [token, setToken] = useState("");
  const [login, setLogin] = useState(false);
  const [body, setBody] = useState({});

  const storeTokenHandler = (token) => {
    setToken(token);
    setLogin(true);
  };
  const storeBodyHandler = (body) => {
    setBody(body);
  };

  const setLogoutHandler = () => {
    setLogin(false);
    setToken("");
    setBody({});
  };

  const contextValue = {
    isLogin: login,
    token: token,
    body: body,
    storeToken: storeTokenHandler,
    storeBody: storeBodyHandler,
    setLogout: setLogoutHandler
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;