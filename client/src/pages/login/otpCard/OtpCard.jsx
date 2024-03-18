import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useContext } from "react";
import { UserInfoContext } from "../../../context/userInfoContext";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../../utils/constant";

const OtpCard = ({ email }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const { updateIsUserLoggedIn } = useContext(UserInfoContext);

  const handleSubmit = async (e) => {
    // write async logic to check otp is correct or not
    e.preventDefault();

    setIsLoading(true);
    try {
      const res = await fetch(`${serverUrl}/api/v1/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });
      const data = await res.json();
      updateIsUserLoggedIn(true);
      localStorage.setItem("token", data.token);
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast({
        title: "OTP Verified",
        description: "You are successfully logged in.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      className="flex gap-10 p-2 py-5 items-center flex-col  w-full max-w-96 rounded-lg border border-gray-600 text-secondary overflow-hidden"
      onSubmit={handleSubmit}
    >
      <input
        type="number"
        className="bg-transparent w-full outline-none p-2 rounded-md border border-gray-600 px-auto"
        placeholder="2 3 4 5"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button
        className="bg-buttonBg text-primary w-full mt-auto p-3 rounded-lg"
        type="submit"
      >
        Verify
      </button>
    </form>
  );
};

export default OtpCard;
