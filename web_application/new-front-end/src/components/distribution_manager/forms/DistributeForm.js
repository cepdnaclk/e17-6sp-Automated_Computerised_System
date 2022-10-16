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
    name: "batchNumber",
    type: "text",
    placeholder: "Batch Number",
  },
  {
    id: 2,
    name: "quantity",
    type: "integer",
    placeholder: "Distribute Quantity",
  },
  {
    id: 3,
    name: "salesAgentUserName",
    type: "text",
    placeholder: "Sales Agent Username",
  },
  {
    id: 4,
    name: "destinedShopName",
    type: "text",
    placeholder: "Destine Shop Name",
  },
];

export default function DistributeForm() {
  const authCtx = useContext(AuthContext);
  const [display, setDisplay] = useState("");

  const [values, setValues] = useState({
    batchNumber: "",
    quantity: "",
    salesAgentUserName: "",
    destinedShopName: "",
  });

  const onChangeHandler = (e) => {
    setDisplay("");
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(values);
    let url = "http://localhost:8080/api/dis-product";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        batchNumber: values.batchNumber,
        quantity: values.quantity,
        salesAgentUserName: values.salesAgentUserName,
        destinedShopName: values.destinedShopName,
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
      batchNumber: "",
      quantity: "",
      salesAgentUserName: "",
      destinedShopName: "",
    });
  };

  return (
    <div className="app-2">
      <div className="container-card">
        <div className="title-2">Distribute Products</div>
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
            <h4>Amount Does Not Exist</h4>
          </div>

          <br></br>
          <br></br>
          <button className="button" type="submit">
            {" "}
            Distribute{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
