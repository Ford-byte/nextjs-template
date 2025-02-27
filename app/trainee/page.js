"use client";

import TraineeList from "@/components/blocks/TraineeList";
import ConfirmationPopup from "@/components/popups/confirmationPopup";
import Toast from "@/components/popups/toast";
import useApiStorage from "@/components/store/api";
import Delete from "@/public/icons/delete";
import { useEffect, useState } from "react";

export default function Page() {
  const [fullname, setFullname] = useState("");
  const {
    getApplications,
    toastData,
    applicationApproval,
    deleteApplication,
    getTraineesData,
  } = useApiStorage();
  const [data, setData] = useState();
  const [userId, setId] = useState();
  const [trainee, setTrainee] = useState();

  useEffect(() => {
    const storedName = localStorage.getItem("fullname");
    if (storedName) {
      setFullname(storedName);
    }

    fetchApplication();
    fetchTrainee();
  }, []);

  const fetchApplication = async () => {
    try {
      const id = localStorage.getItem("user_id");
      const response = await getApplications({ id: id });
      setData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTrainee = async () => {
    try {
      const id = localStorage.getItem("user_id");
      const response = await getTraineesData({ id: id });
      setTrainee(response?.data);
      console.log(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = {
      month: "short",
      day: "numeric",
      year: "numeric",
      weekday: "long",
    };
    return date.toLocaleDateString("en-US", options).replace(",", ",");
  };

  const handleApproval = async (id, approval) => {
    try {
      const response = await applicationApproval({
        id: id,
        approval: approval,
      });

      console.log(response?.data);
      fetchApplication();
      fetchTrainee();
    } catch (error) {
      console.log("Internal server error", error);
    }
  };

  const toggleDelete = async (props) => {
    setId(props);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteApplication({ id: id });
      console.log(response);
      fetchApplication();
      setId(null);
    } catch (error) {
      console.log("Internal server error", error);
    }
  };

  return (
    <div className="pt-[100px] pb-24">
      <div className="center">
        <div className="container">
          <TraineeList trainee={trainee} />
        </div>
      </div>
      <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800 min-h-[300px]">
        <h2 className="mb-4 text-2xl font-semibold leading-tight">
          Applicants
        </h2>
        <div className="">
          <table className="min-w-full text-xs">
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
              <col className="w-24" />
            </colgroup>
            <thead className="dark:bg-gray-300">
              <tr className="text-left">
                <th className="p-3">Invoice #</th>
                <th className="p-3">Client</th>
                <th className="p-3">Issued</th>
                <th className="p-3">Due</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item, index) => {
                return (
                  <tr
                    className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
                    key={index}
                  >
                    <td className="p-3">
                      <p>{item?.contact}</p>
                    </td>
                    <td className="p-3">
                      <p>{item?.fullname}</p>
                    </td>
                    <td className="p-3">
                      <p>{item?.email}</p>
                    </td>
                    <td className="p-3">
                      <p>{formatDate(item?.date)}</p>
                    </td>

                    <td className="p-3 relative flex group">
                      <span
                        className={`py-1 font-semibold text-white rounded-md capitalize px-[12px] ${
                          item?.approval === "pending"
                            ? "bg-[#FFC107]"
                            : item?.approval === "rejected"
                            ? "bg-red-500"
                            : "bg-green-500"
                        }`}
                      >
                        <span>{item?.approval}</span>
                      </span>
                      <span className="absolute ml-20 flex flex-col gap-y-[1] text-black shadow-lg text-xs px-4 bg-white py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                        <span
                          className={` ${
                            item?.approval === "accepted"
                              ? "disabled"
                              : "pointer"
                          }`}
                          onClick={() => handleApproval(item.id, "accepted")}
                          style={{
                            pointerEvents:
                              item?.approval === "accepted" ? "none" : "auto",
                            opacity: item?.approval === "accepted" ? 0.5 : 1,
                          }}
                        >
                          Accept
                        </span>
                        <span
                          className={` ${
                            item?.approval === "rejected"
                              ? "disabled"
                              : "pointer"
                          }`}
                          onClick={() => handleApproval(item.id, "rejected")}
                          style={{
                            pointerEvents:
                              item?.approval === "rejected" ? "none" : "auto",
                            opacity: item?.approval === "rejected" ? 0.5 : 1,
                          }}
                        >
                          Reject
                        </span>
                      </span>
                    </td>
                    <td className=" text-red-500">
                      <Delete
                        className={`size-6 pointer`}
                        onClick={() => {
                          toggleDelete(item.id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {toastData && (
        <Toast status={toastData.status} message={toastData.message} />
      )}

      {userId && (
        <ConfirmationPopup
          onYes={() => handleDelete(userId)}
          onNo={() => setId(null)}
          message={`Are you sure you want to delete this application?`}
        />
      )}
    </div>
  );
}
