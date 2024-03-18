import React, { useState } from "react";
import noLogo from "../../assets/no-logo.svg";
import { TbCashBanknote } from "react-icons/tb";
import { GrUserExpert } from "react-icons/gr";
import { useToast } from "@chakra-ui/react";
import { serverUrl } from "../../utils/constant";

const JobCard = ({ data, isJobApplied = false }) => {
  const [isApplied, setIsApplied] = useState(isJobApplied);
  const toast = useToast();
  const handleApplyTOJob = async (id) => {
    try {
      const json = await fetch(`${serverUrl}/api/v1/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ jobId: id }),
      });
      const data = await json.json();
      if (json.ok) {
        toast({
          title: "Applied to job successfully",
          // description: `${field} updated successfully`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsApplied(true);
      } else {
        toast({
          title: "You need atleast 50 coins to apply.",
          description:
            "Fill out details in edit profile section to earn coins.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="border rounded-xl p-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
          <span className="text-2xl font-medium">
            {data.refInternshipTitle?.name}
          </span>
          <span className="text-sm text-gray-300">
            {data.refUser.refCompanyProfile?.companyName}
          </span>
        </div>

        <div className="rounded-full w-10 overflow-hidden">
          {data.refUser?.refCompanyProfile?.logoUrl ? (
            <img
              src={data.refUser?.refCompanyProfile?.logoUrl}
              alt="company logo"
            />
          ) : (
            <img src={noLogo} alt="" />
          )}
        </div>
      </div>

      <div className="flex max-[420px]:justify-between gap-6">
        <div>
          <span className="flex items-center gap-2 max-[310px]:gap-1 text-gray-400 text-sm max-[310px]:text-[10px]">
            <TbCashBanknote />
            <p>STIPEND</p>
          </span>
          <span className="max-[310px]:text-xs">
            ₹{data.stipendRange[0]} - {data.stipendRange[1]}
          </span>
        </div>
        <div>
          <span className="flex items-center gap-2 max-[310px]:gap-1 text-gray-400 text-sm max-[310px]:text-[10px]">
            <GrUserExpert />
            <p>EXPERIENCE</p>
          </span>
          <span className="max-[310px]:text-xs">1-2 years</span>
        </div>
      </div>

      {isApplied ? (
        <div className="flex justify-end">
          <button
            disabled
            className="bg-gray-500 text-primary font-medium px-8 py-2 rounded-xl max-[420px]:w-full max-[420px]:mt-3"
          >
            Applied!!
          </button>
        </div>
      ) : (
        <div className="flex justify-end">
          <button
            onClick={() => handleApplyTOJob(data._id)}
            className="bg-buttonBg text-primary font-medium px-8 py-2 rounded-xl max-[420px]:w-full max-[420px]:mt-3"
          >
            Apply now
          </button>
        </div>
      )}
    </main>
  );
};

export default JobCard;
