import React, { useState } from "react";
import styled from "styled-components";
import { IoMdSend } from "react-icons/io";
import EmojiPicker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
    const [msg, setMsg] = useState("");
    const [open, setOpen] = useState(false);
    const handleEmojiClick = (event) => {
        setMsg(message=> message+event.emoji);
        setOpen(false);
    };
    const sendMsg = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
          handleSendMsg(msg);
          setMsg("");
        }
    };
  return <Container>
    <div className="emoji">
      <img src="./emoji.png" onClick={()=>setOpen(x=>!x)}/>
      <div className="pick">
        <EmojiPicker open={open} onEmojiClick={handleEmojiClick}/>
      </div>
    </div>
      <form className="input-container" onSubmit={(event) => sendMsg(event)}>
          <input
            type="text"
            placeholder="type your message here"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button type="submit">
              <IoMdSend />
          </button>
      </form>
    
    
  </Container>;
}

const Container = styled.div`
  display:flex;
  justify-content:space-between;
  background-color: #080420;
  padding-bottom: 10px;
  gap:10px;
  padding-left:25px;
  img{
    width:40px;
    height:35px;
    cursor:pointer;
    z-index:3;
    padding-left:10px;
    padding-bottom:5px;
   
  }

  .emoji{
    display:flex;
    position:relative;
    flex-direction:column-reverse;
  

    .picker{
      position:absolute;
      top:40px;
      right:0;
    }
  }
  .input-container {

    width: 70%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  
    position:absolute;
    background-color: #ffffff34;
    input {
      
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 60px;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 1rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }

`;