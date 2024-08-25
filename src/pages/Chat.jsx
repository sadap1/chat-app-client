import React, { useState, useEffect, useRef } from 'react'
import styled from "styled-components"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getContactsRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from '../components/Welcome';
import ChatBox from '../components/ChatBox';
import { io } from "socket.io-client";

export default function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const userDetails = async() =>{
    if (!localStorage.getItem("chat-user")) {
      navigate("/signin");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem("chat-user")
        )
      );
      setIsLoaded(true);
    }
  }
  useEffect(() => {
    userDetails();
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser.username);
    }
  }, [currentUser]);
  const fetchContacts = async() =>{
    if (currentUser) {
      const data = await axios.get(`${getContactsRoute}/${currentUser.username}`);
      setContacts(data.data);
    }
  }
  useEffect(() => {
    fetchContacts();
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} currentUser={currentUser}/>
          {isLoaded && currentChat === undefined ? (
            <Welcome currentUser={currentUser}/>
          ) : (
            <ChatBox currentChat={currentChat} currentUser={currentUser} socket={socket}/>
          )}
        </div>
      </Container>
  );
}
const Container = styled.div`
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
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
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
  }`;