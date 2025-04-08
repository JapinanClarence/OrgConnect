import React from "react";
import StudentPaymentCard from "./StudentPaymentCard";

const PaymentsTab = ({ payments }) => {

  return (
    <div className="flex gap-2 flex-col pb-5">
      {payments.map((payment) => (
        <StudentPaymentCard
          key={payment.id}
          id={payment.id}
          purpose={payment.purpose}
          details={payment.details}
          category={payment.category}
          amount={payment.amount}
          amountPaid={payment.amountPaid}
          status={payment.status}
        />
      ))}
    </div>
  );
};

export default PaymentsTab;
