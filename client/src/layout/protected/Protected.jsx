import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserInfoContext } from "../../context/userInfoContext";

const ProtectedRoute = ({ children }) => {
	const { isUserLoggedIn } = useContext(UserInfoContext);
	if (!isUserLoggedIn) {
		return <Navigate to="/login" />;
	}
	return <>{children}</>;
};

export default ProtectedRoute;
