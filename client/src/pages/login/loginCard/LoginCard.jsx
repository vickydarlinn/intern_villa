import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { serverUrl } from "../../../utils/constant";

const LoginCard = ({ otpSentHandler, email, setEmail }) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // write async logic to check otp sent successfully or not
    try {
      const json = await fetch(`http://localhost:6970/api/v1/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      setIsLoading(true);
      const data = await json.json();
      setIsLoading(false);

      if (!json.ok) throw new Error("");
      toast({
        title: "Email Sent successfully.",
        description: "Please check your email for OTP.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      otpSentHandler(true);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <form
      className="flex gap-10 p-2 mx-4 items-center flex-col  w-full max-w-96 rounded-lg border border-gray-600 text-secondary overflow-hidden"
      onSubmit={handleSubmit}
    >
      <h1 className="font-bold text-lg">Please Log In</h1>
      <input
        type="email"
        className="bg-transparent w-full outline-none p-2 rounded-md border border-gray-600"
        placeholder="abc@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="bg-buttonBg text-primary w-full mt-auto p-3 rounded-lg"
        type="submit"
      >
        Send OTP
      </button>
    </form>
  );
};

export default LoginCard;
