import React, { useState, useEffect } from "react";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import PageHead from "@/components/nav/PageHead";
import DataTable from "@/components/payments/DataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaymentsTab from "@/components/payments/PaymentsTab";
import TransactionsTab from "@/components/payments/TransactionsTab";
import { PhilippinePeso } from "lucide-react";
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
          createdAt: data.createdAt,
        }));

        const alreadyPaid = paymentData.filter(
          (data) => data.category === "0" && data.status === "1"
        );

        const notPaid = paymentData.filter(
          (data) => data.category === "0" && !data.status
        );

        setPaymentData(notPaid);
        setTransactionData(alreadyPaid);
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

  // Calculate total amount
  const totalAmount = paymentData.reduce(
    (sum, payment) => sum + (payment.amount || 0),
    0
  );
  return (
    <div className="pt-16">
      <PageHead title={"Payments"} />

      <div className="mt-2 mb-4 mx-5 p-3 rounded-lg bg-white shadow-sm border flex justify-between items-center">
        <h1 className="text-lg font-medium">Total Payments</h1>
        <p className="text-sm text-muted-foreground inline-flex items-center">
          <PhilippinePeso className="h-4"/>{totalAmount}
        </p>
      </div>
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
