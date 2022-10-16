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
    name: "storedDate",
    type: "Date",
    placeholder: "Stored Date",
  },
  {
    id: 3,
    name: "storedQuantity",
    type: "integer",
    placeholder: "Stored Quantity",
  },
];

export default function UnloadedForm() {
  const authCtx = useContext(AuthContext);
  const [display, setDisplay] = useState("");

  const [values, setValues] = useState({
    batchNumber: "",
    storedDate: "",
    storedQuantity: "", //integer
  });

  const onChangeHandler = (e) => {
    setDisplay("");
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(values);
    let url = "http://localhost:8080/api/issue-product";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        batchNumber: values.batchNumber,
        storedDate: values.storedDate,
        storedQuantity: values.storedQuantity,
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
      storedDate: "",
      storedQuantity: "",
    });
  };

  return (
    <div className="app-2">
      <div className="container-card">
        <div className="title-2">Unloaded Products</div>
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
            <h4>Product Group Already Unloaded</h4>
          </div>

          <br></br>
          <br></br>
          <button className="button" type="submit">
            {" "}
            Unload{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
