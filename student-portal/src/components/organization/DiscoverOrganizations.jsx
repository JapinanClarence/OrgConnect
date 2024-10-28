import React, { useEffect, useState } from "react";
import OrgCards from "@/components/organization/OrgCards";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";
import OrgCardSkeleton from "@/components/skeleton/OrgCardSkeleton";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { formatDate } from "@/util/helpers";

const DiscoverOrganizations = () => {
  const { token, userData } = useAuth();
  const [orgData, setOrgData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentOrg, setCurrentOrg] = useState("");
  const [joinDialog, setJoinDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const date = formatDate(Date.now());
  const navigate = useNavigate();

  const fetchAllOrgs = async () => {
    try {
      const { data } = await apiClient.get("/user/organization/", {
        headers: {
          Authorization: token,
        },
      });

      if (data.success) {
        setOrgData(data.data);
      } else {
        setOrgData([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrgs();
  }, []);

  const handleClick = (data) => {
    setCurrentOrg(data);

    setJoinDialog(true);
  };
  const handleJoin = async () => {
    try {
      setIsSubmitting(true);

      const { data } = await apiClient.post(
        "/user/organization",
        {
          organization: currentOrg,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (data.success) {
        setIsSubmitting(false);
        toast({
          title: "Joined organization successfully. Please wait for approval.",
          description: `${date}`,
        });
        setJoinDialog(false)
        fetchAllOrgs();
      }
    } catch (error) {
      console.log(error);
      const message = error.response.data.message;
      toast({
        variant: "destructive",
        title: message,
      });
      setIsSubmitting(false);
    }
  };
  return (
    <>
      {loading ? (
        <div className="space-y-2 pb-5">
          <OrgCardSkeleton items={6} variant={"horizontal"} />
        </div>
      ) : orgData <= 0 ? (
        <div className="w-full h-[200px]  flex items-center justify-center text-muted-foreground">
          No organizations found.
        </div>
      ) : (
        <div className="flex flex-col gap-2 pb-5 ">
          {orgData.map((data) => (
            <OrgCards
              variant={"horizontal"}
              key={data._id}
              id={data._id}
              orgImage={data.banner}
              title={data.name}
              about={data.about}
              onClick={handleClick}
            />
          ))}
        </div>
      )}
      <Dialog open={joinDialog} onOpenChange={setJoinDialog}>
        <DialogContent className={"max-w-[320px] rounded-lg p-5"}>
          <DialogHeader className={""}>
            <DialogTitle>Join organization?</DialogTitle>
            <DialogDescription>
              By joining, you'll gain access to exclusive content, events, and
              announcements from this organization.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleJoin} disabled={isSubmitting}>
              {isSubmitting ? (
                <LoaderCircle className="animate-spin w-4 h-4" />
              ) : (
                "Join"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DiscoverOrganizations;
