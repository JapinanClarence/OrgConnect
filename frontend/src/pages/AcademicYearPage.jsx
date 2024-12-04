import React, { useState, useEffect } from "react";
import AdminTable from "@/components/superadmin/AdminTable";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";
import { dateOnly } from "@/util/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import AcadTable from "@/components/superadmin/AcadTable";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDate } from "@/util/helpers";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import AddAcadsDialog from "@/components/superadmin/AddAcadsDialog";
import { AcadYearSchema } from "@/schema";

const AcademicYearPage = () => {
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const [acadData, setAcadData] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const date = formatDate(Date.now());
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(AcadYearSchema),
    defaultValues: {
      academicYear: "",
      semester: "",
      startDate: "",
      endDate: "",
    },
  });

  useEffect(() => {
    fetchAcademicYears();
  }, []);

  const fetchAcademicYears = async () => {
    try {
      const { data } = await apiClient.get("/superadmin/academicYear", {
        headers: {
          Authorization: token,
        },
      });

      if (!data.success) {
        setData([]);
      } else {
        const tableData = data.data.map((data) => {
          return {
            id: data._id,
            academicYear: data.academicYear,
            semester: data.semester,
            startDate: data.startDate ? dateOnly(data.startDate) : null,
            endDate: data.endDate ? dateOnly(data.endDate) : null,
            active: data.isCurrent,
          };
        });

        setAcadData(tableData);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onAdd = async (data) => {
    console.log(data)
    try {
      setIsSubmitting(true);
      const res = await apiClient.post("/superadmin/academicYear", data, {
        headers: {
          Authorization: token,
        },
      });

      if (res) {
        await fetchAcademicYears();
        setIsSubmitting(false);
        setShowAddDialog(false);
        form.reset();

        toast({
          title: "Academic year has been added",
          description: `${date}`,
        });
      }
    } catch (error) {
      const message = error.response.data.message;
      setErrorMessage(message);
      setIsSubmitting(false);
    }
  };

  const updateAcad = async (reqData) => {};
  return (
    <div className="md:bg-[#fefefe] md:shadow-lg rounded-lg md:border md:border-gray-200 text-gray-900 px-6 py-5 w-full flex flex-col relative">
      <h1 className="font-bold">Academic year</h1>
      <p className="text-sm text-muted-foreground">
        View and manage academic year and semester here.
      </p>
      <AcadTable
        data={acadData}
        onUpdateStatus={updateAcad}
        onAdd={setShowAddDialog}
      />

      <AddAcadsDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        form={form}
        onSubmit={onAdd}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default AcademicYearPage;
