import { useState } from 'react';

import '../styles/form.css';
import FormInput from '../components/FormInput/FormInput';

export default function FMIssueProductForm() {
  const [values, setValues] = useState({
    productName: '',
    batchNo: '',
    issuedDate: '',
    issuedQuantity: '', //integer
  });

  const inputs = [
    {
      id: 1,
      name: 'productName',
      type: 'text',
      placeholder: 'Enter Product name',
    },
    {
      id: 2,
      name: 'batchNo',
      type: 'integer',
      placeholder: 'Enter Batch Number',
    },
    {
      id: 3,
      name: 'issuedDate',
      type: 'Date',
      placeholder: 'Enter Product Issuing Date',
    },
    {
      id: 4,
      name: 'issuedQuantity',
      type: 'integer',
      placeholder: 'Enter Product Issuing Quantity',
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  console.log(values);
  return (
    <div className="app-2">
      <div className="container-card">
        <div className="title-2">Issue Products</div>
        <br></br>
        <br></br>
        <form onSubmit={onChange}>
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
