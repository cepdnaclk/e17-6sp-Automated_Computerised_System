/*
  * Form is rechecked
*/

import { useState } from 'react';
import { useHistory } from "react-router-dom";

import '../../../styles/form.css';
import FormInput from '../../forms/FormInput';
import "../../../styles/dropdown.css";

const inputs = [
    {
      id: 1,
      name: 'userName',
      type: 'text',
      placeholder: 'UserName',
    },
    {
      id: 2,
      name: 'passWord',
      type: 'text',
      placeholder: 'Password',
    },
    {
        id: 3,
        name: 'name',
        type: 'text',
        placeholder: 'Name',
    },
    {
        id: 4,
        name: 'contact',
        type: 'text',
        placeholder: 'Contact',
    }
  ];

export default function UserForm() {

    const history = useHistory();

  const [values, setValues] = useState({
    userName: '',
    passWord: '',
    name: '',
    contact: '',
    role: 'fm',
  });

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(values);
    setValues({
      userName: '',
      passWord: '',
      name: '',
      contact: '',
      role: 'fm',    
    });
  }

  return (
    <div className="app-2">
      <div className="container-card">
        <div className="title-2">Employee Details</div>
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

        <select id="role" name="role" className='dropdown' onChange={onChangeHandler}>
            <option value="fm">Factory Manager</option>
            <option value="dm">Distribution Manager</option>
            <option value="sa">Sales Agent</option>
          </select>
          
          <br></br><br></br><br></br>

          <button className="button" type='submit'> Enter </button>
        </form>
      </div>
    </div>
  );
}
