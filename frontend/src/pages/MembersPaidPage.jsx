import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PaymentSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "@/api/axios";
import PaymentTable from "@/components/payment/PaymentTable";
import AddPaymentDialog from "@/components/payment/AddPaymentDialog";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/util/helpers";
import { useAuth } from "@/context/AuthContext";
import MembersPaidTable from "@/components/payment/MembersPaidTable";

const yearMap = {
    1: "1st Year",
    2: "2nd Year",
    3: "3rd Year",
    4: "4th Year",
  };

const MembersPaidPage = () => {
  const [data, setData] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [currenPayment, setCurrentPayment] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paymentId = searchParams.get("paymentId");
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

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
        const tableData = data.data.map((data) => ({
          id: data._id,
          fullname: data.fullname,
          profilePicture: data.profilePicture,
          studentId: data.studentId,
          year: yearMap[data.year],
          course: data.course,
          status: data.status,
          amount: data.amount,
        }));
        setData(tableData);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      console.log(error.response.message);
      setLoading(false);
    }
  };

  const handleEditDialog = async (data) => {

  }
  const handleDeleteDialog = async (data) => {
    
  }
  return (
    <div className="md:bg-[#fefefe] md:shadow-lg rounded-lg md:border md:border-gray-200 text-gray-900 px-6 py-5 flex flex-col relative">
      <h1 className="font-bold">Members Paid</h1>
      <p className="text-sm text-muted-foreground">
        Here are list of members paid.
      </p>
      <MembersPaidTable
        data={data}
        loading={loading}
        onAdd={setShowAddDialog}
        onEdit={handleEditDialog}
        onDelete={handleDeleteDialog}
      />
    </div>
  );
};

export default MembersPaidPage;
