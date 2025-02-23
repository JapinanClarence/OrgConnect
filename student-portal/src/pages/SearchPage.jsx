import React, { useEffect, useState } from "react";
import OrgCards from "@/components/organization/OrgCards";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";
import OrgCardSkeleton from "@/components/skeleton/OrgCardSkeleton";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHead from "@/components/nav/PageHead";

const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const [joinDialog, setJoinDialog] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentOrg, setCurrentOrg] = useState("");
  const [results, setResults] = useState([]);

  // Handle location.state changes with loading effect
  useEffect(() => {
    setLoading(true);
    if (location.state && location.state.results) {
      setResults(location.state.results);
    } else {
      setResults([]); // If no results passed, set empty array
    }
    setLoading(false);
  }, [location.state]);

  const handleClick = async (id, isMember) => {
    if (isMember) {
      navigate(`/organization/${id}`);
    }else{
        setCurrentOrg(id);

        setJoinDialog(true);
    }
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
        });
        setJoinDialog(false);
      }
    } catch (error) {
      console.log(error);
      const message = error.response?.data?.message || "An error occurred.";
      toast({
        variant: "destructive",
        title: message,
      });
      setIsSubmitting(false);
    }
  };

      
  const onSubmit = async (content) => {
 
    try {
      const { data } = await apiClient.get(`/user/search?query=${content}`, {
        headers: {
          Authorization: token,
        },
      });


      if(data.success){
        navigate("/search", { state: { results: data.data } }); // Redirect with state
      }

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="px-5 pt-16 h-full gap-5">
      <PageHead
        title={"Search"}
        allowSearch={true}
        onSubmit={onSubmit}
      />
      {loading ? (
        <div className="space-y-2 pb-5">
          <OrgCardSkeleton items={6} variant={"horizontal"} />
        </div>
      ) : results.length <= 0 ? (
        <div className="w-full h-[200px] flex items-center justify-center text-muted-foreground">
          No organizations found.
        </div>
      ) : (
        <div className="flex flex-col gap-2 pb-5">
          {results.map((data) => (
            <OrgCards
              variant={"horizontal"}
              key={data._id}
              id={data._id}
              orgImage={data.banner}
              title={data.name}
              about={data.about}
              onClick={() => handleClick(data._id, data.isMember)}
            />
          ))}
        </div>
      )}

      <Dialog open={joinDialog} onOpenChange={setJoinDialog}>
        <DialogContent className="max-w-[320px] rounded-lg p-5">
          <DialogHeader>
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
    </div>
  );
};

export default SearchPage;
