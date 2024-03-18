import React, { useEffect, useState, useContext } from "react";
import { useToast } from "@chakra-ui/react";
import { UserInfoContext } from "../../../context/userInfoContext";
import { serverUrl } from "../../../utils/constant";

const Education = () => {
  const toast = useToast();
  const { userInfo, updateUserInfo } = useContext(UserInfoContext);

  const [educationDetails, setEducationDetails] = useState({
    type: "",
    name: "",
    startDate: "",
    endDate: "",
  });

  const handleInputChange = (e) => {
    setEducationDetails({
      ...educationDetails,
      [e.target.name]: e.target.value,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const json = await fetch(`${serverUrl}/api/v1/users/addEducation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          type: educationDetails.type,
          name: educationDetails.name,
          startDate: educationDetails.startDate,
          endDate: educationDetails.endDate,
        }),
      });
      const data = await json.json();
      if (!json.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      toast({
        title: `Education updated successfully`,
        description: `Education updated successfully`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      updateUserInfo(data.user);
      setEducationDetails({
        type: "",
        name: "",
        startDate: "",
        endDate: "",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-6">
        <div className="flex flex-col">
          <select
            name="type"
            value={educationDetails.type}
            onChange={handleInputChange}
            required
            className="bg-primary outline-none border border-gray-600 rounded p-2 text-gray-400"
          >
            <option value="">Select Education Type</option>
            <option value="School">School</option>
            <option value="College">College</option>
          </select>
          <span className="text-gray-400 text-xs pl-2">5 coins</span>
        </div>

        <div className="flex flex-col">
          <input
            type="text"
            placeholder="School/College name"
            value={educationDetails.name}
            name={"name"}
            required
            onChange={handleInputChange}
            className="bg-primary outline-none border border-gray-600 rounded p-2 text-white"
          />
          <span className="text-gray-400 text-xs pl-2">5 coins</span>
        </div>

        <div className="flex flex-col ">
          <label className="text-gray-400 my-2">Start Date</label>
          <input
            name="startDate"
            type="date"
            id="dateInput"
            value={educationDetails.startDate}
            onChange={handleInputChange}
            className="bg-primary outline-none border border-gray-600 rounded p-2 text-gray-400"
          />
          <span className="text-gray-400 text-xs pl-2">2 coins</span>
        </div>

        <div className="flex flex-col ">
          <label className="text-gray-400 my-2">End Date</label>
          <input
            name="endDate"
            type="date"
            id="dateInput"
            value={educationDetails.endDate}
            onChange={handleInputChange}
            className="bg-primary outline-none border border-gray-600 rounded p-2 text-gray-400"
          />
          <span className="text-gray-400 text-xs pl-2">2 coins</span>
        </div>

        <button
          type="submit"
          className="bg-buttonBg font-medium text-primary p-2 px-4 rounded-lg"
        >
          Save
        </button>
      </form>
      {userInfo?.education.map((education) => (
        <div key={education._id} className="border-2 rounded-lg p-4 mb-2">
          <p>Education Type: {education.type}</p>
          <p>Name of School/College: {education.name}</p>
          <p>
            Start Date:{" "}
            {education?.startDate ? formatDate(education.startDate) : "NA"}
          </p>
          <p>
            End Date:{" "}
            {education?.endDate ? formatDate(education.endDate) : "NA"}
          </p>
        </div>
      ))}
    </>
  );
};

export default Education;
