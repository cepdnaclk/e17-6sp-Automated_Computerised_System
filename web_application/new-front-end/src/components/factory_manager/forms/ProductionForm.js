/*
 * Form is rechecked
 */

import { useContext, useState } from "react";
import AuthContext from "../../../store/AuthContext";

import "../../../styles/form.css";
import FormInput from "../../forms/FormInput";

const inputs = [
  {
    id: 1,
    name: "productName",
    type: "text",
    placeholder: "Product name",
  },
  {
    id: 2,
    name: "batchNumber",
    type: "text",
    placeholder: "Batch Number",
  },
  {
    id: 3,
    name: "productDate",
    type: "Date",
    placeholder: "Production Date",
  },
  {
    id: 4,
    name: "quantity",
    type: "integer",
    placeholder: "Product Quantity",
  },
];

export default function ProductionForm() {
  const authCtx = useContext(AuthContext);
  const [display, setDisplay] = useState("");

  const [values, setValues] = useState({
    productName: "",
    batchNumber: "",
    productDate: "",
    quantity: "", //integer
  });

  const onChangeHandler = (e) => {
    setDisplay("");
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(values);
    let url = "http://localhost:8080/api/fac-product/";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        productName: values.productName,
        batchNumber: values.batchNumber,
        productDate:values.productDate,
        quantity: values.quantity
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
      batchNumber: "",
      productDate: "",
      quantity: "", //integer
    });
  };

  return (
    <div className="app-2">
      <div className="container-card">
        <div className="title-2">Manufactured Products</div>
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
            <h4>Production Details Already Exist</h4>
          </div>

          <br></br>
          <br></br>
          <button className="button" type="submit">
            {" "}
            Insert{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
