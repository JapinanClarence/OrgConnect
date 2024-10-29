import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditProfileForm from "@/components/profile/EditProfileForm";
import { ChevronLeft, LoaderCircle } from "lucide-react";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { formatToDateInput, formatDate } from "@/util/helpers";
import { useToast } from "@/hooks/use-toast";
import PageHead from "@/components/nav/PageHead";

const EditProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useAuth();
  const { toast } = useToast();
  const date = formatDate(Date.now());

  useEffect(() => {
    fetchUserData();
  }, []);

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
      const formData = {
        _id: data.data.id,
        firstname: data.data.firstname,
        lastname: data.data.lastname,
        middlename: data.data.middlename,
        gender: data.data.gender,
        birthday: formatToDateInput(data.data.birthday),
        username: data.data.username,
        email: data.data.email,
        year: data.data.year,
        course: data.data.course,
        contactNumber: data.data.contactNumber,
        profilePicture: data.data.profilePicture
      };

      setUserData(formData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {

    try {
      setIsSubmitting(true);

      const res = await apiClient.patch("/user", data, {
        headers: {
          Authorization: token,
        },
      });

      if (res) {
        setIsSubmitting(false);
        toast({
          title: "User profile updated!",
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


  return (
    <div className="pt-[2.8rem] h-screen p-5">
      <PageHead />
      {loading ? (
        <div className="h-full flex justify-center items-center">
          <LoaderCircle size={20} className="animate-spin "/>
        </div>
      ) : (
        userData && (
          <div className="py-5">
          <EditProfileForm
            userData={userData}
            onSubmit={onSubmit}
            errorMessage={errorMessage}
            isSubmitting={isSubmitting}

          />
          </div>
        )
      )}
    </div>
  );
};

export default EditProfilePage;
