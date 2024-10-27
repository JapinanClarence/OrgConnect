import React, { useState, useEffect } from "react";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import PageHead from "@/components/nav/PageHead";
import DataTable from "@/components/payments/DataTable";

const PaymentPage = () => {
  const { token } = useAuth();
  const [paymentData, setPaymentData] = useState([]);
  const params = useParams();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await apiClient.get(
        `/user/organization/${params.id}/payments`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (data) {
        setPaymentData(data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="pt-16">
      <PageHead title={"Payments"}/>
      <div className="px-5">
        <DataTable data={paymentData} loading={loading}/>
      </div>
    </div>
  );
};

export default PaymentPage;
