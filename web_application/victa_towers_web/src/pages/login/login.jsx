import { useState } from 'react';
import '../../styles/login.css';
import FormInput from '../../components/FormInput/FormInput';

function Login() {
  const [values, setValues] = useState({
    username: '',
    role: '',
    number: '',
    email: '',
    password: '',
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
      name: 'role',
      type: 'text',
      placeholder: 'Enter Your Role',
    },
    {
      id: 3,
      name: 'email',
      type: 'text',
      placeholder: 'Enter Your Email',
    },
    {
      id: 4,
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
          <br></br>
          <br></br>
          <button className="button"> Submit </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
