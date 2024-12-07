import React, { useState } from "react";
import "payhere-embed-sdk/dist/react.css";
import Payhere from "payhere-embed-sdk/dist/react";

const PayButton = ({
  embedURL,
  amountInCents,
  customerName,
  customerEmail,
  customFields,
}) => {
  const [showPayhere, setShowPayhere] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShowPayhere(true)}
        className="mt-4 px-6 py-2 bg-secondary-100 text-white rounded-lg hover:bg-primary hover:text-secondary-100"
      >
        Checkout
      </button>

      <Payhere
        selector="#payhere-modal"
        embedURL={embedURL}
        open={showPayhere}
        amountInCents={amountInCents}
        customerName={customerName}
        customerEmail={customerEmail}
        customFields={customFields}
        onSuccess={(data) => {
          console.log("Payment successful:", data);
          setPaymentSuccess(true);
        }}
        onFailure={(error) => {
          console.error("Payment failed:", error);
          setPaymentSuccess(false);
        }}
        onClose={() => {
          setShowPayhere(false);
          if (paymentSuccess) {
            console.log("Payment was successful.");
          } else {
            console.log("Payment was not completed.");
          }
        }}
      />
    </div>
  );
};

export default PayButton;
