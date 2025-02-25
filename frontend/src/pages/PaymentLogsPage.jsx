import React, { useState, useEffect } from "react";
import { PaymentSchema, TransactionSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "@/api/axios";
import PaymentTable from "@/components/payment/PaymentTable";
import AddPaymentDialog from "@/components/payment/AddPaymentDialog";
import { useToast } from "@/hooks/use-toast";
import { dateOnly, formatDate } from "@/util/helpers";
import EditPaymentDialog from "@/components/payment/EditPaymentDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const categoryMap = {
  0: "Fees",
  1: "Transactions",
  2: "Payment Logs",
};

const PaymentLogsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [currenPayment, setCurrentPayment] = useState("");
  const { toast } = useToast();
  const date = formatDate(Date.now());
  const { token } = useAuth();
  const form = useForm({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      purpose: "",
      details: "",
      amount: "",
      paidBy:""
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const { data } = await apiClient.get("/admin/payment", {
        headers: {
          Authorization: token,
        },
      });

      if (!data.success) {
        setData([]);
      } else {
        const tableData = data.data.map((data) => ({
          id: data._id,
          purpose: data.purpose,
          details: data.details,
          amount: data.amount,
          category: categoryMap[data.category],
          date: dateOnly(data.createdAt),
          paidBy: data.paidBy
        }));

        const expenditureData = tableData.filter(
          (data) => data.category === "Payment Logs"
        );
        // console.log(tableData)
        setData(expenditureData);
      }

      setLoading(false);
    } catch (error) {
      console.log(error.response.message);
      setLoading(false);
    }
  };

  const onAdd = async (data) => {
    try {
      const expenditureData = {
        purpose: data.purpose,
        details: data.details,
        amount: data.amount,
        category: "2",
        paidBy: data.paidBy
      };

      setIsSubmitting(true);
      const res = await apiClient.post("/admin/payment", expenditureData, {
        headers: {
          Authorization: token,
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

  const handleEditDialog = (data) => {
    setShowEditDialog(true);
    setCurrentPayment(data);
  };

  const handleDeleteDialog = (data) => {
    setShowAlert(true);
    setCurrentPayment(data);
  };

  const confirmDelete = () => {
    onDelete(currenPayment); // Call the delete function
    setShowAlert(false); // Close the alert dialog after deleting
  };

  const cancelDelete = () => {
    setShowAlert(false); // Close the alert dialog without deleting
  };

  const onDelete = async (paymentId) => {
    try {
      const res = await apiClient.delete(`/admin/payment/${paymentId}`, {
        headers: {
          Authorization: token,
        },
      });

      if (res) {
        await fetchPayments();

        toast({
          title: "Payment record deleted",
          description: `${date}`,
        });
      }
    } catch (error) {
      const message = error.response.data.message;
      toast({
        title: { message },
        description: `${date}`,
      });
    }
  };

  const onEdit = async (data) => {
    try {
      const paymentLogsData = {
        purpose: data.purpose,
        details: data.details,
        amount: data.amount,
      };
      setIsSubmitting(true);
      const res = await apiClient.patch(
        `/admin/payment/${currenPayment.id}`,
        paymentLogsData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res) {
        await fetchPayments();
        setIsSubmitting(false);
        setShowEditDialog(false);
        form.reset();

        toast({
          title: `${currenPayment.purpose} has been updated`,
          description: `${date}`,
        });
      }
    } catch (error) {
      const message = error.response.data.message;
      setErrorMessage(message);
      setIsSubmitting(false);
    }
  };

//   const handleRowClick = (data) => {
//     navigate(`/payments/memberspaid/?paymentId=${data.id}`);
//   };

  return (
    <div className="md:bg-[#fefefe] md:shadow-lg rounded-lg md:border md:border-gray-200 text-gray-900 px-6 py-5 flex flex-col relative">
      <h1 className="font-bold">Payment Logs</h1>
      <p className="text-sm text-muted-foreground">
        Here are the recent payment logs of your organization
      </p>
      <PaymentTable
        data={data}
        loading={loading}
        onAdd={setShowAddDialog}
        onEdit={handleEditDialog}
        onDelete={handleDeleteDialog}
        // onClick={handleRowClick}
      />

      <AddPaymentDialog
        title={"Add Payment Log"}
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        form={form}
        onSubmit={onAdd}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        showPaidBy={true}
      />

      <EditPaymentDialog
        title={"Edit Payment Log"}
        paymentData={currenPayment}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSubmit={onEdit}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
      />
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              payment record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PaymentLogsPage;
