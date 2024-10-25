import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditProfileForm from "@/components/profile/EditProfileForm";
import { ChevronLeft } from "lucide-react";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { formatToDateInput, formatDate } from "@/util/helpers";
import { useToast } from "@/hooks/use-toast";

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
    <div className="mt-[2.8rem] py-5 px-5">
      <header className="fixed top-0 left-0 w-full z-10 ">
        <div className="px-3 py-2   bg-slate-50 shadow-sm border-b  flex items-center justify-between">
          <div className="h-7 inline-flex justify-center items-center">
            <Link to={"/profile"}>
              <ChevronLeft className="" size={25} />
            </Link>
          </div>
        </div>
      </header>
      {userData && (
        <EditProfileForm
          userData={userData}
          onSubmit={onSubmit}
          errorMessage={errorMessage}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default EditProfilePage;
