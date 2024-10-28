import React from "react";
import { LoaderCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const LeaveDialog = ({ open, onOpenChange, onConfirm, isSubmitting }) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-[350px] rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Leave group?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to leave?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter >
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isSubmitting} onClick={onConfirm}>{isSubmitting ? (
                <LoaderCircle className="animate-spin h-4 w-4" />
              ) : (
                "Leave"
              )}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LeaveDialog;
