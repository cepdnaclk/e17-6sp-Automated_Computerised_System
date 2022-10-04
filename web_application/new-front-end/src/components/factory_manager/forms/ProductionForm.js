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
      placeholder: 'Product name',
    },
    {
      id: 2,
      name: 'batchNumber',
      type: 'text',
      placeholder: 'Batch Number',
    },
    {
      id: 3,
      name: 'productDate',
      type: 'Date',
      placeholder: 'Production Date',
    },
    {
      id: 4,
      name: 'quantity',
      type: 'integer',
      placeholder: 'Product Quantity',
    },
  ];


export default function ProductionForm() {

    const history = useHistory();

  const [values, setValues] = useState({
    productName: '',
    batchNumber: '',
    productDate: '',
    quantity: '', //integer
  });

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(values);
    setValues({
      productName: '',
      batchNumber: '',
      productDate: '',
      quantity: '', //integer
    });
  }

  return (
    <div className="app-2">
      <div className="container-card">
        <div className="title-2">Manufactured Products</div>
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
          <button className="button" type='submit'> Insert </button>
        </form>
      </div>
    </div>
  );
}
