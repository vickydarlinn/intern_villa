import React, { createContext, useState, useEffect } from "react";
import { serverUrl } from "../utils/constant";

export const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    mobile: "",
    linkedIn: "",
    github: "",
    profilePic: "",
    resume: "",
    coins: 0,
  });
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  const updateUserInfo = (newUserInfo) => {
    setUserInfo(newUserInfo);
  };

  const updateIsUserLoggedIn = (val) => {
    setIsUserLoggedIn(val);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      updateIsUserLoggedIn(true);
      fetchUserInfo(localStorage.getItem("token"));
    }
  }, []);

  const fetchUserInfo = async (token) => {
    const response = await fetch(`${serverUrl}/api/v1/users/details`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await response.json();
    updateUserInfo(data.user);
  };
  return (
    <UserInfoContext.Provider
      value={{ userInfo, updateUserInfo, updateIsUserLoggedIn, isUserLoggedIn }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};
