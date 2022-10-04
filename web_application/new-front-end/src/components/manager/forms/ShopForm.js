/*
  * Form is rechecked
*/

import { useState } from 'react';
import { useHistory } from "react-router-dom";

import '../../../styles/form.css';
import FormInput from '../../forms/FormInput';

const inputs = [
    {
      id: 1,
      name: 'shopName',
      type: 'text',
      placeholder: 'Shop Name',
    },
    {
      id: 2,
      name: 'address',
      type: 'text',
      placeholder: 'Address',
    },
    {
        id: 3,
        name: 'contact',
        type: 'text',
        placeholder: 'Contact',
    }
  ];

export default function ShopForm() {

    const history = useHistory();

  const [values, setValues] = useState({
    shopName: '',
    address: '',
    contact: '',
  });

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(values);
    setValues({
      shopName: '',
      address: '',
      contact: '',    
    });
  }

  return (
    <div className="app-2">
      <div className="container-card">
        <div className="title-2">Shop Details</div>
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
          <br></br>
          <br></br>
          <button className="button" type='submit'> Enter </button>
        </form>
      </div>
    </div>
  );
}
