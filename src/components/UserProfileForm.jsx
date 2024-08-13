import React, { useContext } from "react";
import { UserContext } from "@context/userContext";
import isEqual from "lodash/isEqual";
import { TextField, Button } from "@mui/material";

function UserProfileForm({ userData, setUserData, handleSave }) {
  const { user } = useContext(UserContext);

  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  const isUserDataChanged = !isEqual(
    {
      name: userData.name,
      email: userData.email,
    },
    { name: user.name, email: user.email }
  );

  return (
    <>
      <TextField
        id="name"
        label="Name"
        type="text"
        variant="outlined"
        value={userData.name}
        onChange={handleOnChange}
        fullWidth
      />
      <TextField
        id="email"
        label="Email"
        type="email"
        variant="outlined"
        value={userData.email}
        onChange={handleOnChange}
        fullWidth
      />

      <Button
        fullWidth
        variant="contained"
        disabled={!isUserDataChanged}
        onClick={handleSave}
      >
        Save
      </Button>
    </>
  );
}

export default UserProfileForm;
