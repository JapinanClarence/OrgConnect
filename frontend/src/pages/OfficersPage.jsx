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
      semester: "",
      academicYear: "",
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
        const officerData = data.data.map((data) => ({
          id: data.id,
          fullname: data.fullname,
          position:
            data.position.charAt(0).toUpperCase() +
            data.position.slice(1).toLowerCase(),
          age: data.age,
          email: data.email,
          year: yearMap[data.year],
          course: data.course,
          profilePicture: data.profilePicture,
          semester: data.officerTerm.semester,
          academicYear: data.officerTerm.schoolYear,
        }));

        setData(officerData);
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
    setShowAlert(true);
    setCurrentOfficer(data);
  };

  const confirmDelete = () => {
    onDelete(currentOfficer); // Call the delete function
    setShowAlert(false); // Close the alert dialog after deleting
  };

  const cancelDelete = () => {
    setShowAlert(false); // Close the alert dialog without deleting
  };
  const handleRowClick = (data) => {};

  const onDelete = async (officerId) => {
    try {
      setIsSubmitting(true);
      const res = await apiClient.patch(
        `/admin/officer/${officerId}/revokeRole`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res) {
        await fetchOfficers();
        setShowAlert(false);
        form.reset();

        toast({
          title: "Officer has been removed",
          description: `${date}`,
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      const message = error.response.data.message.toString();

      toast({
        title: message,
        description: date,
        variant: "destructive",
      });
    }
  };
  const onEdit = async (data) => {
    const { officerId, position, semester, academicYear } = data;
    try {
      setIsSubmitting(true);
      const res = await apiClient.patch(
        `/admin/officer/${officerId}/updateRole`,
        {
          position: position.toLowerCase(),
          officerTerm: {
            semester: semester,
            schoolYear: academicYear,
          },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res) {
        await fetchOfficers();
        setIsSubmitting(false);
        setShowDialog(false);
        form.reset();

        toast({
          title: "Officer position has been updated",
          description: `${date}`,
        });
      }
    } catch (error) {
      console.log(error);
      const message = error.response.data.message;
      setErrorMessage(message);
      setIsSubmitting(false);
    }
  };
  const onAdd = async (data) => {
    const { officerId, position, semester, academicYear } = data;
    try {
      setIsSubmitting(true);
      const res = await apiClient.patch(
        `/admin/officer/${officerId}`,
        {
          position: position.toLowerCase(),
          officerTerm: {
            semester: semester,
            schoolYear: academicYear,
          },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

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
      <AddOfficerDialog
        form={form}
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSubmit={onAdd}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
      />
      <EditOfficerDialog
        officerData={currentOfficer}
        open={showDialog}
        onOpenChange={setShowDialog}
        onSubmit={onEdit}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
      />

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove/revoke
              the officer
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

export default OfficersPage;
