import { useState } from 'react';

import '../styles/form.css';
import FormInput from '../components/FormInput/FormInput';

export default function DMReceiveProductForm() {
  const [values, setValues] = useState({
    productName: '',
    batchNumber: '',
    receivedAmount: '',
  });

  const inputs = [
    {
      id: 1,
      name: 'productName',
      type: 'text',
      placeholder: 'Enter the Product Name',
    },
    {
      id: 2,
      name: 'batchNumber',
      type: 'text',
      placeholder: 'Enter the batch Number',
    },
    {
      id: 3,
      name: 'receivedAmount',
      type: 'text',
      placeholder: 'Enter the Received Amount',
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  console.log(values);
  return (
    <div className="app-2">
      <div className="container-card">
        <div className="title-2">Enter the Received Product Details</div>
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
