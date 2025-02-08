import React from 'react'
import PaymentsCard from './PaymentsCard';

const TransactionsTab = ({transactions}) => {
    return (
        <div className="flex gap-2 flex-col">
          {transactions.map((payment) => (
            <PaymentsCard
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
}

export default TransactionsTab
