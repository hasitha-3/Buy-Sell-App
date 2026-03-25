import React, { createContext, useContext, useState } from "react";

const MyContext = createContext();

export const AppProvider = ({ children }) => {
  const [info, setInfo] = useState({
    firstname: "",
    lastname: "",
    Email: "",
    contact_number: "",
    age: "",
    userId: "",
    password: ""
  });

  // ✅ Function to update user info
  const change_info = (newInfo) => {
    setInfo({
      firstname: newInfo.firstname,
      lastname: newInfo.lastname,
      Email: newInfo.Email,
      contact_number: newInfo.contact_number,
      age: newInfo.age,
      userId: newInfo.userId,
      password: newInfo.password
    });
  };

  return (
    <MyContext.Provider value={{ info, change_info }}>
      {children}
    </MyContext.Provider>
  );
};

// ✅ Custom hook to use context
export const useAppContext = () => {
  return useContext(MyContext);
};
