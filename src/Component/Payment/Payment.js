import React, { useEffect } from "react";
import ReactDOM from "react-dom"

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });


function Paypal(props) {
  const createOrder = (data, actions) =>{
      console.log(data);
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "100",
          },

        },
      ],  //Hóa đơn
    });
  };
  const onApprove = (data, actions) => {
     console.log(data);
    return actions.order.capture(); // Xử lý thành công
  };

 
  return ( 
    <PayPalButton
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}   
    />
  );
}

export default Paypal;
