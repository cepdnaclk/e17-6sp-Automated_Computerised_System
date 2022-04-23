import "./formInput.css"

const FormInput = (props) => {
    const {onChange, id, ...inputProps} = props;
    return(
        <div className="formInput">
            <input {...inputProps}
            onChange={onChange}
            placeholder={props.placeholder} />
        </div>
    )
}

export default FormInput;