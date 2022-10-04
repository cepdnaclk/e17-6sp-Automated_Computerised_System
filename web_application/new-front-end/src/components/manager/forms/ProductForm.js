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
      name: 'productName',
      type: 'text',
      placeholder: 'Product Name',
    },
    {
      id: 2,
      name: 'unitPrice',
      type: 'number',
      placeholder: 'Unit Price',
    }
  ];

export default function ProductForm() {

    const history = useHistory();

  const [values, setValues] = useState({
    productName: '',
    unitPrice: '',
  });

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(values);
    setValues({
        productName: '',
        unitPrice: '',    
    });
  }

  return (
    <div className="app-2">
      <div className="container-card">
        <div className="title-2">New Product</div>
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
