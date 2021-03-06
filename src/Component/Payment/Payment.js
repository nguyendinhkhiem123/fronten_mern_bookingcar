
import React from "react";
import ReactDOM from "react-dom"

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function YourComponent(props) {
  console.log('values',props.values);
  const createOrder = (data, actions) =>{
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: `${props.values}`,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    props.checkOutTicket(props.value)
    return actions.order.capture();
  };

  return (
    <PayPalButton
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
}

export default YourComponent