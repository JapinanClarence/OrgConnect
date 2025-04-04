import React, { useState, useEffect } from "react";
import AccountsTable from "@/components/users/AccountsTable";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";
import { Label } from "@/components/ui/label";
import { formatDate, dateOnly } from "@/util/helpers";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AddAccount from "@/components/users/AddAccount";
import { OrgAccountSchema } from "@/schema";

const AccountsPage = () => {
    const [accountsData, setAccountsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const date = formatDate(Date.now());
    const { toast } = useToast();
    const form = useForm({
        resolver: zodResolver(OrgAccountSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            role: ""
        }, // Set default values at initialization
    });

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const { data } = await apiClient.get("/admin/accounts", {
                headers: {
                    Authorization: token,
                },
            });

            if (!data.success) {
                setAccountsData([]);
            } else {
                const tableData = data.data.map((data) => {

                    return {
                        id: data._id,
                        username: data.username,
                        email: data.email,
                        status: data.active,
                        role: data.role,
                        profilePicture: data.profilePicture,
                    };
                });

                setAccountsData(tableData);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
  return (
    <div className="md:bg-[#fefefe] md:shadow-lg rounded-lg md:border md:border-gray-200 text-gray-900 px-6 py-5 w-full flex flex-col relative">
    <h1 className="font-bold">Accounts</h1>
    <p className="text-sm text-muted-foreground">
      View and manage admin accounts here.
    </p>
    <AccountsTable
        data={accountsData}
        loading={loading}
        
    />
    {/*<AddAdmin
      open={showAddDialog}
      onOpenChange={setShowAddDialog}
      form={form}
      onSubmit={onAdd}
      isSubmitting={isSubmitting}
      errorMessage={errorMessage}
    /> */}
  </div>
  )
}

export default AccountsPage
