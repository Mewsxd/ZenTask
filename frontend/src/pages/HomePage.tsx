import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      navigate("/auth");
    }
    async function getUserData() {
      const request = await fetch(
        `http://localhost:8000/api/v1/user/verify/${localStorage.getItem(
          "jwt"
        )}`
      );
      const response = await request.json();
      setUserName(response.user.name);
      console.log(response);
    }
    try {
      getUserData();
    } catch (err) {
      alert("Something went wrong");
    }
  }, [navigate]);
  return <div>HomePage, Hello {userName}</div>;
};

export default HomePage;
