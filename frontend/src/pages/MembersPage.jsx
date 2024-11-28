import MembersTable from "@/components/members/MembersTable";
import React, { useState, useEffect } from "react";
import apiClient from "@/api/axios";
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
import MemberDialog from "@/components/members/MemberDialog";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OfficerSchema } from "@/schema";
import ManagePosition from "@/components/members/ManagePosition";

const yearMap = {
  1: "1st Year",
  2: "2nd Year",
  3: "3rd Year",
  4: "4th Year",
};

const MembersPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showManage, setShowManageDialog] = useState(false);
  const [currentMember, setCurrentMember] = useState("");
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
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const { data } = await apiClient.get("/admin/members", {
        headers: {
          Authorization: token,
        },
      });

      if (!data.success) {
        setData([]);
      } else {
        const tableData = data.data.map((data) => ({
          id: data._id,
          studentId: data.studentId,
          fullname: data.fullname,
          email: data.email,
          year: yearMap[data.year],
          birthday: data.birthday,
          gender: data.gender,
          contact: data.contact,
          course: data.course,
          status: data.status,
          absenceCount: data.absentCount,
          joinedDate: data.joinedDate ? dateOnly(data.joinedDate) : null,
          profilePicture: data.profilePicture,
        }));
        // Sort by last name
        const sortedTableData = tableData.sort((a, b) => {
          const lastNameA = a.fullname.split(" ").slice(-1)[0].toLowerCase();
          const lastNameB = b.fullname.split(" ").slice(-1)[0].toLowerCase();
          return lastNameA.localeCompare(lastNameB);
        });
        setData(sortedTableData);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleApprove = async (memberId) => {
    try {
      const res = await apiClient.patch(
        `/admin/members/${memberId}`,
        { status: "1" },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res) {
        await fetchMembers();

        toast({
          title: `User has been approved`,
          description: `${date}`,
        });
      }
    } catch (error) {
      const message = error;
      console.log(message);
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

  const onDelete = async (memberId) => {
    try {
      const res = await apiClient.delete(`/admin/members/${memberId}`, {
        headers: {
          Authorization: token,
        },
      });

      if (res) {
        await fetchMembers();

        toast({
          title: "Member has been kicked",
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
  const handleManage = async (data) => {
    setShowManageDialog(true);
    form.setValue("officerId", data.id);
  };

  const onAdd = async (data) => {
    // console.log(data)
    const { officerId, position, rank } = data;
    try {
      setIsSubmitting(true);
      const res = await apiClient.patch(
        `/admin/officer/${officerId}`,
        {
          position: position.toLowerCase(),
          rank,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res) {
        await fetchMembers();
        setIsSubmitting(false);
        setShowManageDialog(false);
        setErrorMessage("");
        form.reset();

        toast({
          title: "Position has been added",
          description: `${date}`,
        });
      }
    } catch (error) {
      const message = error.response.data.message;
      setErrorMessage(message);
      setIsSubmitting(false);
    }
  };
  const handleRowClick = (data) => {
    setShowDialog(true);
    setCurrentMember(data);
  };

  return (
    <div className="md:bg-[#fefefe] md:shadow-lg rounded-lg md:border md:border-gray-200 text-gray-900 px-6 py-5 flex flex-col relative">
      <h1 className="font-bold">Organization Members</h1>
      <p className="text-sm text-muted-foreground">
        View and manage organization members here.
      </p>
      <MembersTable
        data={data}
        loading={loading}
        onApprove={handleApprove}
        onDelete={handleDeleteDialog}
        onManage={handleManage}
        onClick={handleRowClick}
      />
      <MemberDialog
        data={currentMember}
        open={showDialog}
        onOpenChange={setShowDialog}
      />
      <ManagePosition
        form={form}
        open={showManage}
        onOpenChange={setShowManageDialog}
        onSubmit={onAdd}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
      />

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove the
              member.
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

export default MembersPage;
