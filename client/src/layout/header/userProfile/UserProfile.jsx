import React, { useState, useContext } from "react";
import profile from "../../../assets/profile.jpg";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { MdOutlineSavedSearch, MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { UserInfoContext } from "../../../context/userInfoContext";
import { Avatar } from "@chakra-ui/react";

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userInfo } = useContext(UserInfoContext);

  return (
    <div className="relative">
      <div
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="flex items-center border p-2 px-3 max-[320px]:p-1 rounded-lg gap-4 max-[380px]:gap-2 cursor-pointer relative"
      >
        {/* <img src={profile} alt="profile pic" className="rounded-full w-10" /> */}
        <div className="max-[350px]:hidden">
          {userInfo.profilePic ? (
            <img
              src={userInfo.profilePic}
              alt="profile pic"
              className="rounded-full w-10 h-10 object-cover"
            />
          ) : (
            <Avatar size="sm" />
          )}
        </div>
        <p className="capitalize">{userInfo?.name ? userInfo.name : "User"}</p>
        {isModalOpen ? (
          <FaChevronUp className="max-[320px]:text-xs" />
        ) : (
          <FaChevronDown className="max-[320px]:text-xs" />
        )}
      </div>
      {isModalOpen && (
        <ProfileModal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      )}
    </div>
  );
};

export default UserProfile;

function ProfileModal({ setIsModalOpen, isModalOpen }) {
  const navigate = useNavigate();
  const { updateIsUserLoggedIn } = useContext(UserInfoContext);
  return (
    <div className="bg-[#181326] flex flex-col justify-center border rounded-lg absolute -bottom-48 right-0 z-20">
      <Link
        to="/profile/personal-details"
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="flex items-center gap-2 p-4 hover:bg-white/10 cursor-pointer"
      >
        <RxAvatar />
        <p className="text-sm">Edit Profile</p>
      </Link>
      <Link
        to="/applied-jobs"
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="flex items-center gap-2 p-4 hover:bg-white/10 cursor-pointer"
      >
        <MdOutlineSavedSearch className="text-2xl" />
        <p className="text-sm">Applied Internships</p>
      </Link>
      <div
        onClick={() => {
          localStorage.removeItem("token");
          updateIsUserLoggedIn(false);
          navigate("/login");
        }}
        className="flex items-center gap-2 p-4 hover:bg-white/10 cursor-pointer"
      >
        <MdLogout />
        <p className="text-sm">Logout</p>
      </div>
    </div>
  );
}
