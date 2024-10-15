import MembersTable from "@/components/members/MembersTable";
import React, {useState, useEffect} from "react";
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

const yearMap = {
  1: "1st Year",
  2: "2nd Year",
  3: "3rd Year",
  4: "4th Year"
}

const MembersPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [currentMember, setCurrentMember] = useState("");
  const { toast } = useToast();
  const date = formatDate(Date.now());

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const user = JSON.parse(localStorage.getItem("userData"));
    try {
      const { data } = await apiClient.get("/admin/members", {
        headers: {
          Authorization: user.token,
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
          age: data.age,
          contact: data.contact,
          course: data.course,
          status: data.status,
          joinedDate: data.joinedDate ? dateOnly(data.joinedDate) : null,
          profilePicture: data.profilePicture,
        }));
        setData(tableData);
      }

      setLoading(false);
    } catch (error) {
      console.log(error.response.message);
      setLoading(false);
    }
  };
  const handleApprove = async (memberId) =>{
    const user = JSON.parse(localStorage.getItem("userData"));

    try {
      const res = await apiClient.patch(`/admin/members/${memberId}`, {status: "1"}, {
        headers: {
          Authorization: user.token,
        },
      });

      if (res) {
        await fetchMembers();

        toast({
          title: `User has been approved`,
          description: `${date}`,
        });
      }
    } catch (error) {
      const message = error;
      console.log(message)
    }
  }

  const handleDeleteDialog = (data) =>{
    setShowAlert(true);
    setCurrentMember(data);
  }

  const confirmDelete = () => {
    onDelete(currentMember); // Call the delete function
    setShowAlert(false); // Close the alert dialog after deleting
  };

  const cancelDelete = () => {
    setShowAlert(false); // Close the alert dialog without deleting
  };

  const onDelete = async (memberId) =>{
    console.log(memberId)
    const user = JSON.parse(localStorage.getItem("userData"));
    try {
      const res = await apiClient.delete(`/admin/members/${memberId}`, {
        headers: {
          Authorization: user.token,
        },
      });
      console.log(res)
      if (res) {
        await fetchMembers();

        toast({
          title: "Member has been kicked",
          description: `${date}`,
        });
      }
    } catch (error) {
      const message = error.response.data.message;
      console.log(message)
      toast({
        title: { message },
        description: `${date}`,
      });
    }
  }
  const handleRowClick = (data) =>{
    setShowDialog(true);
    setCurrentMember(data);
  }

  return (
    <div className="md:bg-[#fefefe] md:shadow-lg rounded-lg md:border md:border-gray-200 text-gray-900 px-6 py-5 flex flex-col relative">
      <h1 className="font-bold">Organization Members</h1>
      <p className="text-sm text-muted-foreground">
        View and manage organization members here.
      </p>
      <MembersTable data={data} loading={loading} onApprove={handleApprove} onDelete={handleDeleteDialog} onClick={handleRowClick}/>
      <MemberDialog data={currentMember} open={showDialog} onOpenChange={setShowDialog} />
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
            <AlertDialogCancel onClick={cancelDelete}>
              Cancel
            </AlertDialogCancel>
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
