/*
 * Form is rechecked
 */

import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import "./styles/login.css";
import "../../styles/dropdown.css";
import FormInput from "../forms/FormInput";
import AuthContext from "../../store/AuthContext";

const inputs = [
  {
    id: 1,
    name: "userName",
    type: "text",
    placeholder: "Enter your Username",
  },
  {
    id: 2,
    name: "passWord",
    type: "text",
    placeholder: "Enter Your Password",
  },
];

function Login() {
  const authCtx = useContext(AuthContext);

  const history = useHistory();

  const [display, setDisplay] = useState("");

  const [values, setValues] = useState({
    userName: "",
    passWord: "",
    role: "ma",
  });

  const onChangeHandler = (e) => {
    setDisplay("");
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(values);
    let url = "http://localhost:8080/api/login/";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        userName: values.userName,
        passWord: values.passWord,
        role: values.role,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          res
            .json()
            .then((data) => {
              console.log(data.token);
              console.log(data.userDetails);
              authCtx.storeToken(data.token);
              authCtx.storeBody(data.userDetails);
              let path;
              switch (values.role) {
                case "ma":
                  path = "/ma";
                  break;
                case "fm":
                  path = "/fm";
                  break;
                case "dm":
                  path = "/dm";
                  break;
                case "sa":
                  path = "/sa";
                  break;
                default:
                  path = "/login";
              }
              history.replace(path);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setDisplay("auth-display");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="app">
      <div className="container-card">
        <div className="title">Log In </div>

        <br></br>
        <br></br>

        <form onSubmit={onSubmitHandler}>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChangeHandler}
            />
          ))}

          <select
            id="role"
            name="role"
            className="dropdown"
            onChange={onChangeHandler}
          >
            <option value="ma">Manager</option>
            <option value="fm">Factory Manager</option>
            <option value="dm">Distribution Manager</option>
            <option value="sa">Sales Agent</option>
          </select>
          <div className={`auth ${display}`}>
            <h4>Authentication Failed</h4>
          </div>
          <br></br>
          <br></br>
          <br></br>

          <button className="button" type="submit">
            {" "}
            Submit{" "}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
