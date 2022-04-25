import { useState } from 'react';

import '../styles/form.css';
import FormInput from '../components/FormInput/FormInput';

export default function DMIssueProductForm() {
  const [values, setValues] = useState({
    productName: '',
    batchNumber: '',
    issuedAmount: '',
    shippingDate: '',
    salesAgent: '',
    shop: '',
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
      name: 'issuedQuantity',
      type: 'text',
      placeholder: 'Enter the Received Amount',
    },
    {
      id: 4,
      name: 'shippingDate',
      type: 'date',
      placeholder: 'Enter the Received Amount',
    },
    {
      id: 5,
      name: 'salesAgent',
      type: 'text',
      placeholder: 'Enter the Sales agent',
    },
    {
      id: 6,
      name: 'shop',
      type: 'text',
      placeholder: 'Enter the Shop Name',
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  console.log(values);
  return (
    <div className="app-2">
      <div className="container-card">
        <div className="title-2">Enter Issued Product Details</div>
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
          <button className="button"> Issue </button>
        </form>
      </div>
    </div>
  );
}
