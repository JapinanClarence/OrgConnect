import React, { useState, useEffect } from "react";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import PageHead from "@/components/nav/PageHead";
import DataTable from "@/components/payments/DataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaymentsTab from "@/components/payments/PaymentsTab";
import TransactionsTab from "@/components/payments/TransactionsTab";
const categoryMap = {
  0: "Fees",
  1: "Expenditure",
  2: "Payment Logs",
};

const PaymentPage = () => {
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
          createdAt: data.createdAt
        }));

        const payments = paymentData.filter((data) => data.category === "0");
        const transactions = paymentData.filter(
          (data) => data.category !== "0"
        );
        setPaymentData(payments);
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
      <PageHead title={"Payments"} />

      <Tabs defaultValue="my-payments" className="px-5">
        <TabsList className="grid grid-cols-2  bg-zinc-200 w-full mb-3">
          <TabsTrigger value="my-payments">My payments</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="my-payments">
          <PaymentsTab payments={paymentData} />
        </TabsContent>
        <TabsContent value="transactions">
          <TransactionsTab transactions={transactionData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentPage;
