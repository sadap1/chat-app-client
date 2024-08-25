import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import ChatInput from './ChatInput';
import axios from "axios";
import { sendMsgRoute,fetchMsgRoute } from "../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid";

export default function ChatBox({currentChat, currentUser, socket}) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const fetchMsgs = async(currentChat) =>{
    const data = await JSON.parse(
      localStorage.getItem("chat-user")
    );
    const response = await axios.post(fetchMsgRoute, {
      from: data.username,
      to: currentChat.username,
    });
    setMessages(response.data);
  }
  useEffect(() => {
    if(currentChat){
      fetchMsgs(currentChat);
    }
  }, [currentChat]);
  const handleSendMsg = async (msg) => {
    await axios.post(sendMsgRoute, {
      from: currentUser.username,
      to: currentChat.username,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat.username,
      from: currentUser.username,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  }
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return(<>
  {
    currentChat && (
        <Container>
    <div className="chat-header">
        <div className="user-details">
            <div className="avatar">
              <img
                src={currentChat.profilePic}
                alt=""
              />
            </div>
            <div className="username">
                <h3>{currentChat.username}</h3>
            </div>
        </div>
    </div>
    <div className="chat-messages">
      {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div className={`message ${message.fromSelf ? "sent" : "recieved"}`}>
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
    <ChatInput handleSendMsg={handleSendMsg} />
  </Container>)}
  </>) ;
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  z-index: 2;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    flex: 0 1 45px;
    position: relative;
    z-index: 2;
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    text-transform: uppercase;
    text-align: left;
    padding: 10px 10px 10px 50px;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 2rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    flex: 1 1 auto;
    color: rgba(255, 255, 255, .5);
    position: relative;
    width: 100%;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sent {
      justify-content: flex-end;
      color: #fff;
      text-align: right;
      border-radius: 10px 10px 0 10px;
      .content {
        background-color: #4f04ff21;
      }
      &::before {
        left: auto;
        right: 0;
        border-right: none;
        border-left: 5px solid transparent;
        border-top: 4px solid #257287;
        bottom: -4px;
      }
    }
    .recieved {
      justify-content: flex-start;
      clear: both;
      border-radius: 10px 10px 10px 0;
      font-size: 11px;
      position: relative;
      text-shadow: 0 1px 1px rgba(0, 0, 0, .2);
      .content {
        background-color: #9900ff20;
      }
      &::before {
        content: '';
        position: absolute;
        bottom: -6px;
        border-top: 6px solid rgba(0, 0, 0, .3);
        left: 0;
        border-right: 7px solid transparent;
      }
    }
  }
`;