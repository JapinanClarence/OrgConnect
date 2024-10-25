import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, PencilLine } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import ProfileCard from "@/components/profile/ProfileCard";
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
import apiClient from "@/api/axios";
import EditProfileForm from "@/components/profile/EditProfileForm";
import { useNavigate } from "react-router-dom";
import {formatSimpleDate } from "@/util/helpers";;

const ProfilePage = () => {
  const { token, logout } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const { data } = await apiClient.get("/user", {
        headers: {
          Authorization: token,
        },
      });
      if (!data) {
        return console.log(data);
      }
      const userData = {
        _id: data.data._id,
        studentId: data.data.studentId,
        firstname: data.data.firstname,
        lastname: data.data.lastname,
        middlename: data.data.middlename,
        birthday: formatSimpleDate(data.data.birthday),
        email: data.data.email,
        username: data.data.username,
        gender:
          data.data.gender.charAt(0).toUpperCase() +
          data.data.gender.slice(1).toLowerCase(),
        contactNumber: data.data.contactNumber,
        year: data.data.year,
        course: data.data.course,
        profilePicture: data.data.profilePicture,
      };

      setUserData(userData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);


  const handleLogout = () => {
    setShowAlert(true);
  };

  const confirmLogout = () => {
    logout(); // Call the logout function
    setShowAlert(false); // Close the alert dialog after logout
  };

  const cancelLogout = () => {
    setShowAlert(false); // Close the alert dialog without logout
  };

  return (
    <div className="p-5">
      <div className="shadow-sm rounded-lg border bg-white p-4 grid grid-flow-col grid-cols-5 text-white">
        <Avatar className="size-14 col-span-auto">
          <AvatarImage src={userData.profilePicture} alt="@shadcn" />
          <AvatarFallback className="text-gray-500 font-bold bg-gray-300">
            {userData &&
              userData.firstname.charAt(0) + userData.lastname.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="col-span-3 flex flex-col justify-center ">
          <h1 className="text-gray-900 font-semibold">Jane Doe</h1>
          <h1 className="text-sm text-muted-foreground">2024-0001</h1>
        </div>
      </div>

      {/* <div className="border-b m-5 border-zinc-300"></div> */}
      <div className="flex mt-5 justify-between font-medium items-center">
        <h1>Personal Information</h1>
        <Button
          variant="link"
          className="font-medium"
          onClick={() => {
            navigate("/profile/edit");
            // setShowEditDialog(true)
          }}
        >
          <PencilLine />
          Edit
        </Button>
      </div>
      <ProfileCard
        birthday={userData.birthday}
        gender={userData.gender}
        username={userData.username}
        email={userData.email}
        year={userData.year}
        phone={userData.contactNumber}
        course={userData.course}
      />
      <div className="border-b my-5 border-zinc-300"></div>
      <div
        className="shadow-sm rounded-lg bg-white border p-4 flex gap-3 font-medium text-gray-900"
        onClick={handleLogout}
      >
        <LogOut size={20} className="my-auto" /> Log out
      </div>
      {/* <EditProfileForm
        userData={userData}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSubmit={onEdit}
        errorMessage={errorMessage}
        isSubmitting={isSubmitting}
      /> */}
      <AlertDialog open={showAlert} onOpenChange={setShowAlert} className="">
        <AlertDialogContent className="w-[300px] rounded-lg">
          <AlertDialogHeader className={"text-start"}>
            <AlertDialogTitle>Log out?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to logout.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter
            className={"w-full flex flex-row items-center justify-around"}
          >
            <AlertDialogAction onClick={confirmLogout}>
              Continue
            </AlertDialogAction>
            <AlertDialogCancel className="mt-0 " onClick={cancelLogout}>
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProfilePage;
