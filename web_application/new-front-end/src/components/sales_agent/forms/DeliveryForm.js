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
      name: 'distributionOrderId',
      type: 'text',
      placeholder: 'Order Id',
    },
    {
        id: 2,
        name: 'deliveredQuantity',
        type: 'number',
        placeholder: 'Delivered Quantity',
    },
    {
      id: 3,
      name: 'deliveredDate',
      type: 'Date',
      placeholder: 'Delivered Date',
    }
  ];

export default function DeliveryForm() {

    const history = useHistory();

  const [values, setValues] = useState({
    distributionOrderId: '',
    deliveredQuantity: '',
    deliveredDate: '',
  });

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(values);
    setValues({
      distributionOrderId: '',
      deliveredQuantity: '',
      deliveredDate: '', 
    });
  }

  return (
    <div className="app-2">
      <div className="container-card">
        <div className="title-2">Delivered Products</div>
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
          <button className="button" type='submit'> Deliver </button>
        </form>
      </div>
    </div>
  );
}
