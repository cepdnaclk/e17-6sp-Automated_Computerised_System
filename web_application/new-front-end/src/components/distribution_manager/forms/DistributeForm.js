/*
  * Form is rechecked
*/

import { useState } from 'react';

import '../../../styles/form.css'
import FormInput from '../../forms/FormInput';

const inputs = [
    {
      id: 1,
      name: 'batchNumber',
      type: 'text',
      placeholder: 'Batch Number',
    },
    {
      id: 2,
      name: 'quantity',
      type: 'integer',
      placeholder: 'Distribute Quantity',
    },
    {
        id: 3,
        name: 'salesAgentUserName',
        type: 'text',
        placeholder: 'Sales Agent Username',
    },
    {
        id: 4,
        name: 'destinedShopName',
        type: 'text',
        placeholder: 'Destine Shop Name',
    },
  ];


export default function DistributeForm() {

  const [values, setValues] = useState({
    batchNumber: '',
    quantity: '',
    salesAgentUserName: '',
    destinedShopName: '',
  });

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(values);
    setValues({
      batchNumber: '',
      quantity: '',
      salesAgentUserName: '',
      destinedShopName: '',
    });
  }

  return (
    <div className="app-2">
      <div className="container-card">
        <div className="title-2">Distribute Products</div>
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
          <button className="button" type='submit'> Distribute </button>
        </form>
      </div>
    </div>
  );
}
