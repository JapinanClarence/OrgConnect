import React, { useState, useEffect } from "react";
import OfficersTable from '@/components/officers/OfficersTable'
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
import { useAuth } from "@/context/AuthContext";

const OfficersPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [currentMember, setCurrentMember] = useState("");
  const { toast } = useToast();
  const date = formatDate(Date.now());
  const { token } = useAuth();

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
          id: data._id,
          firstname: data.firstname,
          lastname: data.lastname,
          position: data.position,
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
  const handleEdit = (data) =>{
    console.log(data);
  }
  const handleDelete = (data) =>{
    console.log(data)
  }
  const handleRowClick = (data) => {

  }
  return (
    <div className="md:bg-[#fefefe] md:shadow-lg rounded-lg md:border md:border-gray-200 text-gray-900 px-6 py-5 flex flex-col relative">
      <h1 className="font-bold">Organization Officers</h1>
      <p className="text-sm text-muted-foreground">
        View and manage organization officers here.
      </p>
      <OfficersTable
        data={data}
        loading={loading}
        onClick={handleRowClick}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      
    </div>
  )
}

export default OfficersPage
