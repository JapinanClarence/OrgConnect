import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PaymentRecordSchema, PaymentSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "@/api/axios";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/util/helpers";
import { useAuth } from "@/context/AuthContext";
import MembersPaidTable from "@/components/payment/MembersPaidTable";
import AddPaymentRecordDialog from "@/components/payment/AddPaymentRecordDialog";
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
import EditPaymentRecordDialog from "@/components/payment/EditPaymentRecordDialog";

const yearMap = {
  1: "1st Year",
  2: "2nd Year",
  3: "3rd Year",
  4: "4th Year",
};

const MembersPaidPage = () => {
  const [data, setData] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [currentMember, setCurrentMember] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paymentId = searchParams.get("paymentId");
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const [tableData, setTableData] = useState([]);
  const { toast } = useToast();
  const date = formatDate(Date.now());
  const form = useForm({
    resolver: zodResolver(PaymentRecordSchema),
    defaultValues: {
      member: "",
      status: "",
      amount: "",
    },
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const { data } = await apiClient.get(`/admin/payment/${paymentId}`, {
        headers: {
          Authorization: token,
        },
      });

      if (!data.success) {
        setData([]);
      } else {
        const tableData = data.data.membersPaid.map((data) => ({
          id: data._id,
          fullname: data.fullname,
          profilePicture: data.profilePicture,
          studentId: data.studentId,
          year: yearMap[data.year],
          course: data.course,
          status: data.status,
          amount: data.amount,
        }));
        const paymentData = data.data;

        setData(paymentData);
        setTableData(tableData);
      }

      setLoading(false);
    } catch (error) {
      console.log(error.response.message);
      setLoading(false);
    }
  };
  const onAdd = async (data) => {
    try {
      setIsSubmitting(true);
      const res = await apiClient.patch(
        `/admin/payment/${paymentId}/recordPayment`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res) {
        await fetchPayments();
        setIsSubmitting(false);
        setShowAddDialog(false);
        form.reset();

        toast({
          title: "Payment has been recorded,",
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
 
    const memberData = {
      member: data.id,
      amount: data.amount,
      status: data.status
    }
    setShowEditDialog(true);
    setCurrentMember(memberData);
  };

  
  const onEdit = async (data) => {
    try {
      setIsSubmitting(true);
      const res = await apiClient.patch(
        `/admin/payment/${paymentId}/member/${data.member}`,
        data,
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
          title: `Payment record has been updated`,
          description: `${date}`,
        });
      }
    } catch (error) {
      const message = error.response.data.message;
      setErrorMessage(message);
      setIsSubmitting(false);
    }
  };
  const handleDeleteDialog = (data) => {
    setShowAlert(true);
    setCurrentMember(data);
  };

  const confirmDelete = () => {
    onDelete(currentMember); // Call the delete function
    setShowAlert(false); // Close the alert dialog after deleting
  };

  const cancelDelete = () => {
    setShowAlert(false); // Close the alert dialog without deleting
  };

  const onDelete = async (memberid) => {
    try {
      const res = await apiClient.delete(
        `/admin/payment/${paymentId}/member/${memberid}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res) {
        await fetchPayments();

        toast({
          title: "Payment record deleted",
          description: `${date}`,
        });
      }
    } catch (error) {
      const message = error.response.data.message.toString();

      toast({
        title: message,
        description: date,
        variant:"destructive",
      });
    }
  };

  return (
    <div className="md:bg-[#fefefe] md:shadow-lg rounded-lg md:border md:border-gray-200 text-gray-900 px-6 py-5 flex flex-col relative">
      <h1 className="font-bold">{data.purpose}</h1>
      <p className="text-sm text-muted-foreground">{data.details}</p>
      <p className="text-sm text-muted-foreground font-semibold">
        Amount: ₱{data.amount}
      </p>
      <MembersPaidTable
        data={tableData}
        loading={loading}
        onAdd={setShowAddDialog}
        onEdit={handleEditDialog}
        onDelete={handleDeleteDialog}
      />

      <AddPaymentRecordDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        form={form}
        onSubmit={onAdd}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
      />

      <EditPaymentRecordDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        data={currentMember}
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

export default MembersPaidPage;
