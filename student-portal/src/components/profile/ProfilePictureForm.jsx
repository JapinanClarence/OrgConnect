import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Camera, LoaderCircle } from "lucide-react";
import { fileSchema } from "@/schema";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { formatToDateInput, formatDate } from "@/util/helpers";

import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const ProfilePictureForm = ({ imgSrc }) => {
  const [profilePicture, setProfilePicture] = useState(imgSrc || "");
  const { token } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const date = formatDate(Date.now());
  const { toast } = useToast();
  const onImageChange = async (event) => {
    const file = event.target.files[0];
    
    if (!file) return;

    try {
      await fileSchema.parseAsync(file);
      const formData = new FormData();
      formData.append("profilePicture", file);
      await uploadImage(formData);
    } catch (error) {
        console.log(error)
      const message = JSON.parse(error);
      setErrorMessage(message[0].message);
    }
  };

  const uploadImage = async (formData) => {
    try {
      setIsSubmitting(true);

      const res = await apiClient.patch("/user/profilePicture", formData, {
        headers: {
          Authorization: token,
        },
      });

      if (res) {
        setIsSubmitting(false);
        toast({
          title: "Image uploaded.",
          description: `${date}`,
        });
        setProfilePicture(res.data.data)
      }
    } catch (error) {
      console.log(error);
      const message = error.response.data.message;
      setErrorMessage(message);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form encType="multipart/form-data">
        <div className="flex gap-3 mb-2">
          <Avatar className="size-16 overflow-clip">
            <AvatarImage
              className="object-cover"
              src={profilePicture}
              alt="User Profile"
            />
            <AvatarFallback className="bg-gray-200 text-gray-400 font-bold">
              <Camera />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2 justify-center">
            <Label htmlFor="picture" className="text-sm">
              Profile Picture
            </Label>
            <Input
              id="picture"
              type="file"
              className="p-1 h-min"
              accept=".jpg, .png" // Accept only jpg and png formats
              onChange={onImageChange}
            />
            <span className="text-xs text-red-500">{errorMessage}</span>
          </div>
        </div>
      </form>
      <AlertDialog open={isSubmitting} onOpenChange={setIsSubmitting}>
        <AlertDialogContent className="max-w-[250px] rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Image uploading</AlertDialogTitle>

            <AlertDialogDescription>Please wait...</AlertDialogDescription>
            <div>
              <LoaderCircle className="animate-spin mx-auto size-5 text-muted-foreground" />
            </div>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProfilePictureForm;
