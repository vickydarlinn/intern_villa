import { useState, useContext } from "react";
import OtpCard from "./otpCard/";
import LoginCard from "./loginCard";
import { Navigate } from "react-router-dom";

import { UserInfoContext } from "../../context/userInfoContext";
const Login = () => {
	const { isUserLoggedIn } = useContext(UserInfoContext);
	const [otpSent, setOtpSent] = useState(false);
	const [email, setEmail] = useState("");
	if (isUserLoggedIn) {
		return <Navigate to="/" replace={true} />;
	}

	return (
		<div className=" h-screen w-screen flex justify-center items-center">
			{otpSent ? (
				<OtpCard email={email} />
			) : (
				<LoginCard
					otpSentHandler={setOtpSent}
					email={email}
					setEmail={setEmail}
				/>
			)}
		</div>
	);
};

export default Login;
