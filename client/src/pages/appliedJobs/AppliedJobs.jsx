import React, { useEffect, useState } from "react";
import JobCard from "../../components/jobCard/JobCard";
import { serverUrl } from "../../utils/constant";

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);

  const fetchAppliedJobs = async () => {
    const json = await fetch(`${serverUrl}/api/v1/jobs/applied`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    });
    const data = await json.json();
    setAppliedJobs(data.appliedJobs);
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  return (
    <>
      <h1 className="text-3xl text-white text-center my-2 font-bold">
        Your Applied Jobs
      </h1>
      <main className="w-[90%] max-w-[500px] flex flex-col gap-5 items-center m-auto py-5">
        {appliedJobs.map((appliedJob) => (
          <JobCard key={appliedJob._id} data={appliedJob} isJobApplied={true} />
        ))}
      </main>
    </>
  );
};

export default AppliedJobs;
