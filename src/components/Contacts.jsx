import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import Logout from './Logout';

export default function Contacts({ contacts, changeChat}){
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const userName = async() =>{
      const data = await JSON.parse(
        localStorage.getItem("chat-user")
      );
      if(data){
        setCurrentUserName(data.username);
        setCurrentUserImage(data.profilePic);
      }
    }
    useEffect(() => {
      userName();
    }, []);
      const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
      };
    return (
        <>
      {currentUserName && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>InstaChat</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={index}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={()=>changeCurrentChat(index,contact)}
                >
                  <div className="avatar">
                    <img
                      src={contact.profilePic}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={currentUserImage}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
            <Logout/>
          </div>
        </Container>
      )}
    </>
    );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
  z-index: 2;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    padding: 30px 50px 10px 50px;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    color: rgba(255, 255, 255, .5);
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #4e0eff;
    }
  }

  .current-user {
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 3rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;