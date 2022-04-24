import { useState } from 'react';

import '../styles/form.css';
import FormInput from '../components/FormInput/FormInput';

export default function DMShopsForm() {
  const [values, setValues] = useState({
    shopID: '',
    shopName: '',
    location: '',
    contact: '',
  });

  const inputs = [
    {
      id: 1,
      name: 'shopID',
      type: 'text',
      placeholder: 'Enter the Shop ID',
    },
    {
      id: 2,
      name: 'shopName',
      type: 'text',
      placeholder: 'Enter the Shop Name',
    },
    {
      id: 2,
      name: 'location',
      type: 'text',
      placeholder: 'Enter the Shop Name',
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
        <div className="title-2">Add Shop</div>
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
