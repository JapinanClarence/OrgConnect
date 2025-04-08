import React, { useState, useEffect } from "react";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import PageHead from "@/components/nav/PageHead";
import PaymentsCard from "@/components/payments/PaymentsCard";

const categoryMap = {
  0: "Fees",
  1: "Expenditure",
  2: "Payment Logs",
};

const TransactionPage = () => {
  const { token } = useAuth();
  const [paymentData, setPaymentData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const params = useParams();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await apiClient.get(
        `/user/organization/${params.id}/payments`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (!data.success) {
        setPaymentData([]);
      } else {
        const paymentData = data.data.map((data) => ({
          id: data._id,
          purpose: data.purpose,
          details: data.details,
          amount: data.amount,
          category: data.category,
          amountPaid: data.studentStatus?.amountPaid || null,
          status: data.studentStatus?.status || null,
          createdAt: data.createdAt,
          paidBy: data.paidBy
        }));

        // const payments = paymentData.filter((data) => data.category === "0");
        const transactions = paymentData.filter(
          (data) => data.category !== "0"
        );
        // setPaymentData(payments);
        setTransactionData(transactions);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="pt-16">
      <PageHead title={"Transactions"} />

      <div className="flex gap-2 flex-col p-5">
        {transactionData.map((payment) => (
          <PaymentsCard
            showPaymentStatus={false}
            key={payment.id}
            id={payment.id}
            purpose={payment.purpose}
            details={payment.details}
            category={payment.category}
            amount={payment.amount}
            amountPaid={payment.amountPaid}
            paidBy={payment.paidBy}
            status={payment.status}
            createdAt={payment.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionPage;
