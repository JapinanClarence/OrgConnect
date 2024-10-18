import React, { useState, useEffect } from "react";
import OfficersTable from "@/components/officers/OfficersTable";
import apiClient from "@/api/axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OfficerSchema } from "@/schema";
import { dateOnly, formatDate } from "@/util/helpers";
import { useToast } from "@/hooks/use-toast";
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
import EditOfficerDialog from "@/components/officers/EditOfficerDialog";
import AddOfficerDialog from "@/components/officers/AddOfficerDialog";
const yearMap = {
  1: "1st Year",
  2: "2nd Year",
  3: "3rd Year",
  4: "4th Year",
};

const OfficersPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [currentOfficer, setCurrentOfficer] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const date = formatDate(Date.now());
  const { token } = useAuth();
  const form = useForm({
    resolver: zodResolver(OfficerSchema),
    defaultValues: {
      officerId: "", // Use officerId instead of officer
      position: "",
      rank: "",
    },
  });

  useEffect(() => {
    fetchOfficers();
  }, []);

  const fetchOfficers = async () => {
    try {
      const { data } = await apiClient.get("/admin/officer", {
        headers: {
          Authorization: token,
        },
      });

      if (!data.success) {
        setData([]);
      } else {
        const tableData = data.data.map((data) => ({
          id: data.id,
          firstname: data.firstname,
          lastname: data.lastname,
          position: data.position,
          age: data.age,
          email: data.email,
          year: yearMap[data.year],
          course: data.course,
          rank: data.rank,
          profilePicture: data.profilePicture,
        }));

        setData(tableData);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleEdit = (data) => {
    setCurrentOfficer(data);
    setShowDialog(true);
  };
  const handleDelete = (data) => {
    console.log(data);
  };
  const handleRowClick = (data) => {};

  const onEdit = (data) => {};
  const onAdd = async (data) => {

    try {
      setIsSubmitting(true);
      const res = await apiClient.post("/admin/officer", data, {
        headers: {
          Authorization: token,
        },
      });

      if (res) {
        await fetchOfficers();
        setIsSubmitting(false);
        setShowAddDialog(false);
        form.reset();

        toast({
          title: "Officer has been added",
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
    <div className="md:bg-[#fefefe] md:shadow-lg rounded-lg md:border md:border-gray-200 text-gray-900 px-6 py-5 flex flex-col relative">
      <h1 className="font-bold">Organization Officers</h1>
      <p className="text-sm text-muted-foreground">
        View and manage organization officers here.
      </p>
      <OfficersTable
        data={data}
        loading={loading}
        onAdd={setShowAddDialog}
        onClick={handleRowClick}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <AddOfficerDialog form={form} open={showAddDialog} onOpenChange={setShowAddDialog} onSubmit={onAdd} isSubmitting={isSubmitting} errorMessage={errorMessage}/>
      <EditOfficerDialog
        officerData={currentOfficer}
        open={showDialog}
        onOpenChange={setShowDialog}
        onSubmit={onEdit}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default OfficersPage;
