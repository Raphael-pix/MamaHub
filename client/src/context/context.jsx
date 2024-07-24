/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [isSignup, setIsSignUp] = useState(true);
  const [isGetStrated, setIsGetStarted] = useState(true);
  const [isGroupSelected, setIsGroupSelected] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [groupData,setGroupData]=useState({
    id:'',
    name:'',
    type:'team',
    avatar:'',
    banner:'',
    topics:[],
    members:[]
  })
  const [currentGroupSection,setCurrentGroupSection]=useState('journeys')
  const [currentUserSection,setCurrentUserSection]=useState('journeys')
  // TODO: FIX THIS SO THAT ON RELOAD SECTION CHANGES BACK TO THE DEFAULT 
  const switchForm = () => {
    setIsSignUp((prevIsSignup) => !prevIsSignup);
  };
  const [selectedGroupDetails, setSelectedGroupDetails] = useState({
    name:'',
    id:'',
    type:''
  });

  return (
    <GlobalContext.Provider
      value={{
        signupData,
        setSignupData,
        loginData,
        setLoginData,
        isSignup,
        setIsSignUp,
        switchForm,
        isGetStrated,
        setIsGetStarted,
        selectedGroup,
        setSelectedGroup,
        isGroupSelected,
        setIsGroupSelected,
        groupData,
        setGroupData,
        selectedGroupDetails, 
        setSelectedGroupDetails,
        currentGroupSection,
        setCurrentGroupSection,
        currentUserSection,
        setCurrentUserSection
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
