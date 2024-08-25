import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { signInRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import Logo from "../assets/logo.png";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export default function SignIn() {
    const navigate = useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    useEffect(() => {
        if (localStorage.getItem("chat-user")) {
          navigate("/");
        }
    }, []);
    const [values, setValues] = useState({
        username: "",
        password: "",
    });
    const handleValidation = () => {
        const { username, password } = values;
        if (username === "") {
            toast.error("Username is required.", toastOptions);
            return false;
        }else if (password === "") {
            toast.error("Password is required.", toastOptions);
            return false;
        }
        return true;
    };
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
          const { username, password } = values;
          const { data } = await axios.post(signInRoute, {
            username,
            password,
          });
    
          if (data.status === false) {
            toast.error(data.msg, toastOptions);
          }
          if (data.status === true) {
            localStorage.setItem(
              "chat-user",
              JSON.stringify(data.user)
            );
            navigate("/");
          }
        }
    };
  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>InstaChat</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Sign In</button>
          <span>
            Don't have an account ? <Link to="/signup">Sign Up.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: -webkit-linear-gradient(-45deg, #183850 0, #183850 25%, #192C46 50%, #22254C 75%, #22254C 100%);
	background-repeat: no-repeat;
  background-attachment: fixed;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-radius: 2rem;
    padding: 3rem 5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    overflow: hidden;
    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.5);
    justify-content: space-between;
    flex-direction: column;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;