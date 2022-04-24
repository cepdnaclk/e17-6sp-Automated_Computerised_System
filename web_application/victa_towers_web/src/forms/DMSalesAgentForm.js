import { useState } from 'react';

import '../styles/form.css';
import FormInput from '../components/FormInput/FormInput';

export default function DMSalesAgentForm() {
  const [values, setValues] = useState({
    userName: '',
    name: '',
    contact: '',
  });

  const inputs = [
    {
      id: 1,
      name: 'userName',
      type: 'text',
      placeholder: 'Enter the User Name',
    },
    {
      id: 2,
      name: 'name',
      type: 'text',
      placeholder: 'Enter the Name',
    },
    {
      id: 3,
      name: 'contact',
      type: 'text',
      placeholder: 'Enter the Contact Number',
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  console.log(values);
  return (
    <div className="app-2">
      <div className="container-card">
        <div className="title-2">Add Agent</div>
        <br></br>
        <br></br>
        <form onSubmit={onChange} className="text-center">
          {' '}
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <br></br>
          <br></br>
          <button className="button"> Add </button>
        </form>
      </div>
    </div>
  );
}
