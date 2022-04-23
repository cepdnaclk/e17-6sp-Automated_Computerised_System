import { useState } from 'react';

import '../styles/form.css';
import FormInput from '../components/FormInput/FormInput';

function FMProductDetailsAddForm() {
  const [values, setValues] = useState({
    productName: '',
    productPrice: '', //float
  });

  const inputs = [
    {
      id: 1,
      name: 'productName',
      type: 'text',
      placeholder: 'Enter for Product name',
    },
    {
      id: 2,
      name: 'productPrize',
      type: 'text',
      placeholder: 'Enter Product Prize',
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  console.log(values);
  return (
    <div className="app-2">
      <div className="container-card">
        <div className="title-2">Add New Products</div>
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
          <button className="button"> Submit </button>
        </form>
      </div>
    </div>
  );
}

export default FMProductDetailsAddForm;
