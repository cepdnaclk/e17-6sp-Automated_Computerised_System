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
      name: 'storedDate',
      type: 'Date',
      placeholder: 'Stored Date',
    },
    {
      id: 3,
      name: 'storedQuantity',
      type: 'integer',
      placeholder: 'Stored Quantity',
    },
  ];


export default function UnloadedForm() {

  const [values, setValues] = useState({
    batchNumber: '',
    storedDate: '',
    storedQuantity: '', //integer
  });

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(values);
    setValues({
      batchNumber: '',
      storedDate: '',
      storedQuantity: '',
    });
  }

  return (
    <div className="app-2">
      <div className="container-card">
        <div className="title-2">Unloaded Products</div>
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
          <button className="button" type='submit'> Unload </button>
        </form>
      </div>
    </div>
  );
}
