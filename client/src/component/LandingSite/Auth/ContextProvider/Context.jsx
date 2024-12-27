import { createContext, useState } from "react";

export const LoginContext = createContext("");

const Context = ({ children }) => {

  const [logindata, setLoginData] = useState({ email: "", name: "" });

  return (
    <LoginContext.Provider value={{ logindata, setLoginData }}>
      {children}
    </LoginContext.Provider>
  );
};

export default Context;
