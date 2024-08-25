import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";
import { logoutRoute } from "../utils/APIRoutes";
import axios from "axios";

export default function Logout() {
    const navigate = useNavigate();
    const handleClick = async () => {
        localStorage.clear();
        await axios.get(logoutRoute);
        navigate("/signin");
    };
  return (
    <Button onClick={handleClick}>
        <BiPowerOff/>
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  z-index: 2;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #4e0eff;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
