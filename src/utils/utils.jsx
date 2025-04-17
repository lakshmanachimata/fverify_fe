import { useNavigate } from "react-router-dom";

export const useHandleLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.setItem("userData", null);

    // Navigate to the sign-in page with orgId
    navigate("/?orgId=" + localStorage.getItem("orgId"));
  };

  return handleLogout;
};