import './formInput.css';

const FormInput = (props) => {
  const { onChange, id, ...inputProps } = props;
  return (
    <div>
      <input
        className="formInput"
        {...inputProps}
        onChange={onChange}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default FormInput;
