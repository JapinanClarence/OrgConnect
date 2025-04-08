import React from 'react'
import StudentPaymentCard from './StudentPaymentCard';

const TransactionsTab = ({transactions}) => {
    return (
        <div className="flex gap-2 flex-col pb-5">
          {transactions.map((payment) => (
            <StudentPaymentCard
              showPaymentStatus={false}
              key={payment.id}
              id={payment.id}
              purpose={payment.purpose}
              details={payment.details}
              category={payment.category}
              amount={payment.amount}
              amountPaid={payment.amountPaid}
              status={payment.status}
              createdAt={payment.createdAt}
              balance={payment.balance}
            />
          ))}
        </div>
      );
}

export default TransactionsTab
