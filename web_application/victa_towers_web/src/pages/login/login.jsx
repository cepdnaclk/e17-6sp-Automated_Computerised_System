import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../../styles/login.css';
import FormInput from '../../components/FormInput/FormInput';
import { Dropdown, Option } from '../../components/Dropdown/Dropdown';

function Login() {
  const [values, setValues] = useState({
    username: '',
    password: '',
    role: '',
  });

  const inputs = [
    {
      id: 1,
      name: 'username',
      type: 'text',
      placeholder: 'Enter for Username',
    },
    {
      id: 2,
      name: 'password',
      type: 'text',
      placeholder: 'Enter Your Password',
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  console.log(values);
  return (
    <div className="app">
      <div className="container-card">
        <div className="title">Log In </div>
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
          <Dropdown buttonText="Send form" onChange={onChange}>
            <Option selected value="Select the role" />
            <Option value="Role 1" />
            <Option value="Role 2" />
            <Option value="Role 3" />
          </Dropdown>
          <br></br>
          <br></br>
          <button className="button"> Submit </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
