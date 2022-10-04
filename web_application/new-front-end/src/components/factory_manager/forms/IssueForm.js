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
      name: 'batchNumber',
      type: 'text',
      placeholder: 'Batch Number',
    },
    {
      id: 2,
      name: 'issueDate',
      type: 'Date',
      placeholder: 'Product Issuing Date',
    }
  ];

export default function IssueForm() {

    const history = useHistory();

  const [values, setValues] = useState({
    batchNumber: '',
    issueDate: '',
  });

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(values);
    setValues({
        batchNumber: '',
        issueDate: '',    
    });
  }

  return (
    <div className="app-2">
      <div className="container-card">
        <div className="title-2">Issue Products</div>
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
          <button className="button" type='submit'> Issue </button>
        </form>
      </div>
    </div>
  );
}
