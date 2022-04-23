import '../../styles/formInput.css';

const FormInput = (props) => {
  const { onChange, id, ...inputProps } = props;
  return (
    <div>
      <input
        className="forminput1"
        {...inputProps}
        onChange={onChange}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default FormInput;
