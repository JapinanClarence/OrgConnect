import MembersTable from "@/components/members/MembersTable";
import React, {useState, useEffect} from "react";
import apiClient from "@/api/axios";
import { dateOnly, formatSimpleDateTime } from "@/util/helpers";


const yearMap = {
  1: "1st Year",
  2: "2nd Year",
  3: "3rd Year",
  4: "4th Year"
}

const MembersPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
  return (
    <div className="md:bg-[#fefefe] md:shadow-lg rounded-lg md:border md:border-gray-200 text-gray-900 px-6 py-5 flex flex-col relative">
      <h1 className="font-bold">Organization Members</h1>
      <p className="text-sm text-muted-foreground">
        View and manage organization members here.
      </p>
      <MembersTable data={data} loading={loading}/>
    </div>
  );
};

export default MembersPage;
