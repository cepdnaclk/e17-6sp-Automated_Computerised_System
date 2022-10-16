/*
 * Form is rechecked
 */

import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../../store/AuthContext";

import "../../../styles/form.css";
import FormInput from "../../forms/FormInput";

const inputs = [
  {
    id: 1,
    name: "productName",
    type: "text",
    placeholder: "Product Name",
  },
  {
    id: 2,
    name: "unitPrice",
    type: "number",
    placeholder: "Unit Price",
  },
];

export default function ProductForm() {
  const authCtx = useContext(AuthContext);
  const [display, setDisplay] = useState("");

  const [values, setValues] = useState({
    productName: "",
    unitPrice: "",
  });

  const onChangeHandler = (e) => {
    setDisplay("");
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(values);
    let url = "http://localhost:8080/api/product/";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        productName: values.productName,
        unitPrice: values.unitPrice,
      }),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${authCtx.token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          res
            .text()
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setDisplay("auth-display");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setValues({
      productName: "",
      unitPrice: "",
    });
  };

  return (
    <div className="app-2">
      <div className="container-card">
        <div className="title-2">New Product</div>
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

          <div className={`auth ${display}`}>
            <h4>Product Already Exist</h4>
          </div>

          <br></br>
          <br></br>
          <button className="button" type="submit">
            {" "}
            Enter{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
