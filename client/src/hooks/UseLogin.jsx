/* eslint-disable no-unused-vars */
import {useState,useEffect} from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
};

const UseLogin = ({url,isSignup,reloadWindow}) => {

    const [form, setForm] = useState(initialState);
    const [data,setData] =  useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlelogin = async (e) => {
        e.preventDefault();
        const { email, password, confirmPassword } = form;
        try {
          setLoading(true);
          const response = await axios.post(
           url,
            {
              email,
              password,
              confirmPassword,
            }
          );
          const result = await response.data;
          setData(data)

          //set cookies when creating an account
          cookies.set("token", result.token);
          cookies.set("email", result.email);
          cookies.set("userId", result.userId);

          //set the cookies only when logging in/creating profile so as to avoid cookies being set as undefined
          if (!isSignup) {
            cookies.set("profile Token", result.profileToken);
            cookies.set("image", result.avatar);
            cookies.set("username",result.name)
          } else {
            cookies.set("hashed password", result.hashedPassword);
          }
          //reload page
          reloadWindow();
        } catch (err) {
          setLoading(false);
          setError(err.response?.data?.message || err.name);
        }
        setLoading(false);
      };

      useEffect(()=>{
        handlelogin()
      },[isSignup])
      return {data,error,loading}
}

export default UseLogin
