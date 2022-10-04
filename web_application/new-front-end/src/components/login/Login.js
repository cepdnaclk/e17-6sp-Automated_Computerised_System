/*
  * Form is rechecked
*/

import { useState } from 'react';
import { useHistory } from "react-router-dom";

import './styles/login.css';
import "../../styles/dropdown.css";
import FormInput from '../forms/FormInput';

const inputs = [
  {
    id: 1,
    name: 'userName',
    type: 'text',
    placeholder: 'Enter your Username',
  },
  {
    id: 2,
    name: 'passWord',
    type: 'text',
    placeholder: 'Enter Your Password',
  },
];

function Login() {

  const history = useHistory();

  const [values, setValues] = useState({
    userName: '',
    passWord: '',
    role: 'ma',
  });

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(values);
    let path;
    switch(values.role) {
      case "ma":
        path = '/ma';
        break;
      case "fm":
        path = '/fm';
        break;
      case "dm":
        path = '/dm';
        break;
      case "sa":
        path = '/sa';
        break;
      default:
        path = '/login';
    } 
    history.replace(path);
  }

  return (
    <div className="app">
      <div className="container-card">

        <div className="title">Log In </div>

        <br></br><br></br>

        <form onSubmit={onSubmitHandler}>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChangeHandler}
            />
          ))}

          <select id="role" name="role" className='dropdown' onChange={onChangeHandler}>
            <option value="ma">Manager</option>
            <option value="fm">Factory Manager</option>
            <option value="dm">Distribution Manager</option>
            <option value="sa">Sales Agent</option>
          </select>

          <br></br><br></br><br></br>

          <button className="button" type="submit"> Submit </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
