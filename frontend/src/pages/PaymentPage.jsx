import React, { useState, useEffect } from "react";
import { PaymentSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "@/api/axios";
import PaymentTable from "@/components/payment/paymenttable";
import AddPaymentDialog from "@/components/payment/AddPaymentDialog";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/util/helpers";

const PaymentPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const date = formatDate(Date.now());

  const form = useForm({
    resolver: zodResolver(PaymentSchema),
    defaultValues: {
      purpose: "",
      details: "",
      amount: "",
    },
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const user = JSON.parse(localStorage.getItem("userData"));
    try {
      const { data } = await apiClient.get("/admin/payment", {
        headers: {
          Authorization: user.token,
        },
      });
      console.log(data)
      if (!data.success) {
        setData([]);
      } else {
        const tableData = data.data.map((data) => ({
          id: data._id,
          purpose: data.purpose,
          details: data.details,
          amount: data.amount,
        }));
        setData(tableData);
      }

      setLoading(false);
    } catch (error) {
      console.log(error.response.message);
      setLoading(false);
    }
  };

  const onAdd = async (data) => {
    const user = JSON.parse(localStorage.getItem("userData"));
    try {
      setIsSubmitting(true);
      const res = await apiClient.post("/admin/payment", data, {
        headers: {
          Authorization: user.token,
        },
      });

      if (res) {
        await fetchPayments();
        setIsSubmitting(false);
        setShowAddDialog(false);
        form.reset();

        toast({
          title: "Financial record has been added",
          description: `${date}`,
        });
      }
    } catch (error) {
      const message = error.response.data.message;
      setErrorMessage(message);
      setIsSubmitting(false);
    }
  };
  return (
    <div className="bg-[#fefefe] shadow-lg rounded-lg border border-gray-200 text-gray-900 px-6 py-5 flex flex-col relative">
      <h1 className="font-bold">Financial Records</h1>
      <p className="text-sm text-muted-foreground">
        Here are the recent financial records of your organization
      </p>
      <PaymentTable data={data} loading={loading} onAdd={setShowAddDialog} />

      <AddPaymentDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        form={form}
        onSubmit={onAdd}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
      ></AddPaymentDialog>
    </div>
  );
};

export default PaymentPage;
