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
    name: "distributionOrderId",
    type: "text",
    placeholder: "Order Id",
  },
  {
    id: 2,
    name: "deliveredQuantity",
    type: "number",
    placeholder: "Delivered Quantity",
  },
  {
    id: 3,
    name: "deliveredDate",
    type: "Date",
    placeholder: "Delivered Date",
  },
];

export default function DeliveryForm() {
  const authCtx = useContext(AuthContext);
  const [display, setDisplay] = useState("");

  const [values, setValues] = useState({
    distributionOrderId: "",
    deliveredQuantity: "",
    deliveredDate: "",
  });

  const onChangeHandler = (e) => {
    setDisplay("");
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(values);
    let url = "http://localhost:8080/api/dis-product/receive";
    fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        distributionOrderId: values.distributionOrderId,
        deliveredQuantity: values.deliveredQuantity,
        deliveredDate: values.deliveredDate,
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
      distributionOrderId: "",
      deliveredQuantity: "",
      deliveredDate: "",
    });
  };

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

          <div className={`auth ${display}`}>
            <h4>Order Id Does Not Exist</h4>
          </div>

          <br></br>
          <br></br>
          <button className="button" type="submit">
            {" "}
            Deliver{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
