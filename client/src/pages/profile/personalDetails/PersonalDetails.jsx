import React, { useState, useContext, useEffect } from "react";
import InputComponent from "../../../components/InputElement/InputComponent";
import { Avatar, Spinner, useToast } from "@chakra-ui/react";
import { UserInfoContext } from "../../../context/userInfoContext";
import { serverUrl } from "../../../utils/constant";

const PersonalDetails = () => {
  const { userInfo, updateUserInfo } = useContext(UserInfoContext);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    mobile: "",
    linkedIn: "",
    github: "",
    profilePic: "",
    resume: "",
  });
  useEffect(() => {
    setPersonalDetails({
      name: userInfo?.name ? userInfo.name : "",
      mobile: userInfo?.mobile ? userInfo.mobile : "",
      linkedIn: userInfo?.linkedIn ? userInfo.linkedIn : "",
      github: userInfo?.github ? userInfo.github : "",
      profilePic: userInfo?.profilePic ? userInfo.profilePic : "",
      resume: userInfo?.resume ? userInfo.resume : "",
    });
  }, [userInfo]);

  const handleInputChange = (e) => {
    setPersonalDetails({ ...personalDetails, [e.target.name]: e.target.value });
  };

  const handleUpdateUserInfo = async (field, value, coins) => {
    // Update user info in the database
    try {
      const json = await fetch(`${serverUrl}/api/v1/users/updateProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ field, value }),
      });
      const data = await json.json();
      if (!json.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      toast({
        title: `${field} updated successfully`,
        description: `${field} updated successfully`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      updateUserInfo(data.user);
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

  const handleProfilePhotoChange = async (e) => {
    setIsLoading(true);
    try {
      const file = e.target.files[0];
      const imageForm = new FormData();
      imageForm.append("file", file);
      imageForm.append("cloud_name", "dxn1nqijs");
      imageForm.append("upload_preset", "internvilla");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dxn1nqijs/image/upload",
        {
          method: "POST",
          body: imageForm,
        }
      );
      const data = await response.json();
      setPersonalDetails({ ...personalDetails, profilePic: data.secure_url });
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleResumeFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPersonalDetails({ ...personalDetails, resume: file.name });
    }
  };

  return (
    <main>
      <div className="flex gap-10 max-sm:gap-5 max-[550px]:flex-col max-[550px]:items-start items-end my-6">
        <main className="flex flex-col gap-4">
          {personalDetails.profilePic ? (
            <div className="ml-10">
              {isLoading ? (
                <Spinner />
              ) : (
                <img
                  src={personalDetails.profilePic}
                  alt="profile picture"
                  className="rounded-full w-20 h-20 object-cover"
                />
              )}
            </div>
          ) : (
            <div className="ml-10">
              {isLoading ? <Spinner /> : <Avatar size="lg" />}
            </div>
          )}
          <div className="flex items-start gap-4">
            <div className="flex flex-col">
              <input
                type="file"
                id="profilePic"
                accept="image/*"
                onChange={handleProfilePhotoChange}
                className="hidden"
              />
              <label
                htmlFor="profilePic"
                className="text-gray-400 p-1 rounded border border-gray-600 cursor-pointer"
              >
                Choose profile pic
              </label>
              <span className="text-gray-400 text-xs pl-2">5 coins</span>
            </div>
            <button
              onClick={() =>
                handleUpdateUserInfo("profilePic", personalDetails.profilePic)
              }
              className="bg-buttonBg font-medium text-primary p-2 px-4 rounded-lg"
            >
              Save
            </button>
          </div>
        </main>

        <main className="flex flex-col items-center gap-4">
          <p className="text-gray-400 text-sm">
            {personalDetails.resume
              ? personalDetails.resume
              : "No file choosen"}
          </p>
          <div className="flex items-start gap-4">
            <div className="flex flex-col">
              <input
                type="file"
                accept="pdf/*"
                id="resume"
                className="hidden"
                onChange={handleResumeFileChange}
              />
              <label
                htmlFor="resume"
                className="text-gray-400 p-1 rounded border border-gray-600 cursor-pointer"
              >
                Choose resume
              </label>
              <span className="text-gray-400 text-xs pl-2">5 coins</span>
            </div>
            <button
              onClick={() =>
                handleUpdateUserInfo("resume", personalDetails.resume)
              }
              className="bg-buttonBg font-medium text-primary p-2 px-4 rounded-lg"
            >
              Save
            </button>
          </div>
        </main>
      </div>

      <div className="flex flex-col gap-4">
        {userInfo.name ? (
          <p>Name: {userInfo.name}</p>
        ) : (
          <InputComponent
            type="text"
            placeholder="Full Name"
            coins={1}
            value={personalDetails.name}
            name={"name"}
            handler={handleInputChange}
            onSave={handleUpdateUserInfo}
          />
        )}
        {userInfo.mobile ? (
          <p>Mobile: {userInfo.mobile}</p>
        ) : (
          <InputComponent
            type="number"
            name={"mobile"}
            placeholder="Mobile"
            coins={15}
            value={personalDetails.mobile}
            handler={handleInputChange}
            onSave={handleUpdateUserInfo}
          />
        )}
        {userInfo.linkedIn ? (
          <p>
            LinkedIn:{" "}
            <a href={userInfo.linkedIn} target="_blank" rel="noreferrer">
              {userInfo.linkedIn}
            </a>
          </p>
        ) : (
          <InputComponent
            type="text"
            name={"linkedIn"}
            placeholder="LinkedIn link"
            coins={3}
            value={personalDetails.linkedIn}
            handler={handleInputChange}
            onSave={handleUpdateUserInfo}
          />
        )}
        {userInfo.github ? (
          <p>
            Github:{" "}
            <a href={userInfo.linkedIn} target="_blank" rel="noreferrer">
              {userInfo.github}
            </a>
          </p>
        ) : (
          <InputComponent
            type="text"
            name={"github"}
            placeholder="Github link"
            coins={5}
            value={personalDetails.github}
            handler={handleInputChange}
            onSave={handleUpdateUserInfo}
          />
        )}
      </div>
    </main>
  );
};

export default PersonalDetails;
