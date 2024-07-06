import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "@context/authContext";
import profilePic from "@/assets/pic.jpeg";

function UserPage() {
  const { user } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    name: "",
    profileImg: "",
  });

  useEffect(() => {
    if (user) setUserData({ name: user.name, profileImg: user.profileImg });
  }, []);

  const handleOnChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <main className="login">
      <img src={profilePic} alt="profile picture" width="150" />
      <label>
        Name:
        <input
          name="name"
          type="text"
          value={userData.name}
          onChange={handleOnChange}
        />
      </label>
      <button disabled={userData.name === user.name}>Save</button>
    </main>
  );
}

export default UserPage;
