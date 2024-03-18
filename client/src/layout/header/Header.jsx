import React, { useContext } from "react";
import UserProfile from "./userProfile";
import { Link } from "react-router-dom";
import { UserInfoContext } from "../../context/userInfoContext";

const Header = () => {
  const { userInfo } = useContext(UserInfoContext);

  return (
    <div className="flex justify-between items-center px-10 max-sm:px-4 py-5 bg-[#181326] sticky top-0">
      <Link
        to="/"
        className="text-2xl max-[420px]:text-xl max-[320px]:text-lg font-bold"
      >
        InternVilla
      </Link>
      <div className="flex items-center gap-6 max-[420px]:gap-2">
        <span className="bg-secondary text-primary max-[420px]:text-sm max-[320px]:text-xs max-[320px]:px-2 px-4 max-[420px]:px-3 py-1 rounded-3xl">
          {userInfo?.coins} 🪙
        </span>
        <UserProfile />
      </div>
    </div>
  );
};

export default Header;
