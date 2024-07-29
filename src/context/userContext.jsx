import React, { useState, useContext, useEffect } from "react";
import userService from "@services/user.service.js";
import { AuthContext } from "@context/authContext";

const UserContext = React.createContext();

function UserProviderWrapper(props) {
  const { tokenPayload } = useContext(AuthContext);
  const [user, setUser] = useState({
    _id: "",
    name: "",
    email: "",
    profileImg: "",
  });

  useEffect(() => {
    if (tokenPayload) {
      userService
        .get(tokenPayload._id)
        .then((res) => {
          const { _id, name, email, profileImg } = res.data;
          setUser({ _id, name, email, profileImg });
        })
        .catch((error) => {
          console.error("error while retrieving user basd on id", error);
        });
    }
  }, [tokenPayload]);

  // const handleDeleteAccount = async () => {
  //   try {
  //     const userResponse = await usersService.get(user._id);
  //     const tasks = userResponse.data.tasks;

  //     for (const taskId of tasks) {
  //       const taskResponse = await taskService.get(taskId);
  //       await taskService.delete(taskId);
  //     }
  //     const deleteResponse = await usersService.delete(user._id);

  //     if (deleteResponse.status === 200) {
  //       removeToken();
  //       setIsLoggedIn(false);
  //       setIsLoading(false);
  //       setUser(null);
  //       navigate("/login");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting account:", error);
  //   }
  // };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        //handleDeleteAccount,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export { UserProviderWrapper, UserContext };
